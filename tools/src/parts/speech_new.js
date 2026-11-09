
/* ---------- recorded voice (clips) with device-voice fallback ---------- */
const CLIPS = /*CLIPS*/{};
const cyrb53 = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) { ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
const clipKey = (lang, text) => lang + cyrb53(text).toString(36);
const packCache = {}, clipBuf = new Map();
let clipSrc = null;
function loadPack(name) {
  if (!packCache[name]) packCache[name] = fetch('audio/' + name + '.mp3').then(r => { if (!r.ok) throw new Error('pack'); return r.arrayBuffer(); }).catch(e => { delete packCache[name]; throw e; });
  return packCache[name];
}
async function getClip(key) {
  const c = CLIPS[key]; if (!c) return null;
  if (clipBuf.has(key)) return clipBuf.get(key);
  const pack = await loadPack(c[0]);
  const ab = pack.slice(c[1], c[1] + c[2]);
  const buf = await new Promise((res, rej) => { const p = audio().decodeAudioData(ab, res, rej); if (p && p.catch) p.catch(rej); });
  clipBuf.set(key, buf); return buf;
}
function haltClip() { if (clipSrc) { const s = clipSrc; clipSrc = null; try { s.stop(); } catch (e) {} } }
function say(text, force) {
  return new Promise(async resolve => {
    if (!S.voiceOn && !force) { resolve(); return; }
    const txt = cleanSpeech(text);
    if (!txt) { resolve(); return; }
    const gen = ++speakGen;
    haltClip(); if (SYN) { try { SYN.cancel(); } catch (e) {} }
    const key = clipKey(S.lang, txt);
    if (CLIPS[key]) {
      let buf = null;
      try { buf = await getClip(key); } catch (e) { buf = null; }
      if (gen !== speakGen) { resolve(); return; }
      if (buf) {
        try {
          const ac = audio(), src = ac.createBufferSource(), rate = S.rate || 1;
          src.buffer = buf; src.playbackRate.value = rate; src.connect(ac.destination); clipSrc = src;
          speakN++; document.body.classList.add('speaking');
          let fin = false;
          const done = () => { if (fin) return; fin = true; if (clipSrc === src) clipSrc = null; speakN = Math.max(0, speakN - 1); document.body.classList.toggle('speaking', speakN > 0); resolve(); };
          src.onended = () => setTimeout(done, 140);
          setTimeout(done, buf.duration / rate * 1000 + 1500);
          src.start(); return;
        } catch (e) {}
      }
    }
    sayTTS(txt, force).then(resolve);
  });
}
function stopSpeech() { speakGen++; haltClip(); if (SYN) { try { SYN.cancel(); } catch (e) {} } }
const solfSay = m => solf(m).replace('#', S.lang === 'es' ? ' sostenido' : ' sharp');
/* say a sentence that has {n} where a note name goes */
async function sayWithNote(text, m) {
  if (String(text).indexOf('{n}') < 0) return say(text);
  const parts = text.split('{n}');
  if (parts[0].trim()) await say(parts[0]);
  await say(solfSay(m));
  if (parts[1] && parts[1].replace(/[.\s]/g, '')) await say(parts[1]);
}
