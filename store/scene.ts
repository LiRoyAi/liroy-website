import { create } from "zustand";

interface SceneState {
  mouseX: number;
  mouseY: number;
  scrollY: number;
  heroProgress: number; // 0..1
  setMouse: (x: number, y: number) => void;
  setScroll: (y: number, progress: number) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  mouseX: 0,
  mouseY: 0,
  scrollY: 0,
  heroProgress: 0,
  setMouse: (x, y) => set({ mouseX: x, mouseY: y }),
  setScroll: (scrollY, heroProgress) => set({ scrollY, heroProgress }),
}));
