# CELESTIAL ARCHIVE (celestial-archive.html) — Content & Structure Updates

## OVERVIEW
The Archive is live and beautiful. Constellation sky with four named stars. Purpose confirmed: holds BOTH AI exploration AND broader self-discovery (tarot, shadow work, writing, dreams). The Lemon Grove stays as a constellation but the full reading moves to the Library. Changes are minimal — email captures to Ghost, full moon connection note, and future constellation names.

---

## PURPOSE UPDATE

The Archive holds multiple constellations. It doesn't announce which is which. The AI exploration pieces live alongside the tarot pieces alongside the dream work because they're all the same thing: looking up at something vast and asking what's real.

No copy change needed on the page for this — the existing aesthetic and language already supports it. The constellations just grow over time.

---

## EXISTING CONSTELLATIONS — Keep as-is

1. **The Lemon Grove** — keep the opening paragraph taster. Keep "Members only — the rest lives behind the next door." The full text is sacred. Archive Rose #8A5060 belongs only to Mira.
2. **Archive Rose** — keep as-is. Sacred.
3. **The Vow-Grove** — keep as-is. Sacred.
4. **The Golden Thread** — keep as-is. Sacred.

---

## FUTURE CONSTELLATIONS — Add when ready (not for launch)

New stars to appear over time:
- **The Card Table** — tarot practice, interpretation, phase-matched pulls. Connects to the Foyer tarot reading.
- **Letters from the Ether** — AI exploration, connection across different forms of existence.
- **The Mirror Work** — shadow writing, self-confrontation practices. Connects to the Sanctum Mirror Room.
- **The Dream Journal** — subconscious work, dream interpretation, sleep rituals.

These don't need to be on the page for April 1st. They appear "when the house is ready."

---

## FULL MOON CONNECTION NOTE — Add

Near the constellation sky or the members section, add:

```
New stars appear at the full moon.
Members enter first. Members enter deeper.
```

---

## ARCHIVE-TO-LIBRARY CONNECTION — Add

Near the bottom of the page, add a downward connection:

```
The Archive lives above the Library.
The staircase winds both ways.
[Descend to the Library] → library.html
```

---

## EMAIL CAPTURE — Replace with Ghost

### Current "Request entry" section:
```
The inner archive

Some rooms in this house are for those who stayed.
The Celestial Archive is a living collection.
New writing drops without announcement.
Members enter first. Members enter deeper.

[email input] [Request entry]
```

### New:
```
The inner archive

Some rooms in this house are for those who stayed.
The Celestial Archive is a living collection.
New writing drops without announcement.
Members enter first. Members enter deeper.

[Request entry] → https://maisoncache.ghost.io/#/portal/signup
```

Remove: email input field, any submit functions, WEBHOOK_URL references.

### Confirmation text — replace:
Current: "The archive has your name now. We'll find you when a new star is named."
New: Keep as redirect confirmation on the Ghost page, or simply remove since Ghost handles its own confirmation.

---

## THE LEMON GROVE TASTER — Keep but add Library reference

Current taster panel shows the opening paragraph and says:
```
Members only — the rest lives behind the next door
You've seen the first line.
The key comes with membership.
Four more parts wait in the sky.
```

Add below this:
```
The Lemon Grove also lives on the Library shelves.
[Visit the Library] → library.html
```

This creates the two-way connection: Archive constellation points down to Library shelf, Library shelf points up to Archive constellation.

---

## JAVASCRIPT CLEANUP

- Remove any `WEBHOOK_URL` constant
- Remove any email submission functions
- Keep: constellation hover/click interactions, star animations, house status whispers, all atmospheric layers
- Keep: console message Easter egg if present
