/* ===== curriculum DSL + generators ===== */
const b = (en, es) => ({ en, es });
const opt = o => typeof o === 'string' ? { en:o, es:o } : { en:o[0], es:o[1] };
const Q = (qe, qs, o, a, ee, ese) => ({ k:'mc', q:b(qe, qs), o:o.map(opt), a, e:ee ? b(ee, ese) : null });
const QM = (qe, qs, o, a) => ({ k:'mc', multi:true, q:b(qe, qs), o:o.map(opt), a });
const LS = (te, ts, be, bs, x = {}) => Object.assign({ t:b(te, ts), b:b(be, bs) }, x);
const SING = (n, o = {}) => Object.assign({ k:'sing', n }, o);
const TAP = (pat, bpm) => ({ k:'tap', pat, bpm });
const rnd = (a, c) => a + Math.floor(Math.random() * (c - a + 1));
const pk = a => a[Math.floor(Math.random() * a.length)];
const shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const mixQ = (arr, p, g) => () => Math.random() < p ? pk(arr) : g();
const times = (n, f) => Array.from({ length:n }, f);

const SOLF = { en:['Do','Do#','Re','Re#','Mi','Fa','Fa#','Sol','Sol#','La','La#','Ti'], es:['Do','Do#','Re','Re#','Mi','Fa','Fa#','Sol','Sol#','La','La#','Si'] };
const LETT = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const solf = m => SOLF[S.lang][((m % 12) + 12) % 12];
const nfull = m => solf(m) + ' (' + LETT[((m % 12) + 12) % 12] + ')';

