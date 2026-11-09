import re, json, os, sys
base = open('v3.html').read()
R = lambda p: open('src/' + p).read()
def between(s, a, b, start=0):
    i = s.index(a, start); j = s.index(b, i); return i, j

# 1 content region
i, j = between(base, 'const TOUR = [', '/* ---------- state ---------- */')
content = '\n'.join(R(f) for f in ['gens.js', 'content1.js', 'content2.js', 'content3.js', 'content4.js', 'parts/glossary.js', 'parts/txt_extra.js']) + '\n\n'
base = base[:i] + content + base[j:]
# 2 state
i, j = between(base, '/* ---------- state ---------- */', '/* ---------- read aloud ---------- */')
base = base[:i] + R('parts/state.js') + '\n' + base[j:]
# 3 speech
i, j = between(base, '/* ---------- read aloud ---------- */', '/* ---------- audio ---------- */')
sp = base[i:j]
sp = sp.replace('function say(text, force) {', 'function sayTTS(text, force) {')
sp = re.sub(r'function stopSpeech\(\)[^\n]*\n', '', sp)
sp = re.sub(r'if \(SYN\) \{ try \{ SYN\.getVoices\(\); SYN\.onvoiceschanged[^\n]*\n', '', sp)
base = base[:i] + sp + R('parts/speech_new.js') + '\n' + base[j:]
# 4 screens home..levels..result
sc = base.index('/* ---------- screens ---------- */')
i, j = between(base, '/* home */', '/* warm-up */', sc)
base = base[:i] + R('parts/screens.js') + '\n' + base[j:]
# 5 progress..end
i = base.index('SCREENS.progress = () => {')
j = base.index('</script>', i)
base = base[:i] + R('parts/screens2.js').replace('async function hearNothing() {}\n', '') + '\n' + base[j:]
# 6 misc
base = base.replace("intro:'levels',", "intro:'levels', lesson:'levels',")
base = base.replace("<p class=\"center\">${tr('rSaved', { n:nnOct(root) })}</p>", "<p class=\"center\">${tr('rSaved')} <b>${nnOct(root)}</b></p>")
base = base.replace("tr('rSaved', { n:nnOct(root) })", "tr('rSaved')")
base = base.replace('</style>', R('parts/style_add.css') + '</style>', 1)
if os.path.exists('build/clips.json'):
    base = base.replace('/*CLIPS*/{}', json.dumps(json.load(open('build/clips.json')), separators=(',', ':')))
open(sys.argv[1] if len(sys.argv) > 1 else 'v4.html', 'w').write(base)
print('built', len(base))
