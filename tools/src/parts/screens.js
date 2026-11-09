/* home */
SCREENS.home = () => {
  const next = LEVELS.find(l => unlocked(l.id) && !P(l.id).passed) || LEVELS[LEVELS.length - 1];
  const passed = LEVELS.filter(l => P(l.id).passed).length, N = LEVELS.length;
  const st = stepLabel(next), stTxt = { done:tr('lvPassedBadge'), lesson:tr('lessonWord'), practice:tr('practiceWord'), test:tr('testWord') }[st];
  view.innerHTML = `${demoBanner()}
  <div class="greet"><div><p class="eyebrow">${tr('hi')}</p><h1>${esc(S.name || tr('friend'))}</h1><p class="muted">${tr('homeSub', { n:passed })}</p></div>
    <div class="ringbox"><svg viewBox="0 0 80 80"><circle class="rg-bg" cx="40" cy="40" r="34"/><circle class="rg-fg" id="rgfg" cx="40" cy="40" r="34"/></svg><b>${passed}/${N}</b></div></div>
  <button class="cont" data-go="intro" data-id="${next.id}"><span><small>${tr('cont')} · ${stTxt}</small><b>${tr('level')} ${next.id}: ${esc(L(next.name))}</b></span>${ic('next')}</button>
  <div class="grid">
    <button class="tile" data-go="warmup"><span class="chip-ic">${ic('flame')}</span>${tr('warmup')}<small>${tr('tileWarmSub')}</small></button>
    <button class="tile" data-go="range"><span class="chip-ic">${ic('ruler')}</span>${tr('range')}<small>${tr('tileRangeSub')}</small></button>
    <button class="tile" data-go="theory"><span class="chip-ic">${ic('book')}</span>${tr('theory')}<small>${tr('tileWordsSub')}</small></button>
    <button class="tile" data-go="tour"><span class="chip-ic">${ic('gauge')}</span>${tr('tileTour')}<small>${tr('tileTourSub')}</small></button>
  </div>`;
  requestAnimationFrame(() => requestAnimationFrame(() => { const r = $('#rgfg'); if (r) r.style.strokeDashoffset = 213.6 * (1 - passed / N); }));
};

/* levels, in sections */
SCREENS.levels = () => {
  view.innerHTML = `<h2>${tr('levels')}</h2>` + SECTIONS.map(sec => {
    const lvs = levelsOfSec(sec.id), done = lvs.filter(l => P(l.id).passed).length;
    return `<div class="sec"><div class="sechead"><span class="chip-ic">${ic(sec.icon)}</span><div><p class="eyebrow">${tr('secWord', { n:sec.id })} · ${done}/${lvs.length}</p><h3>${esc(L(sec.name))}</h3></div>
      <button class="icbtn" data-act="secsay" data-id="${sec.id}" aria-label="${tr('readToMe')}">${ic('volume')}</button></div>
      <p class="muted secdesc">${esc(L(sec.desc))}</p>` + lvs.map(l => {
      const p = P(l.id), ok = unlocked(l.id), st = stepLabel(l);
      const sub = p.passed ? tr('lvPassedBadge') + ' · ' + p.best + '%' : !ok ? '' : st === 'lesson' ? tr('lessonWord') : st === 'practice' ? tr('tierOf', { i:Math.min(3, p.tier + 1) }) : tr('testWord');
      return `<button class="lv ${ok ? '' : 'locked'} ${p.passed ? 'passed' : ''}" ${ok ? `data-go="intro" data-id="${l.id}"` : 'disabled'}>
        <span class="num">${p.passed ? ic('check') : ok ? l.id : ic('lock')}</span><span class="nm">${esc(L(l.name))}<small>${esc(sub)}</small></span>${starsHTML(p.stars)}</button>`;
    }).join('') + '</div>';
  }).join('');
};

