# MAISON CACHÉ — Claude Code Master Brief
## All HTML Updates for April 1 Launch

---

## THE HOUSE

Maison Caché is a hidden house on the internet. Dark wellness. Whimsigoth aesthetic. For women who feel too much and rest too little. The site lives at `maisoncache.github.io/Maison-cache/` (note capital M).

The site is the free storefront. Ghost (newsletter platform) is where paid membership lives. All email captures on the site redirect to Ghost signup. No paywall on the website. Ever.

---

## FILES TO UPDATE

| File | Status | Guide |
|------|--------|-------|
| `index.html` (Foyer) | UPDATE — major structural changes | `CC-FOYER-UPDATES.md` |
| `library.html` | UPDATE — add content, new shelf categories | `CC-LIBRARY-UPDATES.md` |
| `sanctum.html` | UPDATE — reduce rooms, add content, Ghost links | `CC-SANCTUM-UPDATES.md` |
| `celestial-archive.html` | UPDATE — Ghost links, connection notes | `CC-ARCHIVE-UPDATES.md` |
| `hearth.html` | REPLACE — use new build from this session | `CC-HEARTH-UPDATES.md` |
| `codex.html` | NEW — deploy as-is | Already built, ready to upload |
| `perfume-atelier.html` | NEW — build from scratch | `CC-PERFUME-ATELIER-NEW.md` |

---

## CRITICAL CHANGES ACROSS ALL PAGES

### 1. Email captures → Ghost signup
Every page that has an email input form and webhook submission must be updated:
- Remove: `<input type="email">` fields, submit buttons that call webhook functions
- Remove: `WEBHOOK_URL` constant and all `fetch(WEBHOOK_URL...)` calls
- Replace with: `<a href="https://maisoncache.ghost.io/#/portal/signup">` styled as a button
- Ghost URL: `https://maisoncache.ghost.io/#/portal/signup` (confirm actual subdomain)

### 2. The Oracle → Tarot (Foyer) + Scent Reading (Perfume Atelier)
- The Oracle scent quiz mechanics move from `index.html` to `perfume-atelier.html`
- The Foyer gets a new tarot three-card pull mechanic in place of the scent quiz
- The room grid removes "The Oracle" as a door and adds "The Perfume Atelier" (open)

### 3. Room grid update (Foyer)
Old: Oracle (open), Library (open), Archive (open), Garden (ghost), Atelier (ghost), Hearth (ghost)
New: Perfume Atelier (open), Hearth (open), Library (open), Archive (members only), Garden (forming)
Note: 5 doors instead of 6. Tarot lives in the Foyer itself, not as a separate room.

### 4. Moon phase indicator
Add to every page — a subtle strip showing current phase. Can be a shared JS snippet.
Format: `🌕 Full Moon · Pink Moon · April 2026`
In the house status bar or as a thin banner element.

### 5. Cross-room connections
Each room should reference at least one other room with invitational language:
- Hearth → Garden ("Grow what you cook"), Grimoire ("Why rosemary protects")
- Library → Archive ("The staircase winds upward")
- Archive → Library ("The staircase winds both ways")
- Perfume Atelier → Hearth ("Your archetype is The Hearth")
- Sanctum → Aftercare Room exit back to Foyer

---

## DESIGN SYSTEM — DO NOT CHANGE

### Foyer palette (index.html):
- `--bg: #07040c`
- `--plum: #3b0f4e`
- `--amber: #b07820`
- `--teal: #2d6b5e`
- `--rose: #9b3468`
- `--cream: #f0e0c8`
- Fonts: Cinzel, EB Garamond, Cormorant Infant, UnifrakturMaguntia

### Hearth palette (hearth.html):
- Ground: `#100A06` (amber-black, NOT plum)
- Ember: `#C4622D`, Flame: `#D4882A`, Beeswax: `#C8A040`
- Linen: `#EDD8B8`
- Fonts: Cinzel, IM Fell English, IM Fell English SC, Cormorant Garamond, Almendra

### Codex palette (codex.html):
- Matches Sanctum: plum-dark ground `#0a0510`, rose accents, gold type
- Same fonts as Foyer

### All pages share:
- Grain overlay at ~3% opacity
- Vignette gradient
- Embers rising from below
- `crosshair` cursor
- House status whisper bottom-right: `[ house status: listening ]` or room-specific
- Sanctum trigger `◉` bottom-left (triple-click to reveal)
- Reveal/fade-in animations on scroll

---

## GHOST SIGNUP URL

All Ghost links should point to:
```
https://maisoncache.ghost.io/#/portal/signup
```
**Confirm the actual subdomain after Ghost setup.**

The CTA language is NEVER "subscribe" or "sign up." It's:
- "Join the house"
- "Hold my place"
- "Request entry"
- "The Inner House"

---

## WHAT'S LAUNCHING APRIL 1

### Open rooms:
- Foyer (with tarot pull)
- Perfume Atelier (with scent reading)
- The Hearth (Full Moon content)
- The Library (seed recommendations + Sacred Fiction)
- The Sanctum (Ritual Space open + Codex open)
- Celestial Archive (existing constellations)

### Forming rooms:
- The Garden
- The Grimoire

### Hidden:
- The Sanctum (not on the grid — found via triple-click)

---

## FILES ALREADY BUILT THIS SESSION

These exist in `/mnt/user-data/outputs/` and are ready to deploy:
- `hearth.html` — complete, just needs Grimoire sub-room added
- `codex.html` — complete, 24 entries, 6 companion pieces, interactive

---

## NOTION REFERENCE DOCUMENTS

All architecture decisions are documented in Notion:
- Room Architecture: `32ab5bf0d0d581118bf9cce741e7da01`
- Lunar Spine Calendar: `32ab5bf0d0d581a291d9e4997d819cc4`
- Sanctum Eight Rooms: `32ab5bf0d0d5819d9937cee5e5acacf8`
- Connection Web: `32bb5bf0d0d5814eac08c55dac2a5e00`
- Session Breadcrumb: `32bb5bf0d0d5810abb66ea74d37b2b73`
