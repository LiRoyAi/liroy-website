"use client";

import { useEffect, useRef } from "react";
import { getAnalyser } from "./audioEngine";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

const BARS = 48;
const GOLD = "#C9A84C";

function drawIdle(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const t = Date.now() / 1200;
  const barW = (W / BARS) * 0.65;
  const gap = (W / BARS) * 0.35;
  for (let i = 0; i < BARS; i++) {
    const v = (Math.sin(i * 0.35 + t * 2.2) * 0.5 + 0.5) * 0.12;
    const bH = v * H;
    ctx.fillStyle = "rgba(201,168,76,0.18)";
    ctx.fillRect(i * (barW + gap), H - bH, barW, bH);
  }
  // center line
  ctx.strokeStyle = "rgba(201,168,76,0.08)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, H / 2);
  ctx.lineTo(W, H / 2);
  ctx.stroke();
}

export default function SamplerCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw() {
      if (!canvas || !ctx) return;
      rafRef.current = requestAnimationFrame(draw);

      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      // Trail fade
      ctx.fillStyle = "rgba(0,0,0,0.75)";
      ctx.fillRect(0, 0, W, H);

      const analyser = getAnalyser();
      if (!analyser) {
        drawIdle(ctx, W, H);
        return;
      }

      const freqData = new Uint8Array(analyser.frequencyBinCount);
      const waveData = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(freqData);
      analyser.getByteTimeDomainData(waveData);

      const barW = (W / BARS) * 0.65;
      const gap = (W / BARS) * 0.35;
      const step = Math.floor(freqData.length / BARS);

      // EQ bars
      for (let i = 0; i < BARS; i++) {
        const val = freqData[i * step] / 255;
        const bH = val * H * 0.75;
        const x = i * (barW + gap);
        const y = H - bH;

        const g = ctx.createLinearGradient(0, y, 0, H);
        g.addColorStop(0, `rgba(201,168,76,${0.85 + val * 0.15})`);
        g.addColorStop(0.5, "rgba(180,80,10,0.7)");
        g.addColorStop(1, "rgba(100,0,0,0.3)");
        ctx.fillStyle = g;
        ctx.fillRect(x, y, barW, bH);

        // peak cap
        if (val > 0.85) {
          ctx.fillStyle = "#fff";
          ctx.fillRect(x, y - 2, barW, 2);
        }

        // emit particles on loud bars
        if (val > 0.65 && Math.random() < 0.25) {
          particles.current.push({
            x: x + barW / 2,
            y,
            vx: (Math.random() - 0.5) * 2.5,
            vy: -(Math.random() * 4 + 1),
            life: 1,
            size: Math.random() * 3 + 1,
          });
        }
      }

      // Waveform overlay
      ctx.save();
      ctx.strokeStyle = "rgba(201,168,76,0.35)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const sliceW = W / waveData.length;
      for (let i = 0; i < waveData.length; i++) {
        const x = i * sliceW;
        const y = ((waveData[i] / 128) - 1) * (H * 0.18) + H * 0.5;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // Particles
      const ps = particles.current;
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.life -= 0.025;
        if (p.life <= 0) { ps.splice(i, 1); continue; }
        ctx.globalAlpha = p.life * 0.9;
        ctx.fillStyle = GOLD;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
    />
  );
}