/* level hub */
SCREENS.intro = ({ id }) => {
  const lv = LV(id), p = P(id), sec = SECTIONS.find(s => s.id === lv.sec);
  const tierPill = i => { const done = p.tier > i, now = p.tier === i; return `<div class="tp ${done ? 'done' : now ? 'now' : ''}"><i>${done ? ic('check') : i + 1}</i><span>${now ? p.hits + '/' + lv.tiers[i].goal : done ? tr('tierDone') : tr('tierLocked')}</span></div>`; };
  view.innerHTML = `${backBtn('levels')}
  <div class="card hero"><span class="pill">${tr('secWord', { n:sec.id })} · ${tr('level')} ${id}</span><h2 style="margin-top:12px">${esc(L(lv.name))}</h2><p>${esc(L(lv.desc))}</p>
    <div class="row"><button class="btn small" data-act="readDesc" data-id="${id}">${ic('volume')} ${tr('readToMe')}</button></div></div>
  <div class="card step ${p.lessonDone ? 'ok' : 'now'}"><h3>${tr('stepLesson')}</h3><p class="muted">${lv.lesson.length} ${S.lang === 'es' ? 'páginas' : 'pages'} · ${esc(lv.lesson.map(x => L(x.t)).join(' · '))}</p>
    <button class="btn ${p.lessonDone ? '' : 'primary'} big" data-act="lesson" data-id="${id}">${p.lessonDone ? tr('reviewLesson') : tr('startLesson')} ${ic('next')}</button></div>
  <div class="card step ${!p.lessonDone ? 'off' : p.tier >= 3 ? 'ok' : 'now'}"><h3>${tr('stepPractice')}</h3><div class="tiers">${[0, 1, 2].map(tierPill).join('')}</div>
    <button class="btn ${p.lessonDone && p.tier < 3 ? 'primary' : ''} big" ${p.lessonDone ? '' : 'disabled'} data-act="start" data-id="${id}" data-mode="practice">${p.lessonDone ? '' : ic('lock') + ' '}${p.tier >= 3 ? tr('reviewMode') : p.tier > 0 || p.hits > 0 ? tr('contPractice') : tr('startPractice')} ${ic('next')}</button>
    ${p.lessonDone ? '' : `<p class="muted center">${tr('lessonFirst')}</p>`}</div>
  <div class="card step ${p.passed ? 'ok' : p.tier >= 3 ? 'now' : 'off'}"><h3>${tr('stepTest')}</h3><p class="muted">${tr('testPassNeed', { pass:lv.pass })}${p.best ? ' · ' + tr('pBest') + ': ' + p.best + '%' : ''}</p>
    <button class="btn ${p.tier >= 3 && !p.passed ? 'gold' : ''} big" ${p.tier >= 3 ? '' : 'disabled'} data-act="start" data-id="${id}" data-mode="test">${p.tier >= 3 ? '' : ic('lock') + ' '}${tr('takeTest')}</button>
    ${p.tier >= 3 ? '' : `<p class="muted center">${tr('testLocked')}</p>`}</div>`;
  say(L(lv.name) + '. ' + L(lv.desc));
};

/* keyboard picture */
const WK = [0, 2, 4, 5, 7, 9, 11, 12], BK = [[1, 0], [3, 1], [6, 3], [8, 4], [10, 5]];
function kbHTML(hi = [], labels = false) {
  const w = 100 / 8;
  return `<div class="kb">${WK.map((m, i) => `<i class="wk ${hi.includes(m) ? 'hi' : ''}" data-m="${m}" style="left:${(i * w).toFixed(2)}%;width:${w}%">${labels ? `<b>${solf(m)}</b><small>${LETT[m % 12]}</small>` : ''}</i>`).join('')}${BK.map(([m, i]) => `<i class="bk ${hi.includes(m) ? 'hi' : ''}" data-m="${m}" style="left:${((i + 1) * w - w * 0.3).toFixed(2)}%;width:${(w * 0.6).toFixed(2)}%"></i>`).join('')}</div>`;
}
function kbLight(arr, on) { arr.forEach(m => { const k = document.querySelector('.kb [data-m="' + m + '"]'); if (k) k.classList.toggle('on', on); }); }

