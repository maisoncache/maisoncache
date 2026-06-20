# Stage 1 — Quick Realign · ready to publish

**What changed:** the old tier name/price **"The Inner House — $5 AUD/month"** is now
**"The Grimoire — $7 AUD/month"** everywhere it appeared on the website. Nothing else was
touched — every room keeps its design, its scent quiz, its moon/clock, its Ghost doors.

## The 4 corrected files (in this folder)
- `index.html` — the Foyer join line
- `hearth.html` — 3 spots (the phase line, the cycle line, the price line)
- `library.html` — the members reading line
- `perfume-atelier.html` — the Ghost CTA line

(`celestial-archive.html` and `sanctum.html` had no pricing — they already funnel to Ghost, so they're untouched.)

## How to put them live (no install — all in the browser)
1. Go to **github.com/maisoncache/maisoncache** (signed in).
2. Click **Add file → Upload files**.
3. **Drag all 4 files** from this folder into the page. Same filenames = they replace the old ones.
4. Scroll down, write a commit message (e.g. *"Stage 1 realign — Grimoire $7"*), click **Commit changes**.
5. Wait ~1 minute, then hard-refresh **maisoncache.github.io/maisoncache/** (Ctrl/Cmd+Shift+R).

## Doors + moon/clock — audit result
- **Ghost doors:** present in every open room (Atelier, Hearth, Library all funnel to signup; the Archive
  funnels to its Ghost article pages; the Sanctum's room cells + "Hold my place" all go to signup). ✓
- **Moon/clock status bar + fonts:** consistent across index, Atelier, Hearth, Library, Archive. ✓

## Two small things parked for your call (not changed)
1. **Celestial Archive** has no generic "join" door — only links to specific Ghost writings. That's on-brand
   (discovery, not hard-sell). Leave as-is, or add one subtle "the fuller archive lives in the house" door?
2. **The Sanctum** uses its own `[ sanctum : waiting ]` status line instead of the house moon/clock bar.
   Intentional separateness, or bring the house chrome down into it too? Your call.
