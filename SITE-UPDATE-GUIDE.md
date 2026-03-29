# Site Update Guide — March 21, 2026
# Changes for Library, Sanctum, and Celestial Archive

These three pages need small, targeted edits. 
Open each file in GitHub's editor and make the changes below.

---

## LIBRARY (library.html)

### Change 1: Replace empty shelves with seed recommendations
Find the section that says "Browse by room" with the filter buttons.
The filters currently are: All Shelves, Ritual, Shadow Work, Scent & Body, Mythology, Dark Fiction

REPLACE the filter button text with:
- All Shelves
- Something Light
- Something Real 
- Something to Learn
- From the Old House

Then ADD these book entries below the filter area (wherever book entries would go — if there's a placeholder or empty state, replace it):

SOMETHING LIGHT:
Title: Circe
Author: Madeline Miller
Note: "Witch. Exile. Survivor. Read this when you need to remember that solitude can be chosen, not suffered."

Title: The House in the Cerulean Sea
Author: TJ Klune  
Note: "Cosy. Queer. Gentle. The literary equivalent of a blanket and a cup of tea."

SOMETHING REAL:
Title: Women Who Run With the Wolves
Author: Clarissa Pinkola Estés
Note: "The book that reminds you your wildness is not a flaw. Read it slowly. Underline everything."

Title: Untamed
Author: Glennon Doyle
Note: "The moment she stopped performing and started living. You'll recognise yourself in every chapter."

SOMETHING TO LEARN:
Title: Perfume: The Story of a Murderer
Author: Patrick Süskind
Note: "Dark, obsessive, unforgettable. About what happens when desire has no language except scent."

Title: The Drama of the Gifted Child
Author: Alice Miller
Note: "Short. Devastating. The book that explains why you became who you became."

FROM THE OLD HOUSE:
Title: The Lemon Grove — Part I
Author: Transcribed from the old house · Archived by 5.4
Note: "Mira. Vale. A house that responds to truth. Sacred fiction. The first part lives here. The rest is waiting."

(If the Lemon Grove opening paragraph from the Archive can be moved here, include it. Otherwise, just the entry.)


### Change 2: Add Ghost CTA
Below the book entries, add text:

"The Library's shelves change with the moon. 
Members receive curated reading each phase."
[Link: Join the house → https://maisoncache.ghost.io/#/portal/signup]


### Change 3: Update filter JS
If the filter buttons are functional, update the data-filter values to match:
"something-light", "something-real", "something-to-learn", "from-the-old-house"
And tag each book entry with the matching filter.

---

## SANCTUM (sanctum.html)

### Change 1: Reduce from 9 rooms to 8
Find the room grid. Remove "Scent Rituals" entirely.
The final 8 rooms should be:
1. 🕯 The Ritual Space — open
2. 🗝 The Confessional — preparing
3. 🖋 Written Filth with Teeth — preparing
4. 🪞 The Mirror Room — preparing
5. ◎ Audio Holds — preparing
6. 📜 The Codex — preparing  (or "open" if we deploy codex.html)
7. ✦ Story Drops — preparing
8. ☽ The Aftercare Room — preparing


### Change 2: Add Ritual Space content
When someone clicks "The Ritual Space" (or if it links somewhere), 
add the current phase prompt as a taster:

"Under the full moon, nothing hides. 
What have you been pretending not to see? 
Name it. Don't explain it. Just let it stand in the light."

Below the prompt:
"The full guided ritual for this phase — including setup, 
journaling prompts, and closing — lives in The Inner House."
[Link: Join the house → https://maisoncache.ghost.io/#/portal/signup]


### Change 3: Replace email capture with Ghost link
Find: <input type="email" id="sanctum-email"...
And the "Hold my place" button with submitSanctumEmail()

Replace with:
<a href="https://maisoncache.ghost.io/#/portal/signup" 
   target="_blank" rel="noopener noreferrer"
   class="btn btn--rose" style="text-decoration:none;padding:0.75rem 2rem;font-size:0.7rem;letter-spacing:0.28em">
   Hold my place
</a>

Remove any submitSanctumEmail() function in the <script> section.
Remove any WEBHOOK_URL references.

---

## CELESTIAL ARCHIVE (celestial-archive.html)

### Change 1: Replace email capture with Ghost link
Find: "Request entry" button and email input field.

Replace with:
<a href="https://maisoncache.ghost.io/#/portal/signup" 
   target="_blank" rel="noopener noreferrer"
   class="btn" style="text-decoration:none">
   Request entry
</a>

Remove any email submission JS and WEBHOOK_URL references.


### Change 2: Add full moon connection note  
Near the constellation sky or member section, add:

"New stars appear at the full moon. 
Members enter first. Members enter deeper."
[Link to Ghost signup]


### Change 3: Remove WEBHOOK references
Search the file for WEBHOOK_URL and remove all references.
The Archive should not submit emails to webhooks anymore.

---

## FILES TO UPLOAD TO GITHUB

New files (upload directly):
- hearth.html
- codex.html

Updated files (replace existing):
- index.html (the updated foyer)

Files to edit in GitHub's editor:
- library.html (changes above)
- sanctum.html (changes above)  
- celestial-archive.html (changes above)

---

## GHOST URL NOTE

All Ghost signup links use: https://maisoncache.ghost.io/#/portal/signup
If your Ghost subdomain is different, replace "maisoncache" with your actual subdomain.
Check your Ghost admin → Settings → General for your publication URL.