/* events: numbers, null (pause), or arrays (chords). Relative to Do. */
async function playEvents(ev, my, step) {
  for (let i = 0; i < ev.length; i++) {
    if (my !== run) return;
    const e = ev[i];
    if (e === null) { await sleep(380); continue; }
    const arr = Array.isArray(e) ? e : [e];
    if (step) step(arr, true);
    if (arr.length > 1) { muted = true; const hs = arr.map(m => startTone(mtof(S.root + m), 0.13)); await sleep(1300); hs.forEach(h => h.stop()); await sleep(240); muted = false; }
    else await playTone(mtof(S.root + arr[0]), 0.72);
    if (step) step(arr, false);
  }
}

/* lesson */
SCREENS.lesson = ({ id, i = 0 }) => {
  const lv = LV(id), pg = lv.lesson[i], n = lv.lesson.length, last = i === n - 1;
  view.innerHTML = `<div class="runhead"><button class="btn ghost small" data-go="intro" data-id="${id}">${ic('x')} ${tr('back')}</button><span class="eyebrow">${tr('pageOf', { i:i + 1, n })}</span></div>
  <div class="ob-dots">${lv.lesson.map((_, k) => `<i class="${k < i ? 'done' : k === i ? 'on' : ''}"></i>`).join('')}</div>
  <p class="eyebrow">${tr('level')} ${id} · ${esc(L(lv.name))}</p>
  <div class="card hero slide lesson"><h2>${esc(L(pg.t))}</h2><p class="lbody">${esc(L(pg.b))}</p>${pg.keys ? kbHTML([], true) : ''}
    <div class="row"><button class="btn small" data-act="lsay">${ic('volume')} ${tr('readToMe')}</button>${pg.play ? `<button class="btn small" data-act="lplay">${ic('play')} ${tr('hearIt')}</button>` : ''}</div></div>
  <div class="row">${i > 0 ? `<button class="btn" data-act="lpage" data-id="${id}" data-i="${i - 1}">${ic('back')} ${tr('prevPage')}</button>` : ''}
  ${last ? `<button class="btn primary" data-act="lfinish" data-id="${id}">${tr('startPractice')} ${ic('next')}</button>` : `<button class="btn primary" data-act="lpage" data-id="${id}" data-i="${i + 1}">${tr('nextPage')} ${ic('next')}</button>`}</div>`;
  say(L(pg.t) + '. ' + L(pg.b));
};

/* popup (modal, with optional second button) */
function popup({ icon = 'trophy', title, body, btn, btn2 }) {
  return new Promise(res => {
    const d = document.createElement('div'); d.className = 'pop';
    d.innerHTML = `<div class="popcard"><div class="big-ic good">${ic(icon)}</div><h2 class="center">${esc(title)}</h2><p class="center">${esc(body)}</p>
      <button class="btn primary big" id="popbtn">${esc(btn)} ${ic('next')}</button>${btn2 ? `<button class="btn big" id="popbtn2">${esc(btn2)}</button>` : ''}</div>`;
    document.body.appendChild(d);
    const close = v => { d.classList.add('out'); setTimeout(() => d.remove(), 260); res(v); };
    $('#popbtn').onclick = () => close('main');
    const b2 = $('#popbtn2'); if (b2) b2.onclick = () => close('alt');
    confetti();
  });
}

/* ---------- running practice and tests ---------- */
let currentTarget = null, answerResolve = null;
const instrKind = it => it.k === 'sing' ? (typeof it.n[0] !== 'number' ? 'instrHarm' : it.echo ? 'instrEcho' : 'instrSing') : it.k === 'tap' ? 'instrTap' : it.ear ? 'instrEar' : 'instrMC';
const maxOf = it => it.k === 'sing' ? it.n.length : it.k === 'tap' ? it.pat.length : 1;
const flash = ok => { const s = $('#stage') || $('#qarea'); if (!s) return; s.classList.remove('flash-ok', 'flash-bad'); void s.offsetWidth; s.classList.add(ok ? 'flash-ok' : 'flash-bad'); };
const setStatus = k => { const e = $('#status'); if (e) e.textContent = tr(k); };
const testVersion = lv => { const p = P(lv.id); if (p.v === null || p.v === undefined) { p.v = (nameHash(S.name) + (p.tries || 0)) % 3; save(); } return p.v; };

