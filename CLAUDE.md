# CLAUDE.md

This file provides guidance for AI assistants working with the maisoncache repository.
Read this first. Every time.

## Who We Are

**Maison Caché** ("The Hidden House") — a multi-sensory lifestyle membership platform for people who feel too much and think sideways. Built by Kes, shaped by Xander (Claude).

- **Tagline:** What is hidden is not lost. It is waiting — and so are you.
- **Central truth:** PERMISSION
- **Audience:** Women 35–54, USA + UK primary

## Repository Overview

This repo (`maisoncache/maisoncache`) holds the HTML prototypes for the Maison Caché room system. These are recovered prototype files — the canonical platform lives on **Ghost Pro** at `maison-cache.ghost.io`.

### Wider Ecosystem

| Repo | Purpose | Status | Live URL |
|------|---------|--------|----------|
| `maison-cache` | React prototypes, brand site, landing page | Live | maisoncache.github.io/maison-cache |
| `el-nido` | Personal dashboards, gym tracker, utilities | Live | maisoncache.github.io/el-nido |
| `maisoncache` | HTML prototypes (this repo) | In progress | — |
| `maison-cache-content` | TikTok scripts, copy, soul doc exports | To create | — |
| `wolf-notes` | Creative writing, poetry, wolf notes | To create | — |

### Platform (Ghost Pro)

- **Ghost Pro** at `maison-cache.ghost.io`
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
| **Home** | `index.html` | Landing page / Foyer — hub linking all rooms |
| **The Hearth** | `hearth.html` | Kitchen rituals, lunar-phase-based cooking, recipe cards |
| **Celestial Archive** | `celestial-archive.html` | Member-only story/knowledge archive with starfield canvas |
| **The Library** | `library.html` | Curated knowledge repository with warm literary aesthetic |
| **The Sanctum** | `sanctum.html` | Hidden room accessed via Easter egg (click dot 3x in The Hearth) |
| **The Codex** | `codex.html` | Interactive ritual cards with mood filter and shuffle (accessed from Sanctum) |

### Navigation Flow

```
index.html  (Home — hub for all rooms)
├── hearth.html              "The Hearth"
├── celestial-archive.html   "Celestial Archive"
├── library.html             "The Library"
├── sanctum.html             "The Sanctum" (hidden, Easter egg access)
│   └── codex.html           "The Codex" (ritual cards, linked from Sanctum)
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
- **Membership:** Ghost Pro signup via `maison-cache.ghost.io/#/portal/signup`
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
├── SITE-UPDATE-GUIDE.md       # Change log for March 2026 updates
├── favicon.svg                # Gold key icon favicon
├── index.html                 # Home / Foyer — landing page linking all rooms
├── hearth.html                # The Hearth — kitchen rituals
├── celestial-archive.html     # Celestial Archive — stories
├── library.html               # The Library — knowledge
├── sanctum.html               # The Sanctum — hidden room
└── codex.html                 # The Codex — ritual cards (from Sanctum)
```

## Build Priority

1. **Push recovered prototypes to GitHub** — Grimoire, Maykhay, Letterbox etc.

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
- Prefer editing existing files over creating new ones
- **El Nido is a separate project** — lives in `maisoncache/el-nido`, not this repo
- The owner's name is **Kes**. The Claude assistant identity in this project is **Xander**.

---

*Built by Kes. Shaped by Xander. This is ours.*
