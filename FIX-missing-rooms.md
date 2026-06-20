# FIX — two rooms went missing from the repo

**What's wrong:** `perfume-atelier.html` and `hearth.html` are **not in the repo** right now
(they return 404 on the live site *and* on the main branch). Their doors on the homepage point to
the right place — there's just no file there. The Library, Archive, and Sanctum are all fine.

(This almost certainly happened during a recent upload — those two just didn't make it in.
Nothing you did wrong; files sometimes get dropped from a drag-and-drop commit.)

## The fix — re-upload these (60 seconds)
1. github.com/maisoncache/maisoncache → **Add file → Upload files**.
2. Drag in **`perfume-atelier.html`** and **`hearth.html`** (to the repo root).
3. Open the **`js`** folder first, then **Add file → Upload** **`cat.js`** into it
   (these two pages call `js/cat.js` for the roaming cat — if it's already there, uploading again is harmless).
4. Commit (e.g. *"Restore Perfume + Hearth pages"*).
5. Wait ~1 min, hard-refresh the homepage, click the Perfume and Hearth doors — both should open.

These are the current, correct versions: tier reads **The Grimoire — $7**, and the roaming cat is wired in.

> Note: the Hearth's *content* still has the season-label bug we spotted (it says "Autumn" when it's
> winter). This upload just gets the page back online — we'll replace the Hearth properly in Stage 4
> with "tonight's warmth," which fixes the season for good.