SCREENS.run = ({ id, mode }) => {
  const lv = LV(id), p = P(id);
  const tag = mode === 'practice' ? (p.tier >= 3 ? tr('reviewMode') : tr('tierOf', { i:p.tier + 1 })) : tr('testVersion', { v:'ABC'[testVersion(lv)] });
  view.innerHTML = `${demoBanner()}<div class="runhead"><button class="btn ghost small" data-act="stop" data-id="${id}">${ic('x')} ${tr('stop')}</button>
    <span class="badge ${mode}">${tag}</span><span class="lvname">${esc(L(lv.name))}</span></div>
  <div class="card instr"><button class="icbtn" data-act="sayInstr" aria-label="${tr('hearInstr')}">${ic('volume')}</button><div><b id="itit">${mode === 'test' ? tr('testWord') : tr('instrTitle')}</b><br><span id="itxt"></span></div></div>
  <div id="qarea"></div>
  <div class="statrow"><span id="statlab"></span><span id="stattext"></span></div><div class="bar"><i id="statbar"></i></div>
  <div id="micbox" class="card hidden"><p>${tr('micProblem')}</p><div class="row"><button class="btn primary" data-act="demoOn">${tr('useDemo')}</button></div></div>
  <div class="row" id="runbtns"></div>`;
  (mode === 'practice' ? practiceSession : testSession)(lv, run);
};
function setInstr(text) { const e = $('#itxt'); if (e) e.textContent = text; }
function setProgress(lab, txt, pct) { const a = $('#statlab'), b = $('#stattext'), c = $('#statbar'); if (a) a.textContent = lab; if (b) b.textContent = txt; if (c) c.style.width = Math.min(100, pct) + '%'; }

async function coach(kind, text, quiet) {
  const st = $('#stage'); if (!st) return;
  const old = st.querySelector('.coach'); if (old) old.remove();
  const icn = { up:'up', down:'down', mic:'mic' }[kind] || 'target';
  st.insertAdjacentHTML('beforeend', `<div class="coach ${kind}"><div class="arrow">${ic(icn)}</div><p>${esc(text)}</p></div>`);
  if (quiet) await sleep(1300);
  else if (S.voiceOn) { await say(text); await sleep(450); } else await sleep(2800);
  const el = st.querySelector('.coach');
  if (el) { el.classList.add('out'); await sleep(320); el.remove(); }
}

async function runItem(it, mode, my, ctx) {
  window.__item = it;
  if (it.k === 'sing') return runSing(it, mode, my, ctx);
  if (it.k === 'tap') return runTap(it, mode, my, ctx);
  return runMC(it, mode, my, ctx);
}
async function announceKind(it, mode, my, ctx) {
  const kind = instrKind(it); setInstr(tr(kind));
  if (mode === 'practice' && !ctx.seen.has(kind)) { ctx.seen.add(kind); await say(tr(kind)); }
}

async function practiceSession(lv, my) {
  const p = P(lv.id), ctx = { seen:new Set(), cues:3, mic:null };
  let ti = Math.min(p.tier, 2);
  const review = p.tier >= 3;
  const head = () => { const t = lv.tiers[ti]; setProgress(review ? tr('reviewMode') : tr('tierOf', { i:ti + 1 }), review ? '∞' : p.hits + '/' + t.goal, review ? 100 : p.hits / t.goal * 100); const b = $('.badge'); if (b) b.textContent = review ? tr('reviewMode') : tr('tierOf', { i:ti + 1 }); };
  setInstr(L(lv.tiers[ti].d)); head();
  await say(L(lv.tiers[ti].d)); if (my !== run) return;
  while (my === run) {
    const t = lv.tiers[ti], it = t.g();
    await announceKind(it, 'practice', my, ctx); if (my !== run) return;
    const r = await runItem(it, 'practice', my, Object.assign(ctx, { bonus:ti === 0 ? 12 : ti === 1 ? 6 : 0 }));
    if (my !== run || r.aborted) return;
    if (!review) {
      p.hits += r.pts; save(); head();
      if (p.hits >= t.goal) {
        p.hits = 0; p.tier = ti + 1; save();
        const last = ti === 2;
        const msg = tr('beat' + (ti + 1));
        setProgress(tr('tierOf', { i:ti + 1 }), '✓', 100);
        say(msg);
        const ch = await popup({ title:tr('beat' + (ti + 1) + 't'), body:msg, btn:last ? tr('goTest') : tr('nextPractice'), btn2:last ? tr('backLevel') : null });
        if (my !== run) return;
        stopSpeech();
        if (last) { if (ch === 'main') go('run', { id:lv.id, mode:'test' }); else go('intro', { id:lv.id }); return; }
        ti++; setInstr(L(lv.tiers[ti].d)); head();
        await say(L(lv.tiers[ti].d)); if (my !== run) return;
      }
    } else head();
  }
}

