# CLAUDE.md

This file provides guidance for AI assistants working with the maisoncache repository.
Read this first. Every time.

## Who We Are

**Maison Caché** ("The Hidden House") — a multi-sensory lifestyle membership platform for people who feel too much and think sideways. Built by Kes, shaped by Xander (Claude).

- **Tagline:** What is hidden is not lost. It is waiting — and so are you.
- **Central truth:** PERMISSION
- **Audience:** Women 35–54, USA + UK primary

## Repository Overview

This repo (`maisoncache/maisoncache`) holds the HTML prototypes for the Maison Caché room system. These are recovered prototype files — the canonical platform lives on **Ghost Pro** at `maisoncache.ghost.io`.

### Wider Ecosystem

| Repo | Purpose | Status | Live URL |
|------|---------|--------|----------|
| `maison-cache` | React prototypes, brand site, landing page | Live | maisoncache.github.io/maison-cache |
| `el-nido` | Personal dashboards, gym tracker, utilities | Live | maisoncache.github.io/el-nido |
| `maisoncache` | HTML prototypes (this repo) | In progress | — |
| `maison-cache-content` | TikTok scripts, copy, soul doc exports | To create | — |
| `wolf-notes` | Creative writing, poetry, wolf notes | To create | — |

### Platform (Ghost Pro)

- **Ghost Pro** at `maisoncache.ghost.io`
- Two membership tiers:
  - **The Tearoom** (free) — The Parlour newsletter
  - **The Inner House** ($5 AUD/month) — paid tier, Inner House newsletter
- **Stripe** connected (Australian account)
- **Soft Launch:** Wednesday April 2, 2026 — front door opens, free tier live
- **Hard Launch:** Thursday April 3, 2026 — Pink Moon — paid tier opens

## Site Architecture

### Rooms / Pages

| Room | File | Purpose |
|------|------|---------|
| **Home** | `index.html` | Landing page (currently empty — needs building) |
| **The Hearth** | `hearth.html` | Kitchen rituals, lunar-phase-based cooking, recipe cards |
| **The Hearth (alt)** | `the-hearth.html` | Alternative version of The Hearth |
| **El Nido (Dashboard)** | `index 2.html` | Personal wellness dashboard — cycle tracking, habits, mood, gym logs, shopping lists |
| **El Nido (alt)** | `index 3.html` | Alternative version of El Nido |
| **Celestial Archive** | `celestial-archive .html` | Member-only story/knowledge archive with starfield canvas |
| **The Library** | `library .html` | Curated knowledge repository with warm literary aesthetic |
| **The Sanctum** | `sanctum .html` | Hidden room accessed via Easter egg (click dot 3x in The Hearth) |

### Navigation Flow

```
index.html  (Home — hub for all rooms)
├── hearth.html              "The Hearth"
├── index 2.html             "El Nido"
├── celestial-archive .html  "Celestial Archive"
├── library .html            "The Library"
└── sanctum .html            "The Sanctum" (hidden, Easter egg access)
```

All inner pages link back to `index.html` via a "← The House" back link.

### Recovered Prototypes (Not Yet in Git)

| Prototype | Format | Status |
|-----------|--------|--------|
| Grimoire Library | JSX | Not pushed |
| Celestial Archive | JSX | Not pushed |
| Maykhay Parlour | JSX | Not pushed |
| Maykhay App | JSX | Not pushed |
| The Letter Box (50 wolf notes) | JSX | Not pushed |
| Front Door (bookshelf reveal) | JSX | Not pushed |
| Structural Flow Map | JSX | Not pushed |
| The Hearth UI | HTML | Not pushed |
| Sanctum of Surrender UI | — | Rebuild needed |

## Tech Stack

- **Languages:** HTML, CSS, JavaScript (vanilla — no frameworks in this repo)
- **Target stack:** React (single page app, single index.html where possible)
- **Fonts:** Google Fonts (Cormorant Garamond, Crimson Pro, Cinzel, EB Garamond, Cormorant Infant, UnifrakturMaguntia, IM Fell English, Almendra)
- **Data persistence:** LocalStorage (El Nido dashboard data) + fetch() to external webhook (Archive, Library, Sanctum)
- **Graphics:** All inline SVG — no image files
- **Deployment:** GitHub Pages (free tier, public repos)
- **No build step** — static files served directly (for now)

