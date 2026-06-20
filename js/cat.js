/* Maison Caché — the roaming familiar.
   One cat. His home is the Library; he wanders the rest of the house.
   Drop-in: set window.MC_CAT = 'atelier'|'hearth'|'archive'|'sanctum' BEFORE this script. */
(function () {
  var page = (window.MC_CAT || 'house');

  var CFG = {
    atelier: { accent: '#d6b25e', roam: true,
      murmurs: ['the librarian, off-duty', 'he sniffs the air', 'something amber'],
      line: function () { return 'he noses toward a bottle, then looks back at you.'; } },
    hearth:  { accent: '#e08a5a', roam: true,
      murmurs: ['have you eaten?', 'warm here', 'he found the fire'],
      line: function () { return 'he curls in tighter. stay a while.'; } },
    archive: { accent: '#b89ed6', roam: true,
      murmurs: ['he watches the stars', 'still', 'he counts them'],
      line: function () { return 'he will not tell you which star is which.'; } },
    sanctum: { accent: '#cf8a98', roam: false,
      murmurs: ['…'],
      line: function () { return 'he stays at the threshold. he will not follow you in.'; } },
    house:   { accent: '#d6b25e', roam: true,
      murmurs: ['…', 'he saw you', 'still here', 'mrrp'],
      line: function () { return 'the cat slips away.'; } }
  };
  var cfg = CFG[page] || CFG.house;
  var roam = cfg.roam !== false;

  // styles
  var css =
    '.mc-cat{position:fixed;z-index:70;text-align:center;cursor:crosshair;opacity:0;' +
    'transition:opacity 1.1s ease;pointer-events:auto;font-family:Caveat,"Cormorant Garamond",cursive}' +
    '.mc-cat.here{opacity:1}' +
    '.mc-eyes{font-size:1.2rem;letter-spacing:.28rem;color:' + cfg.accent + ';' +
    'filter:drop-shadow(0 0 5px ' + cfg.accent + ');transition:all .25s ease;user-select:none}' +
    '.mc-cat.near .mc-eyes{letter-spacing:.34rem;filter:drop-shadow(0 0 11px ' + cfg.accent + ')}' +
    '.mc-murmur{font-style:italic;color:' + cfg.accent + ';font-size:.82rem;margin-top:.25rem;' +
    'opacity:0;transition:opacity .5s ease;white-space:nowrap}' +
    '.mc-cat.near .mc-murmur{opacity:.72}' +
    '@media (prefers-reduced-motion:reduce){.mc-cat{transition:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // element
  var cat = document.createElement('div'); cat.className = 'mc-cat';
  cat.innerHTML = '<div class="mc-eyes">• •</div><div class="mc-murmur">…</div>';
  document.body.appendChild(cat);
  var eyes = cat.querySelector('.mc-eyes'), murmur = cat.querySelector('.mc-murmur');

  function blink(d) { eyes.textContent = '– –'; setTimeout(function () { eyes.textContent = '• •'; }, d || 170); }
  setInterval(function () { if (Math.random() < 0.5) { blink(); if (Math.random() < 0.3) setTimeout(blink, 330); } }, 2600);

  function place() {
    if (!roam) {
      cat.style.left = '50%'; cat.style.top = 'auto'; cat.style.bottom = '2.4rem';
      cat.style.transform = 'translateX(-50%)';
      murmur.textContent = cfg.murmurs[0]; cat.classList.add('here'); return;
    }
    var x = Math.round(6 + Math.random() * 80);
    var y = Math.round(16 + Math.random() * 60);
    cat.classList.remove('here');
    setTimeout(function () {
      cat.style.left = x + 'vw'; cat.style.top = y + 'vh';
      murmur.textContent = cfg.murmurs[Math.floor(Math.random() * cfg.murmurs.length)];
      cat.classList.add('here');
    }, 650);
  }
  place(); if (roam) setInterval(place, 15000);

  // candle / cursor proximity — the eyes wake when your light is near
  window.addEventListener('mousemove', function (e) {
    var r = cat.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var d = Math.hypot(e.clientX - cx, e.clientY - cy);
    if (d < 170) { cat.classList.add('near'); if (d < 150 && Math.random() < 0.012) blink(); }
    else cat.classList.remove('near');
  }, { passive: true });

  function setHouse(t) { var m = document.getElementById('house-status-msg'); if (m) m.textContent = 'house: ' + t; }
  cat.addEventListener('click', function () {
    blink(1100); murmur.textContent = cfg.line(); cat.classList.add('near'); setHouse('the cat');
    if (roam) setTimeout(place, 2400);
  });
})();
