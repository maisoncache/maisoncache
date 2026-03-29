# FOYER (index.html) — Content & Structure Updates

## OVERVIEW
The Foyer is the landing page. The biggest change: the Oracle scent quiz is being replaced by a tarot three-card pull as the interactive anchor. The scent reading moves to the Perfume Atelier page (new page). Room grid restructured. Email captures replaced with Ghost signup links.

---

## ROOM GRID — Replace current 6-card grid

Current grid: Oracle (open), Library (open), Archive (open), Garden (ghost), Atelier (ghost), Hearth (ghost)

New grid (5 doors):

### Door 1 — Perfume Atelier (OPEN)
- Tag: `open now`
- Motif: `🌺`
- Name: `The Perfume Atelier`
- Sub: `Scent reading`
- Link: `perfume-atelier.html`
- Status hover: `the perfume atelier — open`

### Door 2 — The Hearth (OPEN)
- Tag: `open now`
- Motif: `🔥`
- Name: `The Hearth`
- Sub: `Kitchen rituals`
- Link: `hearth.html`
- Status hover: `the hearth — open`

### Door 3 — The Library (OPEN)
- Tag: `open now`
- Motif: `📚`
- Name: `The Library`
- Sub: `Always open`
- Link: `library.html`
- Status hover: `the library — open`

### Door 4 — The Archive (OPEN — members only)
- Tag: `open now`
- Motif: `✧`
- Name: `The Archive`
- Sub: `Members only`
- Link: `celestial-archive.html`
- Status hover: `the celestial archive — open`

### Door 5 — The Garden (GHOST — forming)
- Motif: `🌿`
- Name: `The Garden`
- Tag: `forming`
- No link
- Status hover: `the garden — not yet ready`

---

## MOON PHASE INDICATOR — Add above room grid

Add a subtle phase indicator between the "rooms of the house" label and the grid:

```
🌕 Full Moon · Pink Moon · April 2026
```

Style: small, centered, bordered box with amber-mute colours. Use the same font-display at small size with wide letter-spacing.

---

## ORACLE SECTION — Replace with Tarot Pull

### Current Oracle heading copy:
```
Now open
The Oracle
Three questions. One reading.
Written for you alone and never spoken again.
The house will tell you what scent lives on your skin.
[Receive your reading]
```

### New Tarot heading copy:
```
Now open
The Oracle
Three cards. One reading.
Drawn for you alone and never repeated.
The house will tell you what this cycle holds.
[Draw your cards]
```

### Tarot Mechanic — Three-Card Pull
The tarot replaces the scent quiz. Same overlay mechanic, different content.

**Flow:**
1. User clicks "Draw your cards"
2. Oracle overlay opens
3. Three cards are drawn from an array with a flip animation
4. Each card shows: card name, position (Past / Present / Future), and a 2-3 sentence interpretation
5. Below the reading: "This cycle's cards live deeper in the Archive." → link to celestial-archive.html
6. Below that: "Join the house to receive the full monthly reading." → Ghost signup link

**Card Array (sample — 22 Major Arcana):**

