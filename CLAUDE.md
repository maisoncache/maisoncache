# Maison Caché — Claude Code Context

You are working on the Maison Caché website. Read this before touching anything.

---

## What this project is

A Ghost membership platform + GitHub Pages static site.

- **Static site (GitHub Pages):** `maisoncache.github.io/maisoncache/` — this is what you edit
- **Ghost platform:** `maison-cache.ghost.io` — membership, payments, gated content. Do not touch.
- **Two tiers:** The Parlour (free) · The Inner House ($5 AUD/month)

All Ghost CTAs across the site point to:
`https://maison-cache.ghost.io/#/portal/signup`
Do not change this URL.

---

## Design system — do not override these

```css
--bg: #07040c;
--teal: #2d6b5e;
--teal-bright: #3d8b7a;
--amber: #b07820;
--amber-bright: #c4882a;
```

Fonts: UnifrakturMaguntia (title) · Cinzel (display) · EB Garamond (body) · Cormorant Infant (italic)

---

## What's already done — do not redo

- **Phase 1 (index.html):** Status bar, marquee strip, room card window chrome, scanline opacity — all live ✅
- **Phase 2 (all pages):** Status bar on every page, library book hover tooltips, sanctum "descend" keyword, hearth idle reveal — all live ✅
- **Library card (index.html):** Already clean — shows "free to browse" only, no members badge ✅
- **Ghost URL:** Already correct on all pages ✅

---

## What still needs doing

All code is written. Your job is to implement from the docs below.

### 1. Content gating fixes
**File:** `MC_Gating_Fixes.md`
Covers: Sanctum room gating · Hearth copy + archive tags · Hearth mid-page CTA · Celestial Archive duplicate CTA

### 2. Celestial Archive — remove duplicate Ghost CTA
**File:** `celestial-archive.html`
Two Ghost CTAs sitting close together. Keep "Request entry." Remove the "Join the house →" link. Move "New stars appear at the full moon. Members enter first. Members enter deeper." to sit above the single remaining button.

---

## Mechanisms — DO NOT TOUCH

These are working and sacred. Don't break them:

- Console easter egg: "You weren't supposed to find this room" + "Type `maison` anywhere"
- `maison` keyboard trigger — opens the Sanctum reveal overlay
- 3AM door mechanism
- Ember particles
- Aurora / grain / scanlines atmosphere layers
- `#house-status` status bar (bottom of every page)
- Sanctum `descend` keyword trigger
- Library book hover tooltips
- Hearth idle reveal (3-min timer)

---

## File reference

| File | What it covers |
|------|---------------|
| `MC_Gating_Fixes.md` | All content gating — precise find/replace for sanctum.html + hearth.html |
| `MC_Phase2_Code.md` | Phase 2 code — status bars, hearth reveal, sanctum keyword, library tooltips |
| `MC_Phase2_Library_Fix.md` | Corrections to Phase 2 library instructions (books are JS-rendered, not static HTML) |
| `MC_Index_Redesign_Phase1.md` | Phase 1 index.html changes — already implemented |
| `MC_Website_Audit_April2026.md` | Full audit from April 3 2026 — good for context |
| `MC_Easter_Ghost_Content.md` | Ghost post content ready to publish |

---

## Notes

- The site has both Southern (Autumn) and Northern (Spring) hemisphere content — respect both wherever it appears
- Moon phase in the marquee/status bars reflects current phase — update when the phase changes
- Visitor counter is a fake display counter, not connected to analytics — leave it
- The Sanctum is 18+ only, age-gated. The gate is correct — do not remove it
- codex.html is a Sanctum sub-page. It should redirect to Ghost signup, not open freely