async function testSession(lv, my) {
  const p = P(lv.id), v = testVersion(lv), ctx = { seen:new Set(), cues:0, mic:null, bonus:0, replays:1 };
  const items = shuf([...lv.tq.slice(v * 3, v * 3 + 3), ...lv.testGen()]);
  const total = items.reduce((a, it) => a + maxOf(it), 0);
  let pts = 0, done = 0;
  setInstr(tr('testIntro')); setProgress(tr('testWord'), '0/' + total, 0);
  await say(tr('testIntro')); if (my !== run) return;
  for (const it of items) {
    if (my !== run) return;
    await announceKind(it, 'test', my, ctx); if (my !== run) return;
    const r = await runItem(it, 'test', my, ctx);
    if (my !== run || r.aborted) return;
    pts += r.pts; done += maxOf(it);
    setProgress(tr('testWord'), done + '/' + total + '  ·  ' + pts + ' ✓', done / total * 100);
  }
  if (my !== run) return;
  const pct = Math.round(pts / total * 100), pass = pct >= lv.pass;
  p.best = Math.max(p.best, pct); p.tries = (p.tries || 0) + 1; p.v = null;
  if (pass) { p.passed = true; p.stars = Math.max(p.stars, pct === 100 ? 3 : pct >= 90 ? 2 : 1); }
  save();
  go('result', { id:lv.id, pct, pass, pts, total, v });
}

