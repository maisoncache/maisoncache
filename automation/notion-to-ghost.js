/**
 * notion-to-ghost.js
 *
 * Polls the Notion Content Hub every 15 minutes.
 * When a page's Status is "Ready for Ghost":
 *   1. Fetches title, body blocks, tags, and cover image
 *   2. Converts Notion blocks → HTML
 *   3. Creates a Ghost draft via the Admin API
 *   4. Updates the Notion page status to "In Ghost"
 *   5. Sends a notification with the direct Ghost editor link
 *
 * Run with: node notion-to-ghost.js
 */

import 'dotenv/config';
import { Client } from '@notionhq/client';
import { createHmac } from 'crypto';

// ── Config ────────────────────────────────────────────────────────────────────

const {
  NOTION_TOKEN,
  NOTION_DATABASE_ID,
  NOTION_STATUS_PROPERTY  = 'Status',
  NOTION_TITLE_PROPERTY   = 'Title',
  NOTION_TAGS_PROPERTY    = 'Tags',
  GHOST_URL,
  GHOST_ADMIN_API_KEY,
  NOTIFICATION_WEBHOOK_URL,
} = process.env;

const POLL_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes

// ── Validation ────────────────────────────────────────────────────────────────

for (const [key, val] of Object.entries({ NOTION_TOKEN, NOTION_DATABASE_ID, GHOST_URL, GHOST_ADMIN_API_KEY })) {
  if (!val) { console.error(`Missing env var: ${key}`); process.exit(1); }
}

// ── Notion client ─────────────────────────────────────────────────────────────

const notion = new Client({ auth: NOTION_TOKEN });

// ── Ghost Admin API auth (JWT, no extra dependencies) ─────────────────────────

function ghostJWT() {
  const [id, secret] = GHOST_ADMIN_API_KEY.split(':');
  if (!id || !secret) throw new Error('GHOST_ADMIN_API_KEY must be in format id:secret');

  const now     = Math.floor(Date.now() / 1000);
  const header  = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT', kid: id })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ iat: now, exp: now + 300, aud: '/admin/' })).toString('base64url');
  const sig     = createHmac('sha256', Buffer.from(secret, 'hex'))
    .update(`${header}.${payload}`)
    .digest('base64url');

  return `${header}.${payload}.${sig}`;
}

async function ghostPost(path, body) {
  const res = await fetch(`${GHOST_URL}/ghost/api/admin${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Ghost ${ghostJWT()}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ghost API ${res.status}: ${text}`);
  }

  return res.json();
}

// ── Notion → HTML conversion ──────────────────────────────────────────────────

