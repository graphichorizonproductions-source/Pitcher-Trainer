SCREENS.progress = () => {
  const N = LEVELS.length, stars = LEVELS.reduce((a, l) => a + P(l.id).stars, 0), passed = LEVELS.filter(l => P(l.id).passed).length;
  view.innerHTML = `<h2>${tr('progress')}</h2>
    <div class="grid"><div class="card"><div class="score" style="font-size:40px">${stars}/${N * 3}</div><p class="muted center">${tr('pStars')}</p></div>
    <div class="card"><div class="score" style="font-size:40px">${passed}/${N}</div><p class="muted center">${tr('pLevels')}</p></div></div>
    <div class="card"><b>${tr('pWarm')}:</b> ${S.warmDone}</div>` +
    SECTIONS.map(sec => `<p class="eyebrow" style="margin-top:16px">${tr('secWord', { n:sec.id })} · ${esc(L(sec.name))}</p>` + levelsOfSec(sec.id).map(l => { const p = P(l.id); return `<div class="lv ${p.passed ? 'passed' : ''}" style="cursor:default"><span class="num">${l.id}</span><span class="nm">${esc(L(l.name))}<small>${p.best ? tr('pBest') + ': ' + p.best + '% · ' + tr('pTries') + ': ' + (p.tries || 0) : '–'}</small></span>${starsHTML(p.stars)}</div>`; }).join('')).join('');
};
let resetArmed = false;
SCREENS.settings = () => {
  view.innerHTML = `<h2>${tr('settings')}</h2>
  <div class="card"><h3>${tr('sName')}</h3><input type="text" id="nm" value="${esc(S.name)}"></div>
  <div class="card"><h3>${tr('sLang')}</h3><div class="row"><button class="btn ${S.lang === 'en' ? 'primary' : ''}" data-lang="en">English</button><button class="btn ${S.lang === 'es' ? 'primary' : ''}" data-lang="es">Español</button></div></div>
  <div class="card"><h3>${tr('sVoice')}</h3>
    <button class="opt ${S.voice === 'low' ? 'on' : ''}" data-act="setvoice" data-v="low"><b>${tr('voiceLow')}</b><small>${tr('voiceLowSub')}</small></button>
    <button class="opt ${S.voice === 'high' ? 'on' : ''}" data-act="setvoice" data-v="high"><b>${tr('voiceHigh')}</b><small>${tr('voiceHighSub')}</small></button>
    <p class="muted">${tr('sStart')}: <b>${nnOct(S.root)}</b></p></div>
  <div class="card"><h3>${tr('sRead')}</h3><button class="opt ${S.voiceOn ? 'on' : ''}" data-act="voiceToggle"><b>${S.voiceOn ? tr('sOn') : tr('sOff')}</b></button>
    <p class="muted" style="margin-top:12px">${tr('sSpeed')}</p><input type="range" id="ratesel" min="0.8" max="1.2" step="0.05" value="${S.rate}">
    <div class="ends"><span>${tr('sSlow')}</span><span>${tr('sFast')}</span></div>
    <div class="row"><button class="btn" data-act="prevVoice">${ic('volume')} ${tr('sPreview')}</button></div>
    <p class="muted">${tr('sVoiceTip')}</p></div>
  <div class="card"><h3>${tr('sDemo')}</h3><button class="opt ${demo.on ? 'on' : ''}" data-act="demoToggle"><b>${demo.on ? tr('sOn') : tr('sOff')}</b></button></div>
  <button class="btn big" data-go="tour">${ic('gauge')} ${tr('sTour')}</button>
  <button class="btn ghost big" data-act="reset">${resetArmed ? tr('sConfirm') : tr('sReset')}</button>`;
};