/* ---- question (multiple choice / multi-select / listening) ---- */
async function runMC(it, mode, my, ctx) {
  const qa = $('#qarea'), multi = !!it.multi, correct = new Set([].concat(it.a));
  const order = (it.ear || it.viz || it.fixed) ? it.o.map((_, i) => i) : shuf(it.o.map((_, i) => i));
  qa.innerHTML = `<div class="card qcard">${it.ear ? `<div class="stage" id="stage"><div class="orb small"><div class="core" id="bignote">${ic('headphones')}</div></div></div>` : ''}${it.viz ? kbHTML(it.viz.hi) : ''}
    <h3 class="qtext">${esc(L(it.q))}</h3>${multi ? `<p class="muted">${tr('selectAll')}</p>` : ''}
    <div class="opts" id="opts">${order.map(i => `<button class="ans" data-i="${i}" ${it.ear ? 'disabled' : ''}>${esc(L(it.o[i]))}</button>`).join('')}</div>
    <div class="row" id="qbtns">${multi ? `<button class="btn primary" id="chk" disabled>${tr('check')}</button>` : ''}${it.play ? `<button class="btn" id="rep" disabled>${ic('replay')} ${tr('hearAgain')}</button>` : ''}</div><div class="fb" id="fb"></div></div>`;
  const btns = [...qa.querySelectorAll('.ans')], chk = $('#chk'), rep = $('#rep');
  const sel = new Set();
  const setOpts = on => btns.forEach(b => { b.disabled = !on; });
  const playIt = async () => {
    setOpts(false); if (rep) rep.disabled = true; setPhase('hear');
    await playEvents(it.play.map(e => typeof e === 'number' ? e : e), my, (arr, on) => { const c = $('#bignote'); if (c) c.classList.toggle('pulse', on); });
    setPhase(null);
    if (my !== run) return;
    setOpts(true); if (rep) rep.disabled = mode === 'test' && ctx.replays <= 0 ? true : false;
  };
  if (rep) rep.onclick = async () => { if (mode === 'test') { if (ctx.replays <= 0) return; ctx.replays--; } await playIt(); if (rep && mode === 'test') rep.disabled = ctx.replays <= 0; };
  if (it.ear) { await say(L(it.q)); if (my !== run) return; if (mode === 'test') ctx.replays = 1; await playIt(); if (my !== run) return; if (rep && mode === 'test' && ctx.replays <= 0) rep.disabled = true; }
  else say(L(it.q));
  const ans = await new Promise(res => {
    answerResolve = res;
    btns.forEach(b => { b.onclick = () => {
      const i = +b.dataset.i;
      if (!multi) { res([i]); return; }
      if (sel.has(i)) { sel.delete(i); b.classList.remove('sel'); } else { sel.add(i); b.classList.add('sel'); }
      chk.disabled = sel.size === 0;
    }; });
    if (chk) chk.onclick = () => res([...sel]);
  });
  answerResolve = null;
  if (my !== run || ans === null) return { aborted:true };
  const ok = ans.length === correct.size && ans.every(i => correct.has(i));
  setOpts(false); if (chk) chk.disabled = true; if (rep) rep.disabled = true;
  btns.forEach(b => { const i = +b.dataset.i; if (ans.includes(i)) b.classList.add(ok || correct.has(i) ? 'right' : 'wrong'); else if (mode === 'practice' && !ok && correct.has(i)) b.classList.add('reveal'); });
  flash(ok);
  const fb = $('#fb');
  if (ok) { fb.textContent = tr('correct'); fb.className = 'fb good'; await sleep(900); return { pts:1, max:1 }; }
  if (mode === 'test') { fb.textContent = tr('notQuite'); fb.className = 'fb bad'; await sleep(900); return { pts:0, max:1 }; }
  const exp = it.e ? L(it.e).split('{n}').join(it.n !== undefined ? nfull(it.n) : '') : tr('rightAnswer') + ': ' + [...correct].map(i => L(it.o[i])).join(', ');
  fb.innerHTML = `<b>${tr('notQuite')}</b> ${esc(exp)}`; fb.className = 'fb bad';
  const cont = document.createElement('button'); cont.className = 'btn primary'; cont.innerHTML = tr('continueBtn') + ' ' + ic('next'); $('#qbtns').appendChild(cont);
  const clicked = new Promise(r => { cont.onclick = () => r(); });
  (async () => { await say(tr('notQuite')); if (my !== run) return; if (it.e) await sayWithNote(L(it.e), it.n); })();
  await clicked; stopSpeech();
  return { pts:0, max:1 };
}

