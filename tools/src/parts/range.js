/* range finder: guided four-step test (lowest, highest, sweet spot low edge, sweet spot high edge) */
const VT = {
  bass:{ n:b('Bass', 'Bajo'), d:b('Bass. The lowest male voice type. Your sweet spot sits low, so you sound rich and deep. Basses anchor the bottom of a harmony and give the whole team a foundation.', 'Bajo. El tipo de voz masculina más grave. Tu punto ideal está abajo, así que suenas profundo y lleno. Los bajos sostienen la base de la armonía y le dan cimiento a todo el equipo.') },
  baritone:{ n:b('Baritone', 'Barítono'), d:b('Baritone. The middle male voice type, and the most common one. Your sweet spot sits in the middle, so you can comfortably sing many melodies, or the harmony below them.', 'Barítono. El tipo de voz masculina intermedia, y el más común. Tu punto ideal está en el medio, así que puedes cantar con comodidad muchas melodías, o la armonía por debajo de ellas.') },
  tenor:{ n:b('Tenor', 'Tenor'), d:b('Tenor. The higher male voice type. Your sweet spot sits fairly high, so you sound bright and clear on melodies and on upper harmonies.', 'Tenor. El tipo de voz masculina más aguda. Tu punto ideal está bastante arriba, así que suenas brillante y claro en las melodías y en las armonías agudas.') },
  alto:{ n:b('Alto', 'Contralto'), d:b('Alto. The lower female voice type. Your sweet spot sits lower, so you sound warm and full, and you are great for harmony parts below the melody. Very low female voices are sometimes called contralto.', 'Contralto. El tipo de voz femenina más grave. Tu punto ideal está más abajo, así que suenas cálida y llena, y eres excelente para las partes de armonía debajo de la melodía.') },
  mezzo:{ n:b('Mezzo-soprano', 'Mezzosoprano'), d:b('Mezzo soprano. The middle female voice type. Your sweet spot sits in the middle, so you can sing melodies or harmony comfortably.', 'Mezzosoprano. El tipo de voz femenina intermedia. Tu punto ideal está en el medio, así que puedes cantar melodías o armonías con comodidad.') },
  soprano:{ n:b('Soprano', 'Soprano'), d:b('Soprano. The highest female voice type. Your sweet spot sits high, so you sound bright and clear on top melodies and high harmonies.', 'Soprano. El tipo de voz femenina más aguda. Tu punto ideal está arriba, así que suenas brillante y clara en las melodías altas y en las armonías agudas.') }
};
let RG = null;
const rgNew = () => (RG = { low:null, high:null, pLow:null, pHigh:null, mark:false });
const classify = (a, c) => { const m = (a + c) / 2; return m < 50 ? 'bass' : m < 55 ? 'baritone' : m < 60 ? 'tenor' : m < 64 ? 'alto' : m < 68 ? 'mezzo' : 'soprano'; };
const RSTAGE = { low:1, high:2, plow:3, phigh:4 };