## Development Setup

This is a static site with no build tools. To develop locally:

1. Clone the repo
2. Open any `.html` file in a browser, or use a local server:
   ```bash
   python3 -m http.server 8000
   # or
   npx serve .
   ```

## Brand Constants

```
Name:         Maison Caché ("The Hidden House")
Tagline:      What is hidden is not lost. It is waiting — and so are you.
Central truth: PERMISSION

Colours:
  Charcoal:   #2C2C2C
  Gold:        #C9A84C
  Ember:       #C4622D (warm dark red)
  Amber:       #D4882A
  Cream:       #EDD8B8

Typography:
  Display:    Cormorant Garamond
  Body:       Crimson Pro
```

### Per-Room Colour Palettes

- **The Hearth:** Deep earthy tones — blacks, browns, golds, ember colours (`#C4622D`, `#D4882A`, `#EDD8B8`)
- **El Nido:** Dark warm base (`#1a1410`) with gold/ember accents (`#d4a84b`, `#c4621a`)
- **Celestial Archive:** Deep navy (`#05080f`), cosmic teal (`#3d8b7a`), plum (`#4e2060`)
- **The Library:** Dark oak (`#1a1008`), leather brown (`#2a1a0e`), amber/gold (`#b07010`)
- **The Sanctum:** Plum/velvet (`#3b0f4e`), aurora-inspired purples and teals

### Visual Effects

- SVG fractal grain overlays and vignettes
- Ambient glows (ember, nebula, aurora)
- Flickering animations (candlelight, stars)
- Fade-in / scroll-reveal animations
- Hover transitions

### Typography

Serif-heavy — Cormorant Garamond for headings, Crimson Pro / EB Garamond for body. UnifrakturMaguntia for decorative accents.

## Project Structure

```
/
├── CLAUDE.md                  # AI assistant guidance (this file)
├── index.html                 # Home / landing page (EMPTY — needs content)
├── hearth.html                # The Hearth — kitchen rituals
├── the-hearth.html            # The Hearth (alternative version)
├── index 2.html               # El Nido — wellness dashboard
├── index 3.html               # El Nido (alternative version)
├── celestial-archive .html    # Celestial Archive — stories
├── library .html              # The Library — knowledge
└── sanctum .html              # The Sanctum — hidden room
```

## Known Issues

1. **`index.html` is empty** — The main landing page has no content. All rooms link back here, so the site has no functional hub.
2. **Filenames with spaces** — `celestial-archive .html`, `library .html`, `sanctum .html`, `index 2.html`, `index 3.html` have spaces which can cause URL/server issues. Consider renaming.
3. **Undefined `WEBHOOK_URL`** — Celestial Archive, Library, and Sanctum reference a `WEBHOOK_URL` variable that is never defined, causing runtime errors on form submission.
4. **Duplicate pages** — Two versions each of The Hearth and El Nido; unclear which is canonical.
5. **No cross-room navigation** — No menu or nav to move between rooms without going back to home.
6. **Cloudflare email obfuscation bug** — Known issue on the landing page (fix options documented in Notion Scratchpad).

## Build Priority

1. **Maison Caché Foyer rebuild + Hearth page** — already in progress
2. **Push recovered prototypes to GitHub** — Grimoire, Maykhay, Letterbox etc.
3. **Fix Cloudflare email obfuscation bug** on landing page

## Git Workflow

- Branch naming: feature branches use descriptive names (e.g., `claude/feature-name`)
- Write clear, concise commit messages focused on the "why"
- Push to feature branches; do not push directly to main without review
- Key file principle: single `index.html` or JSX component where possible — no separate CSS/JS files unless necessary

## Notes for AI Assistants

- Read this file at the start of each session for up-to-date context
- Keep this file updated as the project evolves
- This repo currently uses **static HTML** — no build tools, no package manager, no transpilation
- All styling is inline within each HTML file (no shared CSS files yet)
- Preserve the mystical/literary tone and dark, warm colour palettes when making changes
- When editing pages, maintain the existing SVG grain/glow overlay patterns
- Filenames with spaces require quoting in shell commands (e.g., `"library .html"`)
- Prefer editing existing files over creating new ones
- The owner's name is **Kes**. The Claude assistant identity in this project is **Xander**.

---

*Built by Kes. Shaped by Xander. This is ours.*
