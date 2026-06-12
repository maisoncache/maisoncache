/* ── Maison Caché · the moon ──────────────────────────────────────────────
   Single source of truth for the current moon phase.
   Every "current sky" display on the site reads from here:
     · .moon-strip            (top-right strip on inner rooms)
     · #house-status-phase    (status bar, bottom)
     · #moon-phase-indicator  (the Hearth's phase card)
   Do NOT hardcode moon phases or dates in the pages — include this file.
   Phase names match automation/html-builders.js tags.                    */
(function () {
  var SYNODIC = 29.53058867;                    // days per lunation
  var EPOCH = Date.UTC(2000, 0, 6, 18, 14);     // a known new moon
  var PHASES = [
    ['🌑', 'New Moon'],
    ['🌒', 'Waxing Crescent'],
    ['🌓', 'First Quarter'],
    ['🌔', 'Waxing Gibbous'],
    ['🌕', 'Full Moon'],
    ['🌖', 'Waning Gibbous'],
    ['🌗', 'Last Quarter'],
    ['🌘', 'Waning Crescent']
  ];

  var age = ((Date.now() - EPOCH) / 86400000) % SYNODIC;
  if (age < 0) age += SYNODIC;
  var idx = Math.floor(((age + SYNODIC / 16) / SYNODIC) * 8) % 8;

  var moon = {
    emoji: PHASES[idx][0],
    name: PHASES[idx][1],
    age: age
  };
  window.MC_MOON = moon;

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  function paint() {
    var now = new Date();

    var strips = document.querySelectorAll('.moon-strip');
    for (var i = 0; i < strips.length; i++) {
      strips[i].textContent = moon.emoji + ' ' + moon.name + ' · ' +
        MONTHS[now.getMonth()] + ' ' + now.getFullYear();
    }

    var statusPhase = document.getElementById('house-status-phase');
    if (statusPhase) {
      statusPhase.textContent = moon.emoji + ' ' + moon.name.toLowerCase();
    }

    var indicator = document.getElementById('moon-phase-indicator');
    if (indicator) {
      var icon = indicator.querySelector('.moon-phase-icon');
      var text = indicator.querySelector('.moon-phase-text');
      var date = indicator.querySelector('.moon-phase-date');
      if (icon) icon.textContent = moon.emoji;
      if (text) text.textContent = moon.name;
      if (date) date.textContent = MONTHS[now.getMonth()] + ' ' +
        now.getDate() + ', ' + now.getFullYear();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', paint);
  } else {
    paint();
  }
})();
