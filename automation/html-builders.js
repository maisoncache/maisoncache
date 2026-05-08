/**
 * HTML fragment builders — one per website section.
 * Called by ghost-to-github.js when a Ghost post is published.
 */

// ── Moon phase mappings ──────────────────────────────────────────────────────

const MOON_EMOJIS = {
  'full-moon':       '🌕',
  'waning-gibbous':  '🌖',
  'last-quarter':    '🌗',
  'waning-crescent': '🌘',
  'new-moon':        '🌑',
  'waxing-crescent': '🌒',
  'first-quarter':   '🌓',
  'waxing-gibbous':  '🌔',
};

const MOON_NAMES = {
  'full-moon':       'Full Moon',
  'waning-gibbous':  'Waning Gibbous',
  'last-quarter':    'Last Quarter',
  'waning-crescent': 'Waning Crescent',
  'new-moon':        'New Moon',
  'waxing-crescent': 'Waxing Crescent',
  'first-quarter':   'First Quarter',
  'waxing-gibbous':  'Waxing Gibbous',
};

// ── Library: valid categories and spine colour palette ───────────────────────

const LIBRARY_CATEGORIES = [
  'something-light',
  'something-real',
  'something-to-learn',
  'from-the-old-house',
];

// Rotates through existing spine colours on each new book
const SPINE_PALETTE = [
  { spine: '#0e1a14', color: '#1a2e22' },
  { spine: '#3a2010', color: '#6b3518' },
  { spine: '#2e1a0e', color: '#4a2e18' },
  { spine: '#1a0a14', color: '#2e1422' },
  { spine: '#1a0e18', color: '#2e1a2e' },
  { spine: '#2a1a0e', color: '#4a2e18' },
  { spine: '#1a1018', color: '#2e1a28' },
  { spine: '#0e1a2a', color: '#1a2a3e' },
];

// ── Celestial archive: predefined positions for new named stars ──────────────
// These sit in the currently sparse right-side area of the constellation map.
// Kes can nudge the inline style values after the fact if needed.
const NEW_STAR_POSITIONS = [
  { left: 72.0, top: 55 },
  { left: 65.3, top: 68 },
  { left: 78.6, top: 48 },
  { left: 68.0, top: 78 },
  { left: 75.4, top: 62 },
  { left: 63.1, top: 75 },
  { left: 82.9, top: 58 },
  { left: 70.0, top: 45 },
];

// ── Escape helpers ────────────────────────────────────────────────────────────

export function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return String(str ?? '').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
}