```javascript
const TAROT = [
  { name: "The Fool", meaning: "The beginning before the beginning. Something in you is ready to leap without knowing where the ground is. That's not recklessness — that's trust wearing running shoes." },
  { name: "The Magician", meaning: "Everything you need is already on the table. Stop looking for permission and start using what's in your hands. The magic isn't in the wand — it's in the decision to pick it up." },
  { name: "The High Priestess", meaning: "She knows and she isn't telling. Not yet. The information you need is arriving through your body, not your brain. Stop thinking. Start listening." },
  { name: "The Empress", meaning: "Abundance that doesn't apologise. She's not asking if she deserves the garden — she's already eating from it. Feed yourself first. The harvest follows." },
  { name: "The Emperor", meaning: "Structure isn't the enemy of freedom — it's the container that makes freedom possible. What needs a boundary this cycle? Name it. Hold it." },
  { name: "The Hierophant", meaning: "Someone else's wisdom is useful right now, but only as a starting point. Take the lesson. Leave the dogma. Your own truth is the one that stays." },
  { name: "The Lovers", meaning: "Not romance — alignment. The moment two things that were separate recognise they belong together. A choice is coming. Make it with your whole chest." },
  { name: "The Chariot", meaning: "Forward motion held by opposing forces. You're not driving — you're balancing. The tension isn't a problem. The tension is the engine." },
  { name: "Strength", meaning: "Not the roar. The hand on the lion's mouth. Strength this cycle looks like staying when everything in you wants to bolt. Gentle pressure. Infinite patience." },
  { name: "The Hermit", meaning: "The lantern is for you, not for them. Step away. Not forever — just long enough to hear your own voice without the echo of everyone else's opinion." },
  { name: "Wheel of Fortune", meaning: "It turns. It always turns. If you're down, this is the uptick. If you're up, hold it loosely. The only constant is the rotation. Ride it." },
  { name: "Justice", meaning: "The scales don't lie and they don't negotiate. Something needs to be made right this cycle. You already know what it is. Stop pretending you don't." },
  { name: "The Hanged Man", meaning: "Suspension. Not stuck — suspended. The world looks different upside down and that's the point. Stop struggling. The surrender is the lesson." },
  { name: "Death", meaning: "Not the ending — the composting. Something is finished and the grief is real and the space it leaves is where the next thing grows. Let the dead thing be dead." },
  { name: "Temperance", meaning: "The pour between two cups. Not moderation — alchemy. Two things that don't belong together creating something neither could alone. Patience with the process." },
  { name: "The Devil", meaning: "The chain is loose. You could leave any time. The question isn't whether you're trapped — it's what you're getting from staying. Be honest about that." },
  { name: "The Tower", meaning: "The structure falls because it was built on something that wasn't true. This feels like destruction. It's actually architecture. What gets rebuilt from here is real." },
  { name: "The Star", meaning: "After the tower, the sky. Naked and unhurried and pouring yourself out because you finally can. Hope isn't naive — hope is what survives the collapse." },
  { name: "The Moon", meaning: "Not everything is as it appears this cycle. The moon lights the path but casts shadows too. Trust your instincts over your eyes. The dog knows before you do." },
  { name: "The Sun", meaning: "Warmth without condition. The simplest card and the hardest to receive. You are allowed to feel good without earning it first. Just — let the sun land." },
  { name: "Judgement", meaning: "The call from inside the ground. Something buried is asking to be resurrected — a dream, a version of yourself, a truth you put away because the timing wasn't right. The timing is right." },
  { name: "The World", meaning: "Completion. Not perfection — completion. The cycle closes. You've been here before but you're not the same person who started. Exhale. Then begin again." }
];
```

**Position meanings:**
- Past: "What shaped this moment"
- Present: "Where you stand now"
- Future: "What this cycle is asking of you"

**After the reading, show:**
```
The Oracle has spoken.

This cycle's cards live deeper in the Archive.
[Explore the Archive] → celestial-archive.html

Join the house to receive the full monthly reading.
[Join the house] → Ghost signup link
```

---

## REMEMBER ME SECTION — Replace with Ghost CTA

### Current copy:
```
The house remembers
New rooms open without warning.
Leave your email so the house can find you.
We'll only write when a new door opens. No spam. Ever.
[email input] [Remember me]
```

### New copy:
```
The house sends letters
Every time the moon shifts, a letter arrives.
Recipes, rituals, playlists, and a prompt from the Sanctum.
Free to join. The deeper rooms are $5/month for those who stay.
[Join the house] → https://maisoncache.ghost.io/#/portal/signup
```

---

## SANCTUM OVERLAY — Update email capture

### Current:
```
The Sanctum is being prepared.
Leave your email. When it opens, you enter first.
[email input] [Hold my place]
```

### New:
```
The Sanctum is being prepared.
Join the house. When it opens, you enter first.
[Hold my place] → https://maisoncache.ghost.io/#/portal/signup
```

Keep: The wolf note display, the "Enter the Sanctum" link to sanctum.html, and the "Close the door quietly" button.

---

## PRIVACY TEXT — Update for Ghost

### Replace:
- "through the 'Remember me' feature or The Sanctum" → "through our newsletter"
- "We use your email only to notify you when new rooms open" → "We send you letters when the moon shifts. Recipes, rituals, playlists, prompts."
- "Your email is stored securely in our private database" → "Your email is stored securely through Ghost, our newsletter platform. Payments are handled by Stripe."
- Add: "You can unsubscribe any time through the link in every email."

---

## JAVASCRIPT CLEANUP

### Remove:
- `const WEBHOOK_URL = '...'` — delete the entire line
- `function submitEmail()` — delete the entire function
- `function submitSanctumEmail()` — delete the entire function
- In `loadSanctumWolfNote()` — remove the lines that show/hide sanctum-form and sanctum-confirm

### Keep:
- All Easter egg functions (console message, typed "maison" word, 3am door)
- `sanctumClick()` function
- `setStatus()` function
- Ember generation
- Reveal observer
- House status whispers
- Oracle overlay open/close functions (repurposed for tarot)

### Add:
- Tarot card draw logic (shuffles array, picks 3, renders with flip animation)
- Moon phase indicator (can be static for now: "🌕 Full Moon · Pink Moon · April 2026")
