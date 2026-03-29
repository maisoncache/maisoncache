# THE HEARTH (hearth.html) — Content & Structure Updates

## OVERVIEW
The Hearth page was built this session. A new version exists (hearth.html in outputs) but may need to replace the older hearth_html.txt that was uploaded from GitHub. The new version already has: recipe card, hearthcraft practice, housekeeping ritual, recipe archive, lunar cycle grid, and the Garden connection.

Changes needed: remove Sommelier sub-room, add Grimoire connection, add Ghost CTAs, add drink pairing to the recipe card.

---

## USE THE NEW FILE
The file `/mnt/user-data/outputs/hearth.html` built this session is the correct version. The uploaded `hearth_html.txt` (542 lines) is an older, shorter version. **Replace entirely with the new build.**

---

## SUB-ROOMS SECTION — Updated

### Remove:
- The Sommelier sub-room teaser (folded into recipe cards as drink pairing)
- The Atelier sub-room teaser (now a standalone room accessed from the Foyer, not through the Hearth)

### Keep/Add:
- 🌿 **The Garden** — "Grow what you cook. Seasonal planting & outside rituals." — `forming`
- 📜 **The Grimoire** — "The craft knowledge. Herb lore. Kitchen spells. The witchy why." — `forming`

The Hearth connects to two rooms: the Garden (outdoors) and the Grimoire (the why behind the what).

---

## GHOST CTA — Already present but confirm copy

Below the connected rooms section:

```
The full Hearth cycle — all eight recipes with ingredients and method,
hearthcraft practices, and expanded rituals — lives in The Inner House.
[Join the house] → https://maisoncache.ghost.io/#/portal/signup
$5/month · The Inner House
```

---

## RECIPE CARD — Add drink pairing

The current Full Moon recipe card needs a drink pairing line added (the ex-Sommelier content).

After the recipe description, before the tier tag:

```
Drink pairing: A full-bodied red — Shiraz or Grenache.
Or: Spiced chai with honey if the night calls for warmth without wine.
```

---

## RECIPE ARCHIVE — Add "members" links

The "members" tags on paid recipes should link to Ghost signup:
```
<a href="https://maisoncache.ghost.io/#/portal/signup">members</a>
```

(This is already done in the new build but verify.)

---

## RECIPE FORMAT NOTE

The Hearth page shows the FREE version of recipes — name, intention line, atmospheric description. The full recipe with ingredients, quantities, and method lives in the Ghost paid newsletter.

For the Full Moon Autumn Feast, the site shows:
```
Slow-roasted lamb shoulder with rosemary, garlic, and red wine.
Root vegetables caramelised until their edges go dark and sweet.
Crusty bread torn by hand. The meal you make when the house is full
and the candles are lit.
```

The Ghost paid version adds:
- Serves: 4-6
- Prep: 20 mins / Cook: 3.5 hours
- Full ingredients list with quantities
- Numbered method steps in the MC voice
- Drink pairing
- "The leftover" — what this becomes tomorrow
- Expanded hearthcraft practice
- Expanded housekeeping notes

---

## MOON PHASE INDICATOR — Already present

The Hearth already has a moon phase indicator showing the current phase. Verify it reads:
```
🌕 Full Moon · Pink Moon
April 1, 2026
```

---

## COLOUR PALETTE — Hearth-specific

The Hearth uses its own warm palette (NOT the Foyer's plum-dark):
- Ground: `#100A06` (amber-black)
- Ember: `#C4622D`
- Flame: `#D4882A`
- Beeswax: `#C8A040`
- Linen: `#EDD8B8`
- Loam: `#8B6850`
- Bark: `#4A2E18`

This is already correct in the new build.
