import json, os
sp = json.load(open('build/speech.json')); idx = {}; packs = {}
os.makedirs('audio', exist_ok=True)
for x in sp:
    f = f"build/clips/{x['key']}.mp3"
    if not os.path.exists(f): continue
    b = open(f, 'rb').read(); buf = packs.setdefault(x['pack'], bytearray())
    idx[x['key']] = [x['pack'], len(buf), len(b)]; buf.extend(b)
for n, buf in packs.items(): open(f'audio/{n}.mp3', 'wb').write(buf)
json.dump(idx, open('build/clips.json', 'w'))
print(len(idx), 'of', len(sp), 'clips;', sum(len(b) for b in packs.values()) // 1024, 'KB')
