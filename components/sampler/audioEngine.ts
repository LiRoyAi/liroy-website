// Module-level Web Audio singletons — client-only
let _ctx: AudioContext | null = null;
let _analyser: AnalyserNode | null = null;
let _masterGain: GainNode | null = null;
let _beatGain: GainNode | null = null;
let _beatSource: AudioBufferSourceNode | null = null;
let _recordingDest: MediaStreamAudioDestinationNode | null = null;
let _mediaRecorder: MediaRecorder | null = null;
let _recordedChunks: Blob[] = [];

const sampleCache = new Map<string, AudioBuffer>();

function boot() {
  if (_ctx) return;
  _ctx = new AudioContext();

  _analyser = _ctx.createAnalyser();
  _analyser.fftSize = 256;
  _analyser.smoothingTimeConstant = 0.82;

  _masterGain = _ctx.createGain();
  _masterGain.gain.value = 0.85;

  _beatGain = _ctx.createGain();
  _beatGain.gain.value = 0.55;

  _beatGain.connect(_masterGain);
  _masterGain.connect(_analyser);
  _analyser.connect(_ctx.destination);

  _recordingDest = _ctx.createMediaStreamDestination();
  _analyser.connect(_recordingDest);
}

export function getAnalyser(): AnalyserNode | null {
  return _analyser;
}

export async function ensureReady() {
  boot();
  if (_ctx!.state === "suspended") await _ctx!.resume();
}

export async function loadSample(src: string): Promise<AudioBuffer | null> {
  if (sampleCache.has(src)) return sampleCache.get(src)!;
  await ensureReady();
  try {
    const res = await fetch(src);
    if (!res.ok) return null;
    const raw = await res.arrayBuffer();
    const decoded = await _ctx!.decodeAudioData(raw);
    sampleCache.set(src, decoded);
    return decoded;
  } catch {
    return null;
  }
}

export async function triggerSample(src: string) {
  await ensureReady();
  const buf = await loadSample(src);
  if (!buf || !_masterGain) return;
  const src_ = _ctx!.createBufferSource();
  src_.buffer = buf;
  src_.connect(_masterGain);
  src_.start();
}

export async function startBeat(beatSrc: string) {
  await ensureReady();
  stopBeat();
  try {
    const res = await fetch(beatSrc);
    if (!res.ok) return;
    const raw = await res.arrayBuffer();
    const buf = await _ctx!.decodeAudioData(raw);
    _beatSource = _ctx!.createBufferSource();
    _beatSource.buffer = buf;
    _beatSource.loop = true;
    _beatSource.connect(_beatGain!);
    _beatSource.start();
  } catch {
    // Placeholder path — file not uploaded yet
  }
}

export function stopBeat() {
  if (_beatSource) {
    try { _beatSource.stop(); } catch { /* already stopped */ }
    _beatSource = null;
  }
}

export function setMasterVolume(v: number) {
  if (_masterGain) _masterGain.gain.value = v;
}

export function setBeatVolume(v: number) {
  if (_beatGain) _beatGain.gain.value = v;
}

export function startRecording() {
  if (!_recordingDest) { boot(); }
  _recordedChunks = [];
  try {
    _mediaRecorder = new MediaRecorder(_recordingDest!.stream);
    _mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) _recordedChunks.push(e.data);
    };
    _mediaRecorder.start(100);
  } catch {
    _mediaRecorder = null;
  }
}

export function stopRecording(): Promise<Blob | null> {
  return new Promise((resolve) => {
    if (!_mediaRecorder) { resolve(null); return; }
    _mediaRecorder.onstop = () => {
      const blob = new Blob(_recordedChunks, { type: "audio/webm" });
      resolve(blob);
    };
    try { _mediaRecorder.stop(); } catch { resolve(null); }
  });
}