function escapeJs(str) {
  return String(str ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n');
}

function escapeTemplate(str) {
  return String(str ?? '').replace(/`/g, '\\`').replace(/\${/g, '\\${');
}

// ── Tag utilities ─────────────────────────────────────────────────────────────

function tagSlugs(tags) {
  return (tags ?? []).map(t =>
    (t.slug ?? t.name ?? '').toLowerCase().replace(/\s+/g, '-')
  );
}

function getMoonPhase(tags) {
  const slugs = tagSlugs(tags);
  return Object.keys(MOON_EMOJIS).find(phase => slugs.includes(phase)) ?? null;
}

function getSeasonEmoji(tags, publishedAt) {
  const slugs = tagSlugs(tags);
  if (slugs.includes('autumn') || slugs.includes('fall')) return '🍂';
  if (slugs.includes('winter')) return '❄️';
  if (slugs.includes('spring')) return '🌸';
  if (slugs.includes('summer')) return '☀️';

  // Auto-detect from Southern Hemisphere calendar (Maison Caché is Australian)
  const month = new Date(publishedAt).getMonth(); // 0-indexed
  if (month >= 2 && month <= 4) return '🍂'; // Mar–May: Autumn
  if (month >= 5 && month <= 7) return '❄️'; // Jun–Aug: Winter
  if (month >= 8 && month <= 10) return '🌸'; // Sep–Nov: Spring
  return '☀️';                                 // Dec–Feb: Summer
}

function isMembers(post) {
  return post.visibility === 'members' || post.visibility === 'paid';
}

// ── Builder: hearth.html → .archive-item ─────────────────────────────────────

export function buildHearthArchiveItem(post) {
  const moonPhase   = getMoonPhase(post.tags);
  const moonEmoji   = moonPhase ? MOON_EMOJIS[moonPhase] : '🌙';
  const moonName    = moonPhase ? MOON_NAMES[moonPhase]  : 'Moon';
  const publishDate = new Date(post.published_at);
  const month       = publishDate.toLocaleString('en-AU', { month: 'long' });
  const year        = publishDate.getFullYear();
  const phaseDisplay = `${moonName} · ${month} ${year}`;
  const title       = escapeHtml(post.title);

  const memberCell = isMembers(post)
    ? `<div class="archive-locked"><a href="https://maison-cache.ghost.io/#/portal/signup" target="_blank" rel="noopener noreferrer">members</a></div>`
    : `<div class="archive-season">${getSeasonEmoji(post.tags, post.published_at)}</div>`;

  return `          <div class="archive-item">
            <div class="archive-moon">${moonEmoji}</div>
            <div class="archive-info">
              <div class="archive-recipe-name">${title}</div>
              <div class="archive-phase-name">${phaseDisplay}</div>
            </div>
            ${memberCell}
          </div>`;
}

// ── Builder: library.html → BOOKS[] entry ────────────────────────────────────
// existingMaxId: highest id currently in the BOOKS array (parsed from file)

export function buildLibraryBook(post, existingMaxId) {
  const slugs    = tagSlugs(post.tags);
  const category = LIBRARY_CATEGORIES.find(c => slugs.includes(c)) ?? 'something-real';
  const id       = existingMaxId + 1;
  const colors   = SPINE_PALETTE[existingMaxId % SPINE_PALETTE.length];
  const title    = escapeJs(post.title);
  const author   = escapeJs(post.primary_author?.name ?? 'Unknown');
  const note     = escapeTemplate(post.custom_excerpt || post.excerpt || '');

  return `      {
        id: ${id},
        title: "${title}",
        author: "${author}",
        note: \`${note}\`,
        category: "${category}",
        spine: "${colors.spine}", color: "${colors.color}"
      }`;
}

// ── Builder: celestial-archive.html → .star-node ─────────────────────────────
// existingNamedCount: number of existing named (non-dim) star-label divs in file

export function buildCelestialStarNode(post, existingNamedCount) {
  const pos   = NEW_STAR_POSITIONS[existingNamedCount % NEW_STAR_POSITIONS.length];
  const label = post.title;
  const click = `openLocked('${escapeJs(label)}')`;

  return `        <!-- ${escapeHtml(label)} -->
        <div class="star-node" style="left:${pos.left}%;top:${pos.top}%"
             role="button" tabindex="0"
             aria-label="${escapeAttr(label)}"
             onclick="${click}"
             onkeydown="if(event.key==='Enter')${click}"
             onmouseenter="setStatus('${escapeJs(label.toLowerCase())}')"
             onmouseleave="setStatus('the archive breathes')">
          <div class="star-node-inner">
            <div class="star-point"></div>
            <div class="star-label">${escapeHtml(label)}</div>
          </div>
        </div>`;
}

// ── Builder: sanctum.html → ROOMS{} entry ────────────────────────────────────

export function buildSanctumRoom(post) {
  // Derive a safe JS identifier from the post slug
  const key  = post.slug.replace(/-/g, '_').replace(/[^a-z0-9_]/gi, '').slice(0, 40);
  const name = escapeJs(post.title);
  const body = escapeTemplate(post.custom_excerpt || post.excerpt || 'Coming soon.');

  return `      ${key}: {
        glyph: '✦',
        name: '${name}',
        open: false,
        body: \`${body}\`,
        sub: 'Opening soon.',
        color: 'rgba(45,107,94,0.55)',
      }`;
}