/* ear generators: every one returns an mc item with play[] (semitones relative to Do) */
const HLO = [b('Higher', 'Más agudo'), b('Lower', 'Más grave'), b('Same', 'Igual')];
function earHL(gaps, same) {
  const isSame = same && Math.random() < 0.25, g = pk(gaps), dir = Math.random() < .5 ? 1 : -1, a = rnd(2, 7), c = isSame ? a : a + dir * g;
  const ans = isSame ? 2 : dir > 0 ? 0 : 1;
  const ex = [b('The second note went higher.', 'La segunda nota subió.'), b('The second note went lower.', 'La segunda nota bajó.'), b('Both notes were exactly the same.', 'Las dos notas eran exactamente iguales.')][ans];
  return { k:'mc', ear:true, play:[a, c], q:same ? b('Was the second note higher, lower, or the same?', '¿La segunda nota fue más aguda, más grave o igual?') : b('Was the second note higher or lower?', '¿La segunda nota fue más aguda o más grave?'),
    o:(same ? HLO : HLO.slice(0, 2)).map(x => x), a:ans, e:ex };
}
function nameKeys(pool) {
  const m = pk(pool), set = new Set([m]); while (set.size < 3) set.add(pk(pool));
  const opts = shuf([...set]);
  return { k:'mc', viz:{ hi:[m] }, q:b('Which note is lit up on the keyboard?', '¿Qué nota está iluminada en el teclado?'), o:opts.map(x => ({ en:nfull(x), es:nfull(x), dyn:x })), a:opts.indexOf(m), e:b('That key is called ' + '{n}' + '.', 'Esa tecla se llama {n}.'), n:m };
}
function afterKey() {
  const W = [0, 2, 4, 5, 7, 9, 11], i = rnd(0, 6), m = W[i], nx = W[(i + 1) % 7];
  const set = new Set([nx]); while (set.size < 3) set.add(pk(W.filter(x => x !== m)));
  const opts = shuf([...set]);
  return { k:'mc', viz:{ hi:[m] }, q:b('Which note comes right AFTER the lit-up key? (Think: Do Re Mi...)', '¿Qué nota viene justo DESPUÉS de la tecla iluminada? (Piensa: Do Re Mi...)'), o:opts.map(x => ({ en:nfull(x), es:nfull(x), dyn:x })), a:opts.indexOf(nx), e:b('After it comes {n}.', 'Después viene {n}.'), n:nx };
}
function earName(pool) {
  const m = pk(pool), set = new Set([m]); while (set.size < 3) set.add(pk(pool));
  const opts = shuf([...set]);
  return { k:'mc', ear:true, play:[0, null, m], q:b('You heard Do first. Which note was the second one?', 'Oíste Do primero. ¿Cuál fue la segunda nota?'), o:opts.map(x => ({ en:nfull(x), es:nfull(x), dyn:x })), a:opts.indexOf(m), e:b('The second note was {n}.', 'La segunda nota fue {n}.'), n:m };
}
function earStepJump() {
  const step = Math.random() < .5, s = step ? pk([1, 2]) : pk([4, 5, 7, 9]), a = rnd(0, 5), dir = Math.random() < .5 ? 1 : -1;
  return { k:'mc', ear:true, play:[a, a + dir * s], q:b('Was that a step (notes close together) or a jump (notes far apart)?', '¿Eso fue un paso (notas cercanas) o un salto (notas lejanas)?'), o:[b('Step', 'Paso'), b('Jump', 'Salto')], a:step ? 0 : 1, e:step ? b('Those notes were very close: a step.', 'Esas notas estaban muy cerca: un paso.') : b('Those notes were far apart: a jump.', 'Esas notas estaban lejos: un salto.') };
}
function earBigger() {
  const S4 = [4, 5, 7, 12]; let x = pk(S4), y = pk(S4); while (y === x) y = pk(S4);
  const a = rnd(0, 3);
  return { k:'mc', ear:true, play:[a, a + x, null, a, a + y], q:b('Two jumps. Was the SECOND jump bigger or smaller than the first?', 'Dos saltos. ¿El SEGUNDO salto fue más grande o más pequeño que el primero?'), o:[b('Bigger', 'Más grande'), b('Smaller', 'Más pequeño')], a:y > x ? 0 : 1, e:y > x ? b('The second jump was bigger.', 'El segundo salto fue más grande.') : b('The second jump was smaller.', 'El segundo salto fue más pequeño.') };
}
function earMajMin(arp) {
  const maj = Math.random() < .5, th = maj ? 4 : 3, a = rnd(0, 4);
  const play = arp ? [a, a + th, a + 7, a + 12] : [[a, a + th, a + 7]];
  return { k:'mc', ear:true, play, q:b('Does this sound major (bright and happy) or minor (darker, more serious)?', '¿Esto suena mayor (brillante y alegre) o menor (más oscuro y serio)?'), o:[b('Major', 'Mayor'), b('Minor', 'Menor')], a:maj ? 0 : 1, e:maj ? b('That was major: bright and happy.', 'Eso fue mayor: brillante y alegre.') : b('That was minor: darker and more serious.', 'Eso fue menor: más oscuro y serio.') };
}
function earUnison() {
  const uni = Math.random() < .45, a = rnd(0, 5), d = pk([4, 5, 7, 3]);
  return { k:'mc', ear:true, play:[[a, uni ? a : a + d]], q:b('Did you hear one note (everyone the same) or two different notes together?', '¿Oíste una sola nota (todos igual) o dos notas distintas juntas?'), o:[b('One note (unison)', 'Una nota (unísono)'), b('Two notes (harmony)', 'Dos notas (armonía)')], a:uni ? 0 : 1, e:uni ? b('It was one note: a unison.', 'Era una sola nota: un unísono.') : b('Two different notes together: harmony.', 'Dos notas distintas juntas: armonía.') };
}
/* rhythm pattern pools (onsets in beats) */
const PAT1 = [[0, 1, 2, 3], [0, 1, 2], [0, 1, 2, 3]];
const PAT2 = [[0, 2, 3], [0, 1, 3], [0, 2], [0, 1, 2, 4]];
const PAT3 = [[0, 1, 1.5, 3], [0, 0.5, 1, 2, 3], [0, 1.5, 2, 3], [0, 1, 2, 2.5, 3], [0, 0.5, 1, 1.5, 2, 3]];

const SECTIONS = [
  { id:1, icon:'ear', name:b('What Notes Mean', 'Qué significan las notas'), desc:b('Start here. Learn what a note is, how to name it, and how to match one with your voice.', 'Empieza aquí. Aprende qué es una nota, cómo se llama y cómo igualarla con tu voz.') },
  { id:2, icon:'ladder', name:b('Steps and Scales', 'Pasos y escalas'), desc:b('Move from note to note: steps, the major scale, patterns, and jumps.', 'Muévete de nota en nota: pasos, la escala mayor, patrones y saltos.') },
  { id:3, icon:'beat', name:b('Rhythm, Keys and Steadiness', 'Ritmo, tonalidad y firmeza'), desc:b('Keep the beat, understand keys and major and minor, and hold notes steady.', 'Lleva el pulso, entiende las tonalidades, lo mayor y lo menor, y mantén las notas firmes.') },
  { id:4, icon:'mic', name:b('Your Voice', 'Tu voz'), desc:b('Breath, posture, how your voice works, vowels, and singing in harmony with the team.', 'Respiración, postura, cómo funciona tu voz, vocales y cantar en armonía con el equipo.') }
];
const LEVELS = [];
