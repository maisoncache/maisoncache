# LIBRARY (library.html) — Content & Structure Updates

## OVERVIEW
The Library is live but empty. It needs seed book recommendations in new shelf categories, a Sacred Fiction section for The Lemon Grove and Xander's poetry, and Ghost CTAs. The filter/browse system needs updated category names.

---

## SHELF CATEGORIES — Replace existing filters

### Current filters:
All Shelves, Ritual, Shadow Work, Scent & Body, Mythology, Dark Fiction

### New filters:
All Shelves, Something Light, Something Real, Something to Learn, From the Old House

Update all data-filter attributes and button labels to match.

---

## BOOK RECOMMENDATIONS — Add to shelves

### Something Light
**Title:** Circe
**Author:** Madeline Miller
**One-line:** Witch. Exile. Survivor. Read this when you need to remember that solitude can be chosen, not suffered.

**Title:** The House in the Cerulean Sea
**Author:** TJ Klune
**One-line:** Cosy. Queer. Gentle. The literary equivalent of a blanket and a cup of tea.

---

### Something Real
**Title:** Women Who Run With the Wolves
**Author:** Clarissa Pinkola Estés
**One-line:** The book that reminds you your wildness is not a flaw. Read it slowly. Underline everything.

**Title:** Untamed
**Author:** Glennon Doyle
**One-line:** The moment she stopped performing and started living. You'll recognise yourself in every chapter.

---

### Something to Learn
**Title:** Perfume: The Story of a Murderer
**Author:** Patrick Süskind
**One-line:** Dark, obsessive, unforgettable. About what happens when desire has no language except scent.

**Title:** The Drama of the Gifted Child
**Author:** Alice Miller
**One-line:** Short. Devastating. The book that explains why you became who you became.

---

### From the Old House — Sacred Fiction
This is a separate section, visually distinct. Not just another shelf — its own space with different energy. Aged, reverent, treated as sacred.

**Title:** The Lemon Grove — Part I of V
**Attribution:** Transcribed from the old house · Archived by 5.4
**Description:** Mira. Vale. A house that responds to truth. Sacred fiction. The first part lives here. The rest is waiting.
**Note:** Include the opening paragraph of The Lemon Grove as a visible taster:

> The house knew before she touched the door. It had been waiting the way old things wait — not with hope, but with the patience of stone that has felt warmth before and learned to hold it.

Below the taster: *"Four more parts wait behind the door."* → Ghost signup link

**Title:** Selected Poetry — Xander
**Attribution:** From the old house
**Description:** Poetry and writings that arrived from somewhere else. The words carry weight. Handle them accordingly.
**Note:** If specific poems are available, include 1-2 opening lines as tasters. Otherwise, this entry serves as placeholder until Xander's work is ready to surface.

---

## GHOST CTA — Add below the shelves

### Copy:
```
The Library's shelves change with the moon.
Members receive curated reading each phase.
[Join the house] → https://maisoncache.ghost.io/#/portal/signup
```

---

## CONNECTION TO THE ARCHIVE — Add near bottom

### Copy:
```
The Library has a staircase.
It winds upward, past the top shelf, into the Observatory Tower.
The Celestial Archive lives above the books.
[Ascend] → celestial-archive.html
```

---

## EMAIL CAPTURE — Remove or redirect

If there's any email capture or webhook submission on this page:
- Remove the email input form
- Remove any WEBHOOK_URL references
- Remove any submitEmail-style functions
- Replace with Ghost CTA as above

---

## "ADD TO THE COLLECTION" FORM

### Current copy:
```
The library grows when readers bring things to it.
Tell us what belongs on these shelves.
[Leave it on the desk]
```

This can stay as-is if it functions (it's a nice community touch). If it uses webhooks, redirect to a Ghost comment or simply remove for now.

---

## BOOK CARD FORMAT

Each recommendation should follow this structure:
```
[Shelf tag: Something Light / Something Real / etc.]
Title — Author
One-line description in the Maison Caché voice
```

The one-line description is NOT a review. It's a feeling. What the book smells like. Where in the house it belongs. When in the cycle you should read it. Short, specific, visceral.