function richTextToHtml(richText) {
  return (richText ?? []).map(chunk => {
    let text = (chunk.plain_text ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    if (chunk.annotations?.bold)          text = `<strong>${text}</strong>`;
    if (chunk.annotations?.italic)        text = `<em>${text}</em>`;
    if (chunk.annotations?.strikethrough) text = `<del>${text}</del>`;
    if (chunk.annotations?.code)          text = `<code>${text}</code>`;
    if (chunk.href)                        text = `<a href="${chunk.href}">${text}</a>`;

    return text;
  }).join('');
}

async function blocksToHtml(blocks) {
  const parts     = [];
  let listBuffer  = [];
  let listType    = null;

  const flushList = () => {
    if (!listBuffer.length) return;
    const tag = listType === 'bulleted_list_item' ? 'ul' : 'ol';
    parts.push(`<${tag}>\n${listBuffer.join('\n')}\n</${tag}>`);
    listBuffer = [];
    listType   = null;
  };

  for (const block of blocks) {
    const type    = block.type;
    const content = block[type] ?? {};
    const rt      = content.rich_text ?? [];

    if (type === 'bulleted_list_item' || type === 'numbered_list_item') {
      if (listType !== type) flushList();
      listType = type;
      listBuffer.push(`  <li>${richTextToHtml(rt)}</li>`);
      continue;
    }

    flushList();

    switch (type) {
      case 'paragraph':
        parts.push(`<p>${richTextToHtml(rt)}</p>`);
        break;
      case 'heading_1':
        parts.push(`<h2>${richTextToHtml(rt)}</h2>`);
        break;
      case 'heading_2':
        parts.push(`<h3>${richTextToHtml(rt)}</h3>`);
        break;
      case 'heading_3':
        parts.push(`<h4>${richTextToHtml(rt)}</h4>`);
        break;
      case 'quote':
        parts.push(`<blockquote><p>${richTextToHtml(rt)}</p></blockquote>`);
        break;
      case 'code':
        parts.push(`<pre><code>${richTextToHtml(rt)}</code></pre>`);
        break;
      case 'divider':
        parts.push('<hr>');
        break;
      case 'image': {
        const url     = content.type === 'external' ? content.external?.url : content.file?.url;
        const caption = richTextToHtml(content.caption ?? []);
        if (url) parts.push(`<figure><img src="${url}" alt="${caption}"><figcaption>${caption}</figcaption></figure>`);
        break;
      }
      case 'callout':
        parts.push(`<p><em>${richTextToHtml(rt)}</em></p>`);
        break;
      // column_list / child_page etc. are skipped intentionally
    }
  }

  flushList();
  return parts.join('\n');
}

// ── Extract page metadata ─────────────────────────────────────────────────────

function getTitle(page) {
  const prop = page.properties[NOTION_TITLE_PROPERTY];
  if (prop?.type === 'title') return prop.title?.[0]?.plain_text ?? 'Untitled';
  // Fallback: search all title-type properties
  for (const p of Object.values(page.properties)) {
    if (p.type === 'title' && p.title?.[0]?.plain_text) return p.title[0].plain_text;
  }
  return 'Untitled';
}

function getNotionTags(page) {
  const prop = page.properties[NOTION_TAGS_PROPERTY];
  if (!prop) return [];
  if (prop.type === 'multi_select') return prop.multi_select.map(t => t.name);
  if (prop.type === 'select' && prop.select) return [prop.select.name];
  return [];
}

function getCoverImage(page) {
  if (!page.cover) return null;
  return page.cover.type === 'external' ? page.cover.external?.url : page.cover.file?.url;
}

// ── Fetch all blocks (handles pagination) ─────────────────────────────────────

async function getAllBlocks(pageId) {
  const blocks = [];
  let cursor;

  do {
    const res = await notion.blocks.children.list({
      block_id:    pageId,
      page_size:   100,
      start_cursor: cursor,
    });
    blocks.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);

  return blocks;
}

// ── Process a single page ─────────────────────────────────────────────────────

async function processPage(page) {
  const title = getTitle(page);
  console.log(`  → Processing: "${title}"`);

  try {
    const blocks       = await getAllBlocks(page.id);
    const html         = await blocksToHtml(blocks);
    const tags         = getNotionTags(page).map(name => ({ name }));
    const featureImage = getCoverImage(page);

    const postData = { title, html, status: 'draft', tags };
    if (featureImage) postData.feature_image = featureImage;

    const result = await ghostPost('/posts/?source=html', { posts: [postData] });
    const draft  = result.posts?.[0];

    if (!draft?.id) throw new Error('Ghost returned no post id');

    console.log(`    ✓ Ghost draft created: ${draft.id}`);

    // Mark Notion page as "In Ghost" so it won't re-trigger
    await notion.pages.update({
      page_id:    page.id,
      properties: {
        [NOTION_STATUS_PROPERTY]: {
          // Handle both select and status property types
          ...(page.properties[NOTION_STATUS_PROPERTY]?.type === 'status'
            ? { status: { name: 'In Ghost' } }
            : { select: { name: 'In Ghost' } }),
        },
      },
    });

    console.log(`    ✓ Notion status → "In Ghost"`);

    await notify(`✍️ Draft ready in Ghost: **${title}**\nProof it here: ${GHOST_URL}/ghost/#/editor/post/${draft.id}`);
  } catch (err) {
    console.error(`    ✗ Failed: ${err.message}`);
  }
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
    console.error(`  Notification failed: ${err.message}`);
  }
}

// ── Poll ──────────────────────────────────────────────────────────────────────

async function poll() {
  console.log(`[${new Date().toISOString()}] Polling Notion for "Ready for Ghost"...`);

  try {
    const statusProp = await notion.databases.retrieve({ database_id: NOTION_DATABASE_ID })
      .then(db => db.properties[NOTION_STATUS_PROPERTY])
      .catch(() => null);

    const filterType = statusProp?.type === 'status' ? 'status' : 'select';

    const res = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: NOTION_STATUS_PROPERTY,
        [filterType]: { equals: 'Ready for Ghost' },
      },
    });

    if (res.results.length === 0) {
      console.log('  No pages ready.');
      return;
    }

    console.log(`  Found ${res.results.length} page(s).`);
    for (const page of res.results) {
      await processPage(page);
    }
  } catch (err) {
    console.error(`Poll error: ${err.message}`);
  }
}

// ── Entry point ───────────────────────────────────────────────────────────────

await poll();
setInterval(poll, POLL_INTERVAL_MS);
console.log(`Polling every 15 minutes. Ctrl+C to stop.`);
