/* ---------- state ---------- */
const KEY = 'wtpt-v4';
let S = { lang:'en', name:'', voice:'low', root:48, unsure:false, voiceOn:true, onboardDone:false, tourDone:false, rate:1, progress:{}, warmDone:0, range:null };
const demo = { on:false, freq:null, t0:0, err0:0, miss:false };
function load() {
  try {
    const j = localStorage.getItem(KEY);
    if (j) Object.assign(S, JSON.parse(j));
    else {
      const o = localStorage.getItem('wtpt-v2');
      if (o) { const v = JSON.parse(o); ['lang', 'name', 'voice', 'root', 'unsure', 'voiceOn', 'onboardDone', 'tourDone', 'warmDone', 'range'].forEach(k => { if (v[k] !== undefined) S[k] = v[k]; }); }
    }
  } catch (e) {}
  if (!S.rate || S.rate < 0.7 || S.rate > 1.3) S.rate = 1;
  if (!S.progress) S.progress = {};
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
const tr = (k, v) => { let s = (TXT[S.lang][k] ?? TXT.en[k] ?? k); if (v) for (const x in v) s = s.split('{' + x + '}').join(v[x]); return s; };
const L = o => (o && typeof o === 'object') ? (o[S.lang] || o.en) : o;
const $ = (s, r = document) => r.querySelector(s);
const view = $('#view');
const P = id => S.progress[id] || (S.progress[id] = { lessonDone:false, tier:0, hits:0, passed:false, best:0, stars:0, tries:0, v:null });
const LV = id => LEVELS.find(l => l.id === id);
const unlocked = id => id === 1 || P(id - 1).passed;
const NAMES = { en:['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'], es:['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'] };
const nn = m => NAMES[S.lang][((Math.round(m) % 12) + 12) % 12];
const nnOct = m => nn(m) + (Math.floor(Math.round(m) / 12) - 1);
const tgt = e => typeof e === 'number' ? e : e.t;
const mel = e => typeof e === 'number' ? e : e.m;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const pick = a => a[Math.floor(Math.random() * a.length)];
const randInt = (a, c) => a + Math.floor(Math.random() * (c - a + 1));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
const nameHash = s => [...String(s || 'x')].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const levelsOfSec = id => LEVELS.filter(l => l.sec === id);
const stepLabel = lv => { const p = P(lv.id); return p.passed ? 'done' : !p.lessonDone ? 'lesson' : p.tier < 3 ? 'practice' : 'test'; };

Object.assign(ICONS, {
  ear:'<path d="M6 9a6 6 0 0 1 12 0c0 3-2 4-3 6s-1 5-4 5a3 3 0 0 1-3-3"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0"/>',
  ladder:'<path d="M8 3v18M16 3v18M8 7h8M8 12h8M8 17h8"/>',
  beat:'<path d="M3 12h4l2-6 4 12 2-6h6"/>'
});
