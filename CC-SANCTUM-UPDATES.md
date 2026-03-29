# SANCTUM (sanctum.html) — Content & Structure Updates

## OVERVIEW
The Sanctum is the basement. 18+ only. Currently lists 9 rooms with only The Ritual Space marked open. Changes: reduce to 8 rooms (Scent Rituals removed), give The Ritual Space actual content, link The Codex to codex.html, replace email captures with Ghost links.

---

## ROOM GRID — Reduce from 9 to 8

### Remove:
**◈ Scent Rituals** — this room has moved to the Perfume Atelier as the intimacy scent subcategory.

### Final 8 rooms:

1. 🕯 **The Ritual Space** — `open`
2. 🗝 **The Confessional** — `preparing`
3. 🖋 **Written Filth with Teeth** — `preparing`
4. 🪞 **The Mirror Room** — `preparing`
5. ◎ **Audio Holds** — `preparing`
6. 📜 **The Codex** — `open` (link to codex.html)
7. ✦ **Story Drops** — `preparing`
8. ☽ **The Aftercare Room** — `preparing`

### The Codex link:
When The Codex room card is clicked, it should link to `codex.html`. Mark it as `open` instead of `preparing`.

---

## THE RITUAL SPACE — Add content

Currently the Ritual Space is marked "open" but has no actual content. Add a section that appears when the Ritual Space is clicked or expanded.

### Ritual Space content:

**Phase tag:**
```
Full Moon · Illuminate
```

**Intention line (Almendra italic or equivalent italic):**
```
Before you begin, clear one surface. Light one candle. Stand still for ten seconds.
```

**The prompt (visible to all — this is the free taster):**
```
Under the full moon, nothing hides.
What have you been pretending not to see?
Name it. Don't explain it. Just let it stand in the light.
```

**Below the prompt (the paid tease):**
```
The full guided ritual for this phase — including setup,
journaling prompts, and closing — lives in The Inner House.
[Join the house] → https://maisoncache.ghost.io/#/portal/signup
```

**Phase note:**
```
The Ritual Space changes with the moon.
Come back when the light changes.
```

---

## ROOM DESCRIPTIONS — Updated copy for each room card

### 🕯 The Ritual Space
**Current sub-text:** (none or generic)
**New sub-text:** Moon phase prompts. The entry room.

### 🗝 The Confessional
**Sub-text:** Say the thing. Leave it here.

### 🖋 Written Filth with Teeth
**Sub-text:** 18+ fiction. Reader submissions. Curated.

### 🪞 The Mirror Room
**Sub-text:** Body. Self-perception. The erotic self.

### ◎ Audio Holds
**Sub-text:** Breathwork. Spoken word. Close your eyes.

### 📜 The Codex
**Sub-text:** Scene generator. Browse by mood.

### ✦ Story Drops
**Sub-text:** The house's own dark fiction.

### ☽ The Aftercare Room
**Sub-text:** Soft landing. Always open.

---

## EMAIL CAPTURE — Replace with Ghost

### Current:
```
The rooms open when they're ready.
Leave your email and you enter first.
No announcements. No spam. Just a knock when the door opens.
[email input] [Hold my place]
```

### New:
```
The rooms open when they're ready.
Join the house and you enter first.
No announcements. No spam. Just a knock when the door opens.
[Hold my place] → https://maisoncache.ghost.io/#/portal/signup
```

Remove: email input field, submitEmail/submitSanctumEmail functions, WEBHOOK_URL references.

---

## JAVASCRIPT CLEANUP

- Remove any `WEBHOOK_URL` constant
- Remove any email submission functions
- Remove any email input field references
- Keep: age gate logic, room grid interactions, house status whispers, atmospheric layers
