# Uso: python3 scripts/analyze.py mi-clip [idioma]
# Busca public/clips/mi-clip.(mov|mp4|...) y crea public/data/mi-clip.json
# 1) transcribe el clip completo (Whisper turbo)  2) detecta tramos con voz
# 3) quita silencios, ruido y muletillas  4) reparte las palabras en el tiempo final
import sys, json, os, re, glob, subprocess, numpy as np
from faster_whisper.vad import get_speech_timestamps, VadOptions
from pywhispercpp.model import Model

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
name = sys.argv[1]
lang = sys.argv[2] if len(sys.argv) > 2 else 'es'
found = [p for p in glob.glob(os.path.join(ROOT, 'public', 'clips', name + '.*'))]
if not found:
    sys.exit(f'No encuentro public/clips/{name}.mov (o .mp4). Revisa el nombre.')
src = found[0]
SR = 16000
pcm = subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-vn', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                     capture_output=True).stdout
audio = np.frombuffer(pcm, np.float32).copy()
dur = len(audio) / SR

# --- transcripción completa (con todo el contexto el texto sale mejor)
local = os.path.join(ROOT, 'models', 'whisper-turbo.bin')
m = Model(local if os.path.exists(local) else 'large-v3-turbo', n_threads=4, print_progress=False, print_realtime=False)
raw = m.transcribe(audio, language=lang, token_timestamps=True, max_len=1, split_on_word=True)
W = [{'t': s.text.strip(), 's': s.t0 / 100, 'e': s.t1 / 100} for s in raw if s.text.strip()]

# --- tramos con voz
ts = get_speech_timestamps(audio, VadOptions(min_silence_duration_ms=250, speech_pad_ms=0, threshold=0.4))
PAD_IN, PAD_OUT, MERGE = 0.08, 0.15, 0.22
segs = []
for t in ts:
    a = max(0, t['start'] / SR - PAD_IN); b = min(dur, t['end'] / SR + PAD_OUT)
    if segs and a - segs[-1][1] < MERGE: segs[-1][1] = b
    else: segs.append([a, b])

# --- asignar cada palabra a un tramo (en orden)
def ov(w, sg): return max(0, min(w['e'], sg[1]) - max(w['s'], sg[0]))
prev = 0; assign = []
for w in W:
    best = None; bo = -1
    for i in range(prev, len(segs)):
        o = ov(w, segs[i])
        if o > bo: bo, best = o, i
        if segs[i][0] > w['e'] + 1.5: break
    if bo <= 0:
        mid = (w['s'] + w['e']) / 2
        best = min(range(prev, len(segs)), key=lambda i: abs((segs[i][0] + segs[i][1]) / 2 - mid))
    prev = best; assign.append(best)

# Muletillas que se borran y correcciones de palabras que Whisper escribe mal.
FILLERS = {'eh', 'em', 'mm', 'mmm', 'ehh', 'ah', 'este'}
FIX = []  # ejemplo: (r'\bcaim[aá]n\b', 'Cayman')

out_segs = []; words = []; t_out = 0.0; last_k = None
for i, (a, b) in enumerate(segs):
    ws = [W[j]['t'] for j in range(len(W)) if assign[j] == i]
    if not ws: continue  # tramo sin palabras = ruido, se corta
    text = ' '.join(ws)
    for p, r in FIX: text = re.sub(p, r, text, flags=re.I)
    clean = []
    for w in text.split():
        k = re.sub(r'[^\wáéíóúñü]', '', w.lower())
        if k in FILLERS: continue
        if k == last_k: continue  # palabra repetida ("traía, traía")
        clean.append(w); last_k = k
    L = b - a
    if clean:
        s0, s1 = PAD_IN, L - PAD_OUT
        wt = [max(2, len(re.sub(r'\W', '', w))) for w in clean]; tot = sum(wt); acc = 0
        for w, x in zip(clean, wt):
            s = s0 + (s1 - s0) * acc / tot; acc += x; e = s0 + (s1 - s0) * acc / tot
            words.append({'text': w, 'start': round(t_out + s, 3), 'end': round(t_out + e, 3)})
    out_segs.append({'from': round(a, 3), 'to': round(b, 3), 'text': ' '.join(clean)})
    t_out += L

os.makedirs(os.path.join(ROOT, 'public', 'data'), exist_ok=True)
out = os.path.join(ROOT, 'public', 'data', name + '.json')
json.dump({'clip': 'clips/' + os.path.basename(src), 'sourceDuration': round(dur, 3), 'outputDuration': round(t_out, 3),
           'segments': out_segs, 'words': words}, open(out, 'w'), ensure_ascii=False, indent=1)
print(f'{name}: {dur:.1f}s -> {t_out:.1f}s, {len(out_segs)} tramos')
for s in out_segs: print(f"  {s['from']:6.2f}-{s['to']:6.2f} {s['text']}")
