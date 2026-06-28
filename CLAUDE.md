# Maison Caché — Claude Code Context

You are working on the Maison Caché website. Read this before touching anything.

---

## What this project is

A Ghost membership platform + GitHub Pages static site.

- **Static site (GitHub Pages):** `maisoncache.github.io/maisoncache/` — this is what you edit
- **Ghost platform:** `maison-cache.ghost.io` — membership, payments, gated content. Do not touch.
  (Note the **hyphen** in the subdomain. `maisoncache.ghost.io` without the hyphen is wrong.)
- **Two tiers:** free (moon-cycle letters) · **The Inner House — $5 AUD/month**
  (deeper rooms, full recipe cycles, rituals, serialised fiction, first entry to new rooms)

All Ghost CTAs across the site point to:
`https://maison-cache.ghost.io/#/portal/signup`
Do not change this URL.

---

## Branches — IMPORTANT

- **`main` is the deployed branch.** GitHub Pages serves it, and `automation/ghost-to-github.js`
  commits published Ghost posts to it. All work happens on `main` (or branches off it).
- Old `claude/*` branches are **stale** (pre-parchment redesign, ~48+ commits behind).
  Do not work from them, and do not trust any docs or code you find on them.
- If the repo's default branch is not `main`, that is a misconfiguration — flag it.

---

## Design system — current (post-parchment redesign)

Each room keeps its own palette. Do not flatten them into one.

- **Foyer (`index.html`) & Library (`library.html`):** warm parchment — light house, dark ink.
  Ground `#ede4d4`, ink `#2a1f14`, gold/amber accents (`#8b6530` family).
- **Hearth (`hearth.html`):** amber-black. Ground `#100A06`, ember `#C4622D`,
  flame `#D4882A`, beeswax `#C8A040`, linen `#EDD8B8`.
- **Sanctum / Codex / Celestial Archive:** dark plum ground (`#0a0510` / `#07040c` family),
  rose and gold accents, teal for the Archive.

Fonts: UnifrakturMaguntia (title) · Cinzel (display) · EB Garamond (body) ·
Cormorant Infant (italic) · IM Fell English (Hearth).

Copperplate illustrations live in `img/` as **WebP** (converted from PNG for performance).
`img/og-card.jpg` is the social share image — referenced as `og:image` on every page.

---

## Moon phase — single source of truth

`js/moon.js` computes the current phase and populates every "current sky" display:
`.moon-strip`, `#house-status-phase`, and the Hearth's `#moon-phase-indicator`.

**Never hardcode a moon phase, moon date, or moon emoji in a page.** If a new page
needs the phase, include `<script src="js/moon.js"></script>` before `</body>`.
(Recipe/ritual *labels* like "Waxing Crescent · Kindle" describe the content's phase,
not today's sky — those are content metadata and are fine.)

---

## Current room states (keep the Foyer in sync with reality)

- Perfume Atelier — open
- Hearth — open (Full Moon recipe always free; two archive recipes members-only)
- Library — always open, **indexable** (do not add `noindex` — book pages are the SEO channel)
- Celestial Archive — **open, un-gated** ("open — for now" on the Foyer door).
  If it is ever re-gated, update the Foyer badge and this file together.
- Sanctum — hidden (triple-click `◉` dot), 18+ age gate. 2 of 8 rooms open.
- Codex — Sanctum sub-page, currently open/free.
- Garden — **open**. Seed packet mechanic: one plant per new moon, tears open to reveal riddle + four accordion sections (Grow it / Use it / Know it / Pair it). Hemisphere toggle (localStorage `mc-hemisphere`, same key as Hearth). Free teaser; deeper content members-only. Automation markers update the packet monthly. Do not hardcode plant content outside the AUTOMATION markers.
- Grimoire — "forming", intentionally not linked.

---

## Mechanisms — DO NOT TOUCH

Working and sacred:

- Console easter egg + `maison` typed keyword trigger
- Midnight door (fires 12:00–2:59am AEST — the "note for the sleepless")
- Tarot Oracle three-card pull (Foyer) · Scent reading quiz (Atelier)
- Ember/dust particles, aurora/grain atmosphere layers
- Status bar (`#house-status`) on every page, with phase + clock where present
- Sanctum `◉` triple-click trigger (every page) · `descend` keyword
- Library: book tooltips, cat recommendations, portrait cycle, hidden secret book passage
- Hearth: hemisphere toggle (localStorage `mc-hemisphere`), 3-minute idle note
- **Foyer oracle surface:** three face-down cards already on the table — click/hover to fan,
  click to open the oracle overlay. No "Draw your cards" button. Do not add one back.
- **Foyer 90-second idle whisper:** after 90s of inactivity, "You're still here." appears
  once and fades. No CTA attached. Do not attach one.
- **Foyer door personalities:** each `.hall-door` has a class modifier —
  `--ajar` (Atelier, permanent light-leak), `--sound` (Hearth, pulsing dash),
  `--noted` (Library, pinned note slip), `--distant` (Archive, slightly receded).
  Do not remove these classes or flatten them back to the base style.

## Removed — do not reintroduce

- Fake visitor counter ("last candle lit") — removed; only add back if wired to real data
- Placeholder sound toggle — removed until real ambient audio exists
- Library webring placeholder links (`href="#"`) — removed
- `shopping/` personal app — **must never live in this public brand repo**
  (note: it still exists in git history; treat the email it contained as exposed)

---

## Automation

`automation/` is a Node service (not deployed with the site):
Ghost `post.published` webhook → injects HTML at `<!-- AUTOMATION:*_END -->` markers
(Hearth archive, Library books, Archive stars, Sanctum rooms) → commits to `main` →
Pages redeploys. Keep those markers intact.

---

## Historical docs

`CC-*.md` and `SITE-UPDATE-GUIDE.md` are **April 2026 launch briefs**, kept for
reference. They describe a previous version of the site (dark-only foyer palette,
members-gated Archive, unhyphenated Ghost subdomain). Do not implement from them.
This file is the source of truth.

---

## Notes

- Southern (Autumn) and Northern (Spring) hemisphere content both exist — respect both.
- The Sanctum is 18+ only, age-gated. The gate is correct — do not remove it.
- CTA language is never "subscribe" or "sign up": use "Join the house",
  "Hold my place", "Request entry", "The Inner House".
- Pricing language on the site: "The Inner House — $5 AUD/month". Keep it visible
  wherever The Inner House is mentioned.
- `cursor: crosshair` on `body` and `button` across all pages (Foyer was previously
  `cursor: default` — now corrected; do not revert).