/* ---------- events ---------- */
document.addEventListener('click', ev => {
  audio();
  const l = ev.target.closest('[data-lang]');
  if (l) { S.lang = l.dataset.lang; save(); stopSpeech(); render(); return; }
  const g = ev.target.closest('[data-go]');
  if (g && !g.disabled) { go(g.dataset.go, g.dataset.id ? { id:+g.dataset.id } : {}); return; }
  const a = ev.target.closest('[data-act]');
  if (!a || a.disabled) return;
  const d = a.dataset;
  switch (d.act) {
    case 'pickLang': S.lang = d.v; save(); go('onboard', { step:'name' }); break;
    case 'obName': { const n = $('#nm'); S.name = n ? n.value.trim() : ''; save(); go('onboard', { step:'voice' }); break; }
    case 'obVoice': S.voice = d.v === 'high' ? 'high' : 'low'; S.root = S.voice === 'low' ? 48 : 60; S.unsure = d.v === 'unsure'; save(); go('onboard', { step:'read' }); break;
    case 'obRead': S.voiceOn = d.v === 'yes'; S.onboardDone = true; save(); go('tour', { i:0 }); break;
    case 'tourGo': go('tour', { i:+d.i, dir:+d.dir }); break;
    case 'tourSay': say(L(TOUR[+d.i].t) + '. ' + L(TOUR[+d.i].d), true); break;
    case 'tourSkip': S.tourDone = true; save(); go('home'); break;
    case 'tourEnd': S.tourDone = true; save(); if (d.to === 'range') go('range', { phase:'intro' }); else go('intro', { id:1 }); break;
    case 'voiceToggle': S.voiceOn = !S.voiceOn; save(); if (!S.voiceOn) stopSpeech(); render(); break;
    case 'setvoice': S.voice = d.v; S.root = d.v === 'low' ? 48 : 60; S.range = null; save(); render(); break;
    case 'start': go('run', { id:+d.id, mode:d.mode }); break;
    case 'stop': go('intro', { id:+d.id }); break;
    case 'lesson': go('lesson', { id:+d.id, i:0 }); break;
    case 'lpage': go('lesson', { id:+d.id, i:+d.i }); break;
    case 'lfinish': { const p = P(+d.id); p.lessonDone = true; save(); go('run', { id:+d.id, mode:'practice' }); break; }
    case 'lsay': { const lv = LV(cur.args.id), pg = lv.lesson[cur.args.i || 0]; say(L(pg.t) + '. ' + L(pg.b), true); break; }
    case 'lplay': { const lv = LV(cur.args.id), pg = lv.lesson[cur.args.i || 0]; stopSpeech(); const my = ++run; playEvents(pg.play, my, (arr, on) => kbLight(arr, on)); break; }
    case 'readDesc': { const lv = LV(+d.id); say(L(lv.name) + '. ' + L(lv.desc), true); break; }
    case 'secsay': { const sc = SECTIONS.find(s => s.id === +d.id); say(L(sc.name) + '. ' + L(sc.desc), true); break; }
    case 'sayInstr': { const e = $('#itxt'); if (e) say(e.textContent, true); break; }
    case 'demoOn': demo.on = true; go(cur.name, cur.args); break;
    case 'demoToggle': demo.on = !demo.on; render(); break;
    case 'wrun': warmRun(+d.step); break;
    case 'wnext': go('warmup', { step:+d.step + 1 }); break;
    case 'rstart': go('range', { phase:'low' }); break;
    case 'tsay': { const t = THEORY[+d.i]; say(L(t.k) + '. ' + L(t.d), true); break; }
    case 'tplay': { stopSpeech(); const my = ++run; playEvents(THEORY[+d.i].demo, my, null); break; }
    case 'prevVoice': say(tr('sPreviewText'), true); break;
    case 'reset': if (resetArmed) { S.progress = {}; S.warmDone = 0; S.range = null; save(); resetArmed = false; go('home'); } else { resetArmed = true; render(); } break;
  }
});
document.addEventListener('input', ev => {
  if (ev.target.id === 'nm' && cur.name === 'settings') { S.name = ev.target.value; save(); }
});
document.addEventListener('change', ev => {
  if (ev.target.id === 'ratesel') { S.rate = +ev.target.value; save(); say(tr('sPreviewText'), true); }
});
document.addEventListener('keydown', ev => {
  if (ev.key === 'Enter' && ev.target.id === 'nm' && cur.name === 'onboard') { ev.preventDefault(); const b = $('[data-act=obName]'); if (b) b.click(); }
});

/* ---------- every phrase the app can speak (used to record the voice) ---------- */
const SPOKEN_TXT = ['listen', 'singNow', 'yourTurn', 'correct', 'notQuite', 'selectAll', 'coachMic', 'coachLow', 'coachHigh', 'coachSteady', 'coachHold', 'beat1', 'beat2', 'beat3', 'passedSay', 'failSay2', 'instrSing', 'instrEcho', 'instrMC', 'instrEar', 'instrTap', 'instrHarm', 'testIntro', 'tapOff', 'wDone', 'qName', 'qVoice', 'qRead', 'rLow', 'rHigh', 'rSaved', 'sPreviewText', 'wBreatheT', 'wBreatheB', 'wHumT', 'wHumB', 'wSirenT', 'wSirenB', 'wScaleT', 'wScaleB'];
function allSpeech() {
  const out = [], seen = new Set(), keep = S.lang;
  const add = (pack, text) => { const t = cleanSpeech(text); if (!t) return; const k = S.lang + '|' + t; if (seen.has(k)) return; seen.add(k); out.push({ lang:S.lang, pack:S.lang + '_' + pack, text:t, key:clipKey(S.lang, t) }); };
  for (const lang of ['en', 'es']) {
    S.lang = lang;
    SPOKEN_TXT.forEach(k => add('ui', tr(k)));
    add('ui', tr('rTitle') + '. ' + tr('rIntro'));
    ['wBreatheT', 'wHumT', 'wSirenT', 'wScaleT'].forEach(k => add('ui', tr(k) + '. ' + tr(k.slice(0, -1) + 'B')));
    TOUR.forEach(s => add('ui', L(s.t) + '. ' + L(s.d)));
    THEORY.forEach(g => add('ui', L(g.k) + '. ' + L(g.d)));
    SECTIONS.forEach(s => add('ui', L(s.name) + '. ' + L(s.desc)));
    for (let m = 0; m < 12; m++) add('ui', solfSay(m));
    LEVELS.forEach(lv => {
      const pk_ = 'L' + lv.id;
      add(pk_, L(lv.name) + '. ' + L(lv.desc));
      lv.lesson.forEach(pg => add(pk_, L(pg.t) + '. ' + L(pg.b)));
      lv.tiers.forEach(t => add(pk_, L(t.d)));
      const itemTxt = it => {
        if (it.k === 'mc') { add(pk_, L(it.q)); if (it.e) { const e = L(it.e); if (e.indexOf('{n}') >= 0) { const parts = e.split('{n}'); add(pk_, parts[0]); if (parts[1] && parts[1].replace(/[.\s]/g, '')) add(pk_, parts[1]); } else add(pk_, e); } }
        if (it.k === 'sing' && it.lab) add(pk_, L(it.lab));
      };
      lv.pq.forEach(itemTxt); lv.tq.forEach(itemTxt);
      for (let n = 0; n < 250; n++) { lv.tiers.forEach(t => itemTxt(t.g())); lv.testGen().forEach(itemTxt); }
    });
  }
  S.lang = keep;
  return out;
}

async function hearNothing() {}

/* ---------- start ---------- */
load();
go(S.onboardDone ? 'home' : 'onboard');
