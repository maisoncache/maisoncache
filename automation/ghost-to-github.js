/**
 * ghost-to-github.js
 *
 * Lightweight HTTP server that receives Ghost post.published webhooks.
 * For each published post, it:
 *   1. Verifies the Ghost webhook signature
 *   2. Identifies which HTML file(s) to update from post tags
 *   3. Fetches the current file from GitHub
 *   4. Inserts the new entry at the <!-- AUTOMATION:* --> marker
 *   5. Commits the updated file back to GitHub
 *      → GitHub Pages auto-deploys within ~30 seconds
 *
 * Run with: node ghost-to-github.js
 *
 * Configure in Ghost:
 *   Settings → Integrations → Custom Integration → Webhooks
 *   Event: Post published
 *   URL:   http://your-server:3000/ghost-webhook
 *   Secret: value of GHOST_WEBHOOK_SECRET in .env
 */

import 'dotenv/config';
import http from 'http';
import { createHmac, timingSafeEqual } from 'crypto';
import {
  buildHearthArchiveItem,
  buildLibraryBook,
  buildCelestialStarNode,
  buildSanctumRoom,
} from './html-builders.js';

// ── Config ────────────────────────────────────────────────────────────────────

const {
  GHOST_WEBHOOK_SECRET,
  GITHUB_TOKEN,
  GITHUB_REPO           = 'maisoncache/maisoncache',
  GITHUB_BRANCH         = 'main',
  WEBHOOK_PORT          = '3000',
  NOTIFICATION_WEBHOOK_URL,
} = process.env;

for (const [key, val] of Object.entries({ GHOST_WEBHOOK_SECRET, GITHUB_TOKEN })) {
  if (!val) { console.error(`Missing env var: ${key}`); process.exit(1); }
}

// ── Tag → file routing ────────────────────────────────────────────────────────

const TAG_ROUTES = {
  'hearth':            'hearth.html',
  'library':           'library.html',
  'celestial-archive': 'celestial-archive.html',
  'sanctum':           'sanctum.html',
};

// Insertion markers — must exist in the target HTML file
const FILE_MARKERS = {
  'hearth.html':            '<!-- AUTOMATION:ARCHIVE_END -->',
  'library.html':           '// AUTOMATION:BOOKS_END',
  'celestial-archive.html': '<!-- AUTOMATION:STARS_END -->',
  'sanctum.html':           '// AUTOMATION:ROOMS_END',
};

// ── GitHub API helpers ────────────────────────────────────────────────────────

async function githubGet(path) {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}${path}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept:        'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!res.ok) throw new Error(`GitHub GET ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

