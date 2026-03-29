# PERFUME ATELIER (perfume-atelier.html) — NEW PAGE

## OVERVIEW
The Perfume Atelier is a new standalone room. It houses the old Oracle scent reading mechanic as its entry point (moved from the Foyer), plus a deeper scent library below. The Oracle quiz code moves here intact — same three questions, same scent archetype results, same fragrance recommendations.

---

## PAGE STRUCTURE

### 1. Hero
- Room label: `open now`
- Room icon: `🌺` or `◈`
- Room name: `The Perfume Atelier`
- Tagline: `You don't wear perfume. You become it.`
- Body: `Three questions. One reading. The house will tell you what scent lives on your skin — and how to wear it like a spell.`
- CTA: `[Receive your scent reading]` → triggers the scent quiz overlay

### 2. The Scent Reading (Interactive)
This is the EXACT Oracle mechanic from the current Foyer — the three-question quiz that determines your scent archetype and gives fragrance recommendations. Move the entire Oracle JS (questions array, archetype logic, fragrance database, reading generation) into this page.

The reading overlay should look and feel exactly as it does now, just living in the Atelier instead of the Foyer.

After the reading result, add:
```
Your archetype is [The Hearth / The Garden / etc.].
That room is open.
[Visit The Hearth] → hearth.html (or whichever room matches)
```

### 3. The Scent Library (below the quiz)
A browsable section of scent profiles. This is future content — for launch, a placeholder section is fine.

**Section heading:**
```
The Scent Library
Browse by mood. Browse by season. Browse by ritual.
```

**Placeholder categories (forming):**
- By Mood: Grounding / Energising / Sensual / Comforting / Fierce
- By Season: Autumn / Winter / Spring / Summer
- By Ritual: Morning / Night / Before Surrender / After the Storm

**Phase-matched scent profile (the living content):**
```
🌕 Full Moon · Illuminate
Rose absolute + sandalwood + warm amber.
The full moon scent. Opulent. Unapologetic.
What it means to wear abundance on your skin.
```

Below phase scent:
```
The full scent ritual — layering instructions, product
recommendations at every price point, and intimacy notes —
lives in The Inner House.
[Join the house] → https://maisoncache.ghost.io/#/portal/signup
```

### 4. Intimacy Scent (subcategory — future content)
A section that acknowledges the deeper layer exists:

```
The Atelier has a back room.
Scent as foreplay. Fragrance as emotional trigger.
The perfume you put on before you let go.
This room opens for members.
```

### 5. Connections
```
The nose knows which room you need.

[The Hearth] → hearth.html — domestic scent. Candles, herbs, baking.
[The Garden] → (forming) — grow your own scent ingredients.
[The Sanctum] → sanctum.html — where scent meets surrender.
```

### 6. Ghost CTA
```
The full Atelier cycle — phase-matched scent profiles,
layering rituals, product recommendations, and intimacy notes —
lives in The Inner House.
[Join the house] → https://maisoncache.ghost.io/#/portal/signup
```

---

## COLOUR PALETTE

The Atelier should inherit from the Hearth palette but shift slightly warmer/deeper — the colour of aged amber resin and dried orange peel.

Suggested:
- Ground: `#180E06` (one shade deeper than the Hearth)
- Primary accents: Loam `#8B6850`, Ember `#C4622D`, Beeswax `#C8A040`
- Text: Linen `#EDD8B8`
- The Atelier's signature colour is **amber** — warmer and more golden than the Foyer's plum

OR use the brand card Foyer palette if a neutral room is preferred. The brand card for the Atelier described it as inheriting the Hearth's warmth.

---

## TECHNICAL NOTES

### Moving the Oracle code:
The entire Oracle mechanic (PROMPTS array, archetype scoring, ARCHETYPES object, fragrance database, reading generation, overlay rendering) needs to be lifted from the Foyer's index.html and placed into this page.

The Foyer's Oracle section gets replaced with a tarot mechanic (see CC-FOYER-UPDATES.md).

### File naming:
`perfume-atelier.html` — keep consistent with other room file naming.

### Navigation:
- Back link: `← The House` → `index.html`
- Sanctum trigger: `◉` bottom left (consistent across all pages)
- House status: `[ atelier : listening ]`

### Atmosphere:
- Grain, vignette, embers — consistent with other rooms
- Embers should be warmer/more amber than the Foyer's purple-tinged ones
- The room should smell like something through the screen — amber, dried orange, beeswax
