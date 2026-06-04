"use client";

import { create } from "zustand";

interface SamplerState {
  activePads: number[];
  displayText: string;
  currentCampaign: string;
  isRecording: boolean;
  volume: number;
  beatVolume: number;

  triggerPad: (id: number, label: string) => void;
  releasePad: (id: number) => void;
  setCampaign: (name: string) => void;
  setRecording: (v: boolean) => void;
  setVolume: (v: number) => void;
  setBeatVolume: (v: number) => void;
  setDisplay: (text: string) => void;
}

export const useSamplerStore = create<SamplerState>((set) => ({
  activePads: [],
  displayText: "LIROY SP-1200",
  currentCampaign: "L7",
  isRecording: false,
  volume: 0.85,
  beatVolume: 0.55,

  triggerPad: (id, label) =>
    set((s) => ({
      activePads: s.activePads.includes(id) ? s.activePads : [...s.activePads, id],
      displayText: label,
    })),

  releasePad: (id) =>
    set((s) => ({
      activePads: s.activePads.filter((p) => p !== id),
    })),

  setCampaign: (name) => set({ currentCampaign: name, displayText: `BEAT: ${name}` }),
  setRecording: (v) => set({ isRecording: v, displayText: v ? "● REC" : "LIROY SP-1200" }),
  setVolume: (v) => set({ volume: v }),
  setBeatVolume: (v) => set({ beatVolume: v }),
  setDisplay: (text) => set({ displayText: text }),
}));