async function githubPut(path, body) {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}${path}`, {
    method:  'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept:        'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GitHub PUT ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

async function getFileFromGitHub(filePath) {
  const data    = await githubGet(`/contents/${filePath}?ref=${GITHUB_BRANCH}`);
  const content = Buffer.from(data.content, 'base64').toString('utf8');
  return { content, sha: data.sha };
}

async function commitFileToGitHub(filePath, content, sha, message) {
  return githubPut(`/contents/${filePath}`, {
    message,
    content: Buffer.from(content, 'utf8').toString('base64'),
    sha,
    branch:  GITHUB_BRANCH,
  });
}

// ── HTML insertion helpers ────────────────────────────────────────────────────

function insertBefore(content, marker, fragment) {
  if (!content.includes(marker)) {
    throw new Error(`Insertion marker not found: ${marker}`);
  }
  return content.replace(marker, `${fragment}\n          ${marker}`);
}

// For library.html: new book goes before ]; with a trailing comma on previous entry
function insertLibraryBook(content, marker, fragment) {
  if (!content.includes(marker)) {
    throw new Error(`Insertion marker not found: ${marker}`);
  }
  // Ensure the last existing entry has a trailing comma before the marker
  const withComma = content.replace(
    /(\s*\})\s*\n(\s*\/\/ AUTOMATION:BOOKS_END)/,
    '$1,\n$2'
  );
  return withComma.replace(marker, `${fragment},\n      ${marker}`);
}

// For sanctum.html: new room goes before }; with a trailing comma on previous entry
function insertSanctumRoom(content, marker, fragment) {
  if (!content.includes(marker)) {
    throw new Error(`Insertion marker not found: ${marker}`);
  }
  return content.replace(marker, `${fragment},\n      ${marker}`);
}

// Count existing named (non-dim) stars for positioning
function countNamedStars(content) {
  return (content.match(/<div class="star-label">/g) ?? []).length;
}

// Parse highest book id from library.html
function maxBookId(content) {
  const matches = [...content.matchAll(/\bid:\s*(\d+)/g)];
  return matches.length > 0
    ? Math.max(...matches.map(m => parseInt(m[1], 10)))
    : 0;
}

// ── Process a published Ghost post ────────────────────────────────────────────

async function processPost(post) {
  const tagSlugs = (post.tags ?? []).map(t =>
    (t.slug ?? t.name ?? '').toLowerCase().replace(/\s+/g, '-')
  );

  const targets = tagSlugs
    .filter(slug => TAG_ROUTES[slug])
    .map(slug => TAG_ROUTES[slug]);

  const uniqueTargets = [...new Set(targets)];

  if (uniqueTargets.length === 0) {
    console.log(`  No matching tags — skipping. Tags: ${tagSlugs.join(', ')}`);
    return;
  }

  console.log(`  Targets: ${uniqueTargets.join(', ')}`);

  for (const file of uniqueTargets) {
    try {
      await updateFile(file, post);
      console.log(`  ✓ ${file} updated`);
    } catch (err) {
      console.error(`  ✗ ${file} failed: ${err.message}`);
    }
  }
}

async function updateFile(file, post) {
  const marker             = FILE_MARKERS[file];
  const { content, sha }   = await getFileFromGitHub(file);
  let updated;

  switch (file) {
    case 'hearth.html': {
      const fragment = buildHearthArchiveItem(post);
      updated = insertBefore(content, marker, fragment);
      break;
    }

    case 'library.html': {
      const maxId    = maxBookId(content);
      const fragment = buildLibraryBook(post, maxId);
      updated = insertLibraryBook(content, marker, fragment);
      break;
    }

    case 'celestial-archive.html': {
      const namedCount = countNamedStars(content);
      const fragment   = buildCelestialStarNode(post, namedCount);
      updated = insertBefore(content, marker, fragment);
      break;
    }

    case 'sanctum.html': {
      const fragment = buildSanctumRoom(post);
      updated = insertSanctumRoom(content, marker, fragment);
      break;
    }

    default:
      throw new Error(`No builder for file: ${file}`);
  }

  const commitMsg = `add "${post.title}" to ${file}\n\nautomated via ghost-to-github`;
  await commitFileToGitHub(file, updated, sha, commitMsg);
}

// ── Notification ──────────────────────────────────────────────────────────────

async function notify(message) {
  if (!NOTIFICATION_WEBHOOK_URL) return;
  try {
    await fetch(NOTIFICATION_WEBHOOK_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ content: message }),
    });
  } catch (err) {
    console.error(`Notification failed: ${err.message}`);
  }
}

// ── Webhook signature verification ───────────────────────────────────────────

function verifyGhostSignature(rawBody, signatureHeader) {
  if (!signatureHeader) return false;

  // Ghost sends: sha256=<hex>, t=<timestamp>
  const parts = Object.fromEntries(
    signatureHeader.split(', ').map(part => part.split('=', 2))
  );

  const expected = createHmac('sha256', GHOST_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex');

  try {
    return timingSafeEqual(
      Buffer.from(parts.sha256 ?? '', 'hex'),
      Buffer.from(expected, 'hex')
    );
  } catch {
    return false;
  }
}

// ── HTTP server ───────────────────────────────────────────────────────────────

const server = http.createServer((req, res) => {
  if (req.method !== 'POST' || req.url !== '/ghost-webhook') {
    res.writeHead(404).end();
    return;
  }

  const chunks = [];
  req.on('data', chunk => chunks.push(chunk));
  req.on('end', async () => {
    const rawBody  = Buffer.concat(chunks);
    const sigHeader = req.headers['x-ghost-signature'] ?? '';

    if (!verifyGhostSignature(rawBody, sigHeader)) {
      console.warn(`[${new Date().toISOString()}] Rejected: invalid signature`);
      res.writeHead(401).end('Unauthorized');
      return;
    }

    res.writeHead(200).end('OK');

    let payload;
    try {
      payload = JSON.parse(rawBody.toString('utf8'));
    } catch {
      console.error('Could not parse webhook payload');
      return;
    }

    const post = payload?.post?.current;
    if (!post) {
      console.log('No post.current in payload — ignoring.');
      return;
    }

    console.log(`[${new Date().toISOString()}] post.published: "${post.title}"`);

    try {
      await processPost(post);
      await notify(`🌿 Website updated: **${post.title}** added to site — deploying now.`);
    } catch (err) {
      console.error(`Unhandled error: ${err.message}`);
      await notify(`⚠️ Automation error for "${post.title}": ${err.message}`);
    }
  });
});

const port = parseInt(WEBHOOK_PORT, 10);
server.listen(port, () => {
  console.log(`Ghost → GitHub webhook server running on port ${port}`);
  console.log(`Listening at http://localhost:${port}/ghost-webhook`);
});
