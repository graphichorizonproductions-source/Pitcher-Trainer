import sys, json, os, time, subprocess, numpy as np, onnxruntime as ort
from kokoro_onnx import Kokoro
lang = sys.argv[1]; threads = int(sys.argv[2]) if len(sys.argv) > 2 else 1
voice, kl = ('am_puck', 'en-us') if lang == 'en' else ('em_santa', 'es')
so = ort.SessionOptions(); so.intra_op_num_threads = threads
sess = ort.InferenceSession('kokoro-v1.0.onnx', sess_options=so, providers=['CPUExecutionProvider'])
k = Kokoro.from_session(sess, 'voices-v1.0.bin')
items = [x for x in json.load(open('/home/claude/pitch-trainer/build/speech.json')) if x['lang'] == lang]
order = lambda x: (0 if x['pack'].endswith('_ui') else 1, int(x['pack'].split('_L')[1]) if '_L' in x['pack'] else 0)
items.sort(key=order)
out = '/home/claude/pitch-trainer/build/clips'
t0 = time.time(); done = 0; audio_s = 0
for n, x in enumerate(items):
    f = f"{out}/{x['key']}.mp3"
    if os.path.exists(f): continue
    s, sr = k.create(x['text'], voice=voice, speed=0.95, lang=kl)
    pcm = (np.clip(s, -1, 1) * 32767).astype(np.int16).tobytes()
    p = subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 's16le', '-ar', str(sr), '-ac', '1', '-i', '-', '-b:a', '40k', '-ar', '24000', '-codec:a', 'libmp3lame', f + '.tmp.mp3'], input=pcm)
    os.replace(f + '.tmp.mp3', f)
    done += 1; audio_s += len(s) / sr
    if done % 10 == 0: print(lang, n + 1, '/', len(items), 'audio %.0fs wall %.0fs' % (audio_s, time.time() - t0), flush=True)
print(lang, 'FINISHED', time.time() - t0, flush=True)
