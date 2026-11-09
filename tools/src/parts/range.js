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
      <div class="card stage" id="stage"><h3>${tr('rStage' + n + 'T')}</h3><p class="muted">${tr('rStage' + n)}</p><div class="status" id="status"></div>
      <div class="orb"><div class="core" id="bignote">–</div></div><p class="center muted">${tr('youSing')}: <b id="sung">–</b></p>
      <button class="btn primary big" data-act="rmark">${tr(n <= 2 ? (n === 1 ? 'rBtnLow' : 'rBtnHigh') : 'rBtnWork')}</button></div>
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

async function sampleSung(ms, my, stopOnMark) {
  const vals = [], t0 = performance.now();
  while (performance.now() - t0 < ms) {
    await sleep(40); if (my !== run) return null;
    if (stopOnMark && RG && RG.mark) break;
    const f = readPitch();
    if (f) { vals.push(ftom(f)); const e = $('#sung'); if (e) e.textContent = nnOct(ftom(f)); }
  }
  const v = vals.slice(Math.floor(vals.length * 0.35));
  if (v.length < 10) return null;
  const m = median(v);
  if (v.filter(x => Math.abs(x - m) < 1.2).length < v.length * 0.6) return null;
  return m;
}
const demoSing = p => { if (!demo.on) return; if (p >= 41 && p <= 79) demoTarget(mtof(p), false); else demo.freq = null; demo.t0 = performance.now(); };

async function rangeStage(phase) {
  const my = run;
  if (!(await ensureMic()) || my !== run) return;
  const n = RSTAGE[phase];
  await say(tr('rStage' + n + 'T') + '. ' + tr('rStage' + n)); if (my !== run) return;
  RG.mark = false;
  const dir = (phase === 'low' || phase === 'plow') ? -1 : 1;
  if (n <= 2) {
    let p = phase === 'low' ? 69 : Math.round(RG.low + 8), last = null, misses = 0, first = true;
    for (let steps = 0; steps < 45 && my === run; steps++) {
      if (RG.mark) break;
      $('#bignote').textContent = nnOct(p); setStatus('rPlaying'); setPhase('hear');
      await playTone(mtof(p), 0.9); if (my !== run) return;
      setStatus('rSingAlong'); setPhase('sing'); demoSing(p);
      const m = await sampleSung(2300, my, true); if (my !== run) return;
      demo.freq = null; setPhase(null);
      const ok = m !== null && (first ? Math.abs((((m - p + 6) % 12) + 12) % 12 - 6) <= 1.3 : Math.abs(m - p) <= 1.5);
      if (ok) { last = Math.round(m); misses = 0; first = false; setStatus('rGotNote'); await sleep(250); p = last + dir; }
      else { if (RG.mark) break; misses++; if (misses >= 2) break; setStatus('rRetryNote'); await sleep(900); }
    }
    if (my !== run) return;
    const bad = last === null || (phase === 'high' && last <= RG.low + 3);
    if (bad) { setStatus('rFail'); setPhase(null); await say(tr('rFail')); return; }
    RG[phase] = last;
    setStatus('rGotNote'); await sleep(900); if (my !== run) return;
    go('range', { phase:phase === 'low' ? 'high' : 'plow' });
  } else {
    const span = RG.high - RG.low, end = dir < 0 ? RG.low + 1 : RG.high - 1;
    let p = Math.round(RG.low + span * (dir < 0 ? 0.62 : 0.3)), edge = end;
    for (let steps = 0; steps < 45 && my === run; steps++) {
      $('#bignote').textContent = nnOct(p); setStatus('rPlaying'); setPhase('hear');
      await playTone(mtof(p), 0.8); if (my !== run) return;
      setStatus('rSingAlong'); setPhase('sing'); demoSing(p);
      if (demo.on && ((dir < 0 && p <= RG.low + span * 0.3) || (dir > 0 && p >= RG.low + span * 0.72))) RG.mark = true;
      await sampleSung(2000, my, true); if (my !== run) return;
      demo.freq = null; setPhase(null);
      if (RG.mark) { edge = p; break; }
      if ((dir < 0 && p <= end) || (dir > 0 && p >= end)) { edge = end; break; }
      p += dir;
    }
    if (my !== run) return;
    RG[phase === 'plow' ? 'pLow' : 'pHigh'] = edge; setStatus('rGotNote'); await sleep(800); if (my !== run) return;
    if (phase === 'plow') go('range', { phase:'phigh' }); else finishRange();
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