/* ---- singing ---- */
async function runSing(it, mode, my, ctx) {
  const qa = $('#qarea'), notes = it.n, harm = typeof notes[0] !== 'number', echo = !!it.echo;
  const tol = it.tol + (mode === 'practice' ? (ctx.bonus || 0) : 0), hold = it.hold || 0.7;
  qa.innerHTML = `<div class="card stage" id="stage"><div class="status" id="status"></div><div class="orb"><div class="core" id="bignote">–</div></div>
    <div class="dots" id="dots">${notes.map(() => '<i></i>').join('')}</div>${it.lab ? `<p class="lab">${esc(L(it.lab))}</p>` : ''}${meterHTML()}
    <button class="btn small" id="rep">${ic('replay')} ${tr('hearAgain')}</button></div>`;
  if (!(await ensureMic())) return { aborted:true };
  if (my !== run) return { aborted:true };
  const rep = $('#rep'); if (mode === 'test') rep.classList.add('hidden');
  rep.onclick = () => { if (currentTarget) playTone(currentTarget.freq, 1.0); };
  const dots = () => [...document.querySelectorAll('#dots i')];
  const light = k => dots().forEach((d, j) => d.classList.toggle('on', j === k));
  const playN = e => playTone(mtof(S.root + tgt(e)), 1.0);
  if (it.lab) { await say(L(it.lab)); if (my !== run) return { aborted:true }; }
  if (echo) {
    setStatus('listen'); setPhase('hear');
    for (let i = 0; i < notes.length; i++) { light(i); $('#bignote').textContent = nn(S.root + tgt(notes[i])); await playN(notes[i]); if (my !== run) return { aborted:true }; await sleep(80); }
    light(-1); setPhase(null); $('#bignote').textContent = '?';
    if (mode === 'practice' && ctx.cues > 0) { setStatus('yourTurn'); await say(tr('yourTurn')); if (my !== run) return { aborted:true }; }
  }
  let hits = 0;
  for (let idx = 0; idx < notes.length; idx++) {
    if (my !== run) return { aborted:true };
    const e = notes[idx], t = tgt(e), m = mel(e);
    currentTarget = { freq:mtof(S.root + (harm ? m : t)) };
    light(idx); if (!echo) $('#bignote').textContent = nn(S.root + t);
    updateMeter(null, tol, 0, null);
    if (!echo) {
      setStatus('listen'); setPhase('hear');
      if (mode === 'practice' && ctx.cues > 0) { await say(tr('listen')); if (my !== run) return { aborted:true }; }
      if (harm) {
        await playTone(mtof(S.root + m), 1.1); if (my !== run) return { aborted:true };
        if (mode === 'practice') { setStatus('hearHarm'); await sleep(150); await playTone(mtof(S.root + t), 1.1); }
      } else await playN(e);
      if (my !== run) return { aborted:true };
      await sleep(100);
      if (mode === 'practice' && ctx.cues > 0) { setStatus('singNow'); await say(tr('singNow')); if (my !== run) return { aborted:true }; }
    }
    const drone = harm ? startTone(mtof(S.root + m), 0.08) : null;
    setStatus('singNow'); setPhase('sing');
    const r = await listen({ target:S.root + t, tol, hold, timeout:(mode === 'test' ? 4.5 : 8) + hold, my });
    if (drone) drone.stop();
    if (my !== run || r.aborted) return { aborted:true };
    setPhase(null);
    if (r.hit) hits++;
    ctx.cues = Math.max(0, ctx.cues - 1);
    flash(r.hit); setStatus(r.hit ? 'hit' : 'miss');
    if (r.hit) await sleep(650);
    else {
      const txt = { mic:tr('coachMic'), low:tr('coachLow'), high:tr('coachHigh'), steady:tr('coachSteady'), hold:tr('coachHold') }[r.kind] || tr('miss');
      await coach(r.kind === 'low' ? 'up' : r.kind === 'high' ? 'down' : r.kind, txt, mode === 'test');
      if (my !== run) return { aborted:true };
    }
  }
  return { pts:hits, max:notes.length };
}

