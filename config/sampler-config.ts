export interface Track {
  beat: string;
  bpm: number;
}

export interface PadDef {
  id: number;
  label: string;
  src: string;
}

export interface SamplerConfig {
  currentCampaign: string;
  tracks: Record<string, Track>;
  pads: PadDef[];
}

const samplerConfig: SamplerConfig = {
  currentCampaign: "L7",
  tracks: {
    "L7":    { beat: "/audio/L7-beat.wav",    bpm: 95 },
    "95-OG": { beat: "/audio/95OG-beat.wav",  bpm: 90 },
    "SZTOS": { beat: "/audio/SZTOS-beat.wav", bpm: 92 },
  },
  pads: [
    { id: 0,  label: "ALBOOM VOCAL",  src: "/samples/alboom/vocal-1.wav"        },
    { id: 1,  label: "DRUM BREAK",    src: "/samples/alboom/drum-break.wav"     },
    { id: 2,  label: "SCRATCH",       src: "/samples/alboom/scratch.wav"        },
    { id: 3,  label: "HI-HAT",        src: "/samples/alboom/hihat.wav"          },
    { id: 4,  label: "PM COOL LOOP",  src: "/samples/pm-cool-lee/loop.wav"      },
    { id: 5,  label: "KICK",          src: "/samples/pm-cool-lee/kick.wav"      },
    { id: 6,  label: "SNARE",         src: "/samples/pm-cool-lee/snare.wav"     },
    { id: 7,  label: "BASS",          src: "/samples/pm-cool-lee/bass.wav"      },
    { id: 8,  label: "L7 VOCAL",      src: "/samples/l7/vocal.wav"             },
    { id: 9,  label: "L7 HOOK",       src: "/samples/l7/hook.wav"              },
    { id: 10, label: "L7 BREAK",      src: "/samples/l7/break.wav"             },
    { id: 11, label: "808",           src: "/samples/l7/808.wav"               },
    { id: 12, label: "SZTOS VOCAL",   src: "/samples/sztos/vocal.wav"          },
    { id: 13, label: "SZTOS LOOP",    src: "/samples/sztos/loop.wav"           },
    { id: 14, label: "SZTOS PERC",    src: "/samples/sztos/perc.wav"           },
    { id: 15, label: "FX STAB",       src: "/samples/sztos/fx-stab.wav"        },
  ],
};

export default samplerConfig;