SCREENS.range = ({ phase = 'intro' } = {}) => {
  if (phase === 'intro') {
    rgNew();
    const r = S.range && S.range.pLow;
    view.innerHTML = `<div class="card hero"><div class="big-ic">${ic('ruler')}</div><h2 class="center">${tr('rTitle')}</h2><p class="center muted">${tr('rIntro')}</p><p class="tip">${tr('rAdult')}</p>
      ${r ? `<p class="muted center">${tr('rResult')}: ${nnOct(S.range.low)} – ${nnOct(S.range.high)} · ${tr('rSweetLab')}: ${nnOct(S.range.pLow)} – ${nnOct(S.range.pHigh)}</p>` : ''}</div>
      <button class="btn primary big" data-act="rstart">${tr('rBegin')} ${ic('next')}</button>`;
    const my = run;
    say(tr('rTitle') + '. ' + tr('rIntro')).then(() => { if (my === run) say(tr('rAdult')); });
  } else if (RSTAGE[phase]) {
    if (!RG) rgNew();
    const n = RSTAGE[phase];
    view.innerHTML = `${demoBanner()}<div class="runhead"><button class="btn ghost small" data-go="range">${ic('x')} ${tr('stop')}</button><span class="badge practice">${n} / 4</span></div>
      <div class="card rcard"><h3>${tr('rStage' + n + 'T')}</h3><p class="muted">${tr('rStage' + n)}</p>
      <div class="rnums"><div><small>${tr('rTarget')}</small><b id="tgt">–</b></div><div><small>${tr('rYou')}</small><b id="sung">–</b></div></div>
      <div id="kbw"></div>
      <div class="pmeter"><div class="pz"></div><i id="pdot"></i></div><div class="pends"><span>${tr('tooLow')}</span><span>${tr('tooHigh')}</span></div>
      <div class="verdict" id="verdict">${tr('rSingNow')}</div>
      <div class="row rstep"><button class="btn small" data-act="rstep" data-d="-12">−${tr('rOct')}</button><button class="btn" data-act="rstep" data-d="-1">◀ ${tr('rLower')}</button><button class="btn" data-act="rstep" data-d="1">${tr('rHigher')} ▶</button><button class="btn small" data-act="rstep" data-d="12">+${tr('rOct')}</button></div>
      <button class="btn big" data-act="rplay">${ic('volume')} ${tr('rReplay')}</button>
      <button class="btn primary big" data-act="rmark">${tr(n === 1 ? 'rBtnLow' : n === 2 ? 'rBtnHigh' : 'rBtnWork')}</button>
      <p class="muted center">${tr('rHint')}</p></div>
      <div id="micbox" class="card hidden"><p>${tr('micProblem')}</p><div class="row"><button class="btn primary" data-act="demoOn">${tr('useDemo')}</button></div></div>`;
    rangeStage(phase);
  } else {
    const r = S.range, lo = 36, hi = 90, pos = m => ((Math.max(lo, Math.min(hi, m)) - lo) / (hi - lo) * 100).toFixed(1);
    const vt = VT[r.type], size = r.pHigh - r.pLow + 1;
    view.innerHTML = `<div class="card hero"><div class="big-ic good">${ic('check')}</div><h2 class="center">${tr('rDoneT')}</h2>
      <div class="rbar"><i class="rr" style="left:${pos(r.low)}%;width:${(pos(r.high) - pos(r.low)).toFixed(1)}%"></i><i class="rs" style="left:${pos(r.pLow)}%;width:${(pos(r.pHigh) - pos(r.pLow)).toFixed(1)}%"></i></div>
      <p class="muted"><span class="dotb"></span> ${tr('rRangeLab')}: <b>${nnOct(r.low)} – ${nnOct(r.high)}</b></p>
      <p class="muted"><span class="dotg"></span> ${tr('rSweetLab')}: <b>${nnOct(r.pLow)} – ${nnOct(r.pHigh)}</b> (${size} ${tr('rNotes')})</p>
      <div class="score" style="font-size:38px">${esc(L(vt.n))}</div><p>${esc(L(vt.d))}</p><p class="tip">${tr('rNotExact')}</p><p class="center">${tr('rSaved')} <b>${nnOct(S.root)}</b></p></div>
      <button class="btn primary big" data-go="levels">${tr('levels')} ${ic('next')}</button><button class="btn big" data-act="rstart">${tr('rRetry')}</button>`;
    confetti();
    const my = run;
    say(tr('rResultSay')).then(() => { if (my === run) return say(L(vt.d)); }).then(() => { if (my === run) say(tr('rNotExact')); });
  }
};

/* piano window: two octaves + the top C, starting on the C at or below the target */
function rPiano(t, sungM) {
  const s0 = Math.floor(t / 12) * 12, whites = [], blacks = [];
  for (let m = s0; m <= s0 + 24; m++) { if ([0, 2, 4, 5, 7, 9, 11].includes(m % 12)) whites.push(m); else blacks.push(m); }
  const w = 100 / whites.length, fold = sungM == null ? null : s0 + (((Math.round(sungM) - s0) % 12) + 12) % 12;
  const cls = m => (m === t ? 'hi ' : '') + (fold !== null && (m === fold || (m === s0 + 24 && fold === s0)) ? 'on' : '');
  return `<div class="kb rkb">${whites.map((m, i) => `<i class="wk ${cls(m)}" style="left:${(i * w).toFixed(2)}%;width:${w.toFixed(2)}%"><b>${nn(m)}${m % 12 === 0 ? `<small>${Math.floor(m / 12) - 1}</small>` : ''}</b></i>`).join('')}${blacks.map(m => { const i = whites.indexOf(m - 1); return `<i class="bk ${cls(m)}" style="left:${((i + 1) * w - w * 0.3).toFixed(2)}%;width:${(w * 0.6).toFixed(2)}%"></i>`; }).join('')}</div>`;
}
const foldSemi = d => ((((d + 6) % 12) + 12) % 12) - 6;