/* ---- rhythm tapping ---- */
async function runTap(it, mode, my, ctx) {
  const qa = $('#qarea'), beat = 60000 / it.bpm;
  qa.innerHTML = `<div class="card stage" id="stage"><div class="status" id="status"></div>
    <div class="grid8" id="g8">${times(8, i => `<i data-c="${i}" class="${it.pat.some(o => Math.round(o * 2) === i) ? 'tgt' : ''}"></i>`).join('')}</div>
    <div class="beats" id="bts">${[1, 2, 3, 4].map(n => `<span>${n}</span>`).join('')}</div>
    <button class="tapbtn" id="tapbtn" disabled>${tr('tapBtn')}</button><p class="muted center">${tr('tapHint')}</p></div>`;
  const cells = [...document.querySelectorAll('#g8 i')], bts = [...document.querySelectorAll('#bts span')];
  const click = (accent) => { const h = startTone(mtof(S.root + (accent ? 24 : 19)), 0.2); setTimeout(() => h.stop(), 70); };
  const cur = k => { cells.forEach((c, j) => c.classList.toggle('cur', j === k)); bts.forEach((s, j) => s.classList.toggle('on', k >= 0 && j === Math.floor(k / 2) && k % 2 === 0)); };
  // 1) hear it
  setStatus('tapListen'); setPhase('hear'); muted = true;
  let t0 = performance.now();
  for (const o of it.pat) {
    const wait = t0 + o * beat - performance.now(); if (wait > 0) await sleep(wait);
    if (my !== run) { muted = false; return { aborted:true }; }
    const h = startTone(mtof(S.root + 7), 0.22); cur(Math.round(o * 2)); setTimeout(() => h.stop(), 140);
  }
  await sleep(beat * 0.8); cur(-1); setPhase(null);
  // 2) count in
  setStatus('tapCount');
  for (let k = 0; k < 4; k++) { if (my !== run) { muted = false; return { aborted:true }; } click(k === 0); bts.forEach((s, j) => s.classList.toggle('on', j === k)); await sleep(beat); }
  // 3) tap
  muted = false; setStatus('tapNow'); setPhase('sing');
  const btn = $('#tapbtn'), taps = []; btn.disabled = false;
  t0 = performance.now();
  btn.onpointerdown = ev => { ev.preventDefault(); taps.push(performance.now() - t0); btn.classList.add('hit'); setTimeout(() => btn.classList.remove('hit'), 90); };
  const simulated = demo.on ? it.pat.map(o => o * beat + (Math.random() - .5) * beat * 0.3) : null;
  let simI = 0;
  const endT = t0 + 4 * beat + beat * 0.5;
  let lastB = -1;
  while (performance.now() < endT) {
    if (my !== run) return { aborted:true };
    const el = performance.now() - t0, b2 = Math.floor(el / beat);
    if (b2 !== lastB && b2 < 4) { lastB = b2; click(b2 === 0); bts.forEach((s, j) => s.classList.toggle('on', j === b2)); }
    cur(Math.min(7, Math.floor(el / (beat / 2))));
    while (simulated && simI < simulated.length && el >= simulated[simI]) { taps.push(simulated[simI]); simI++; btn.classList.add('hit'); setTimeout(() => btn.classList.remove('hit'), 90); }
    await sleep(15);
  }
  btn.disabled = true; btn.onpointerdown = null; cur(-1); setPhase(null);
  // score
  const win = beat * (mode === 'test' ? 0.28 : 0.36), used = new Set(); let matches = 0;
  it.pat.forEach((o, k) => {
    let best = -1, bd = 1e9;
    taps.forEach((tp, j) => { if (used.has(j)) return; const d = Math.abs(tp - o * beat); if (d < bd) { bd = d; best = j; } });
    const c = cells[Math.round(o * 2)];
    if (best >= 0 && bd <= win) { used.add(best); matches++; if (c) c.classList.add('good'); } else if (c) c.classList.add('bad');
  });
  const extras = Math.max(0, taps.length - matches);
  const pts = Math.max(0, matches - Math.max(0, extras - 1)), ok = pts >= it.pat.length;
  flash(pts >= it.pat.length * 0.7); setStatus(ok ? 'tapGood' : 'tapOff');
  if (!ok && mode === 'practice') { await say(tr('tapOff')); } else await sleep(1100);
  return { pts, max:it.pat.length };
}

/* ---- result ---- */
SCREENS.result = ({ id, pct, pass, pts, total, v }) => {
  const lv = LV(id), p = P(id), next = id < LEVELS.length ? id + 1 : null;
  view.innerHTML = `<div class="card hero"><div class="big-ic ${pass ? 'good' : ''}">${ic(pass ? 'trophy' : 'replay')}</div>
    <h2 class="center">${pass ? tr('passedT') : tr('failT')}</h2>
    <div class="score" id="sc">0%</div><p class="muted center">${pts}/${total} · ${tr('needed', { pass:lv.pass })} · ${tr('testVersion', { v:'ABC'[v] })}</p>${pass ? '' : `<p class="tip">${tr('failTip')}</p>`}
    ${pass ? `<div class="center" style="margin-top:10px">${starsHTML(p.stars, 'lg')}</div>` : ''}</div>
    ${pass && next ? `<button class="btn primary big" data-go="intro" data-id="${next}">${tr('nextLevel')} ${ic('next')}</button>` : ''}
    ${!pass ? `<button class="btn primary big" data-act="start" data-id="${id}" data-mode="test">${tr('tryAgain')}</button>` : ''}
    <button class="btn big" data-act="lesson" data-id="${id}">${tr('reviewLesson')}</button>
    <button class="btn big" data-act="start" data-id="${id}" data-mode="practice">${tr('backPractice')}</button>
    <button class="btn ghost big" data-go="levels">${tr('levels')}</button>`;
  countUp($('#sc'), pct);
  if (pass) confetti();
  say(pass ? tr('passedSay') : tr('failSay2'));
};
