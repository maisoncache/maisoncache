# CLAUDE.md

This file provides guidance for AI assistants working with the maisoncache repository.

## Repository Overview

**Maison Caché** ("The Hidden House") is a static website designed as a collection of interconnected "rooms," each with its own aesthetic and purpose. The site emphasises ritual, intentionality, and self-care through a mystical, luxurious lens. Built entirely with vanilla HTML, CSS, and JavaScript — no frameworks.

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
├── hearth.html         "The Hearth"
├── index 2.html        "El Nido"
├── celestial-archive .html  "Celestial Archive"
├── library .html       "The Library"
└── sanctum .html       "The Sanctum" (hidden, Easter egg access)
```

All inner pages link back to `index.html` via a "← The House" back link.

## Tech Stack

- **Languages:** HTML, CSS, JavaScript (vanilla — no frameworks)
- **Fonts:** Google Fonts (Cormorant Garamond, Crimson Pro, Cinzel, EB Garamond, Cormorant Infant, UnifrakturMaguntia, IM Fell English, Almendra)
- **Data persistence:** LocalStorage (El Nido dashboard data) + fetch() to external webhook (Archive, Library, Sanctum)
- **Graphics:** All inline SVG — no image files
- **No build step** — static files served directly

## Development Setup

This is a static site with no build tools. To develop locally:

1. Clone the repo
2. Open any `.html` file in a browser, or use a local server:
   ```bash
   python3 -m http.server 8000
   # or
   npx serve .
   ```

## Design System

### Aesthetic

Mystical luxury / intimate literary / dark academia. Each room has its own colour palette:

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
2. **Filenames with spaces** — `celestial-archive .html`, `library .html`, `sanctum .html`, `index 2.html`, `index 3.html` have spaces which can cause URL/server issues. Consider renaming (e.g., `celestial-archive.html`).
3. **Undefined `WEBHOOK_URL`** — Celestial Archive, Library, and Sanctum reference a `WEBHOOK_URL` variable that is never defined, causing runtime errors on form submission.
4. **Duplicate pages** — Two versions each of The Hearth and El Nido; unclear which is canonical.
5. **No cross-room navigation** — No menu or nav to move between rooms without going back to home.

## Git Workflow

- Branch naming: feature branches use descriptive names (e.g., `claude/feature-name`)
- Write clear, concise commit messages focused on the "why"
- Push to feature branches; do not push directly to main without review

## Notes for AI Assistants

- Read this file at the start of each session for up-to-date context
- Keep this file updated as the project evolves
- This is a **static site** — no build tools, no package manager, no transpilation
- All styling is inline within each HTML file (no shared CSS files yet)
- Preserve the mystical/literary tone and dark, warm colour palettes when making changes
- When editing pages, maintain the existing SVG grain/glow overlay patterns
- Filenames with spaces require quoting in shell commands (e.g., `"library .html"`)
- Prefer editing existing files over creating new ones