async function rangeStage(phase) {
  const my = run, n = RSTAGE[phase];
  if (!(await ensureMic()) || my !== run) return;
  const span = (RG.high || 79) - (RG.low || 41);
  let t = phase === 'low' ? 57 : phase === 'high' ? RG.low + 12 : phase === 'plow' ? RG.low + Math.round(span * 0.6) : RG.low + Math.round(span * 0.3);
  t = Math.max(24, Math.min(96, t));
  const hist = []; let lastSeen = 0, sungM = null, playId = 0;
  const draw = () => { const k = $('#kbw'); if (k) k.innerHTML = rPiano(t, sungM); const e = $('#tgt'); if (e) e.textContent = nnOct(t); };
  const play = async () => {
    const id = ++playId;
    hist.length = 0; sungM = null;
    activeTones.forEach(h => h.stop()); muted = true;
    const h = startTone(mtof(t), 0.25); await sleep(1000); h.stop(); await sleep(220);
    if (id !== playId) return;
    muted = false; if (my !== run) return;
    if (demo.on && t >= 29 && t <= 91) demoTarget(mtof(t), false);
  };
  RG.step = d => { t = Math.max(24, Math.min(96, t + d)); hist.length = 0; sungM = null; draw(); if (demo.on) demo.freq = null; play(); };
  RG.replay = () => { if (demo.on) demo.freq = null; play(); };
  RG.doMark = async () => {
    const vals = hist.slice(-18); let v = t;
    if (vals.length >= 6) { const m = median(vals); if (Math.abs(foldSemi(m - t)) <= 1.2) v = t + Math.round((m - t) / 12) * 12; }
    if (n >= 3) { while (v < RG.low) v += 12; while (v > RG.high) v -= 12; v = Math.max(RG.low, Math.min(RG.high, v)); }
    if (n === 2 && v < RG.low + 5) { const vd = $('#verdict'); if (vd) { vd.className = 'verdict bad'; vd.textContent = tr('rHighErr'); } say(tr('rHighErr')); return; }
    playId++; activeTones.forEach(h => h.stop()); muted = false; demo.freq = null;
    if (n === 1) RG.low = v; else if (n === 2) RG.high = v; else if (n === 3) RG.pLow = v; else RG.pHigh = v;
    const vd = $('#verdict'); if (vd) { vd.className = 'verdict good'; vd.textContent = tr('rGotNote') + ' ' + nnOct(v); }
    await sleep(900); if (my !== run) return;
    if (n === 4) finishRange(); else go('range', { phase:['', 'high', 'plow', 'phigh'][n] });
  };
  draw();
  say(tr('rStage' + n + 'T') + '. ' + tr('rStage' + n)).then(() => { if (my === run) play(); });
  while (my === run) {
    await sleep(60); if (my !== run || !$('#sung')) return;
    const f = readPitch(), now = performance.now();
    if (f) { hist.push(ftom(f)); if (hist.length > 40) hist.shift(); lastSeen = now; }
    if (now - lastSeen > 350) { hist.length = 0; }
    const recent = hist.slice(-6);
    const nm = recent.length >= 3 ? median(recent) : null;
    if ((nm === null) !== (sungM === null) || (nm !== null && Math.round(nm) !== Math.round(sungM))) { sungM = nm; draw(); } else sungM = nm;
    const se = $('#sung'), vd = $('#verdict'), dot = $('#pdot');
    if (nm === null) { se.textContent = '–'; if (vd && !vd.classList.contains('good') && !vd.classList.contains('bad')) { vd.className = 'verdict'; vd.textContent = tr('rSingNow'); } if (dot) dot.style.opacity = 0; continue; }
    se.textContent = nnOct(nm);
    const cents = foldSemi(nm - t) * 100;
    if (dot) { dot.style.opacity = 1; dot.style.left = (50 + Math.max(-100, Math.min(100, cents)) / 2) + '%'; }
    if (vd && !vd.classList.contains('good')) {
      const ok = Math.abs(cents) <= 40;
      vd.className = 'verdict ' + (ok ? 'ok' : 'warn');
      vd.textContent = ok ? tr('rOnPitch') : cents < 0 ? tr('rTooLowMsg') : tr('rTooHighMsg');
    }
  }
}
function finishRange() {
  let { low, high, pLow, pHigh } = RG;
  if (pLow > pHigh) [pLow, pHigh] = [pHigh, pLow];
  pLow = Math.max(low, pLow); pHigh = Math.min(high, pHigh);
  if (pHigh - pLow < 5) pHigh = Math.min(high, pLow + 12);
  const type = classify(pLow, pHigh);
  const target = pLow + (pHigh - pLow) * 0.2, roots = [36, 48, 60];
  S.root = roots.reduce((a, c) => Math.abs(c - target) < Math.abs(a - target) ? c : a);
  S.voice = (pLow + pHigh) / 2 < 60 ? 'low' : 'high';
  S.range = { low, high, pLow, pHigh, type }; save();
  go('range', { phase:'done' });
}

