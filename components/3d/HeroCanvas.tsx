"use client";

import { useRef, useEffect, Component, ReactNode } from "react";
import { useSceneStore } from "@/store/scene";

// ── Error boundary — fallback to static poster on any failure ─────────────────
interface EBState { hasError: boolean }
class HeroErrorBoundary extends Component<{ children: ReactNode }, EBState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="/images/tarcza.png"
          alt="LIROY"
          style={{
            position: "absolute", inset: 0, margin: "auto",
            width: "min(44vw, 340px)", height: "auto", opacity: 0.45,
            mixBlendMode: "screen",
          }}
        />
      );
    }
    return this.props.children;
  }
}

// ── Animated logo — HTML5 video with CSS parallax + spin ─────────────────────
function AnimLogo() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rotZ = 0;
    let lastTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      // 0.25 rad/s ≈ 14.3 deg/s, same rate as original R3F version
      rotZ = (rotZ + delta * 14.32) % 360;

      if (wrapRef.current) {
        const { mouseX, mouseY, heroProgress } = useSceneStore.getState();
        // 0.4 rad parallax ≈ 22.9°
        const rx = mouseY * 22.9;
        const ry = mouseX * 22.9;
        const scale = 1 + heroProgress * 0.8;
        const tz = heroProgress * 120;
        wrapRef.current.style.transform =
          `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rotZ}deg) ` +
          `scale(${scale}) translateZ(${tz}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      style={{ perspective: "700px", display: "flex", alignItems: "center", justifyContent: "center", inset: 0, position: "absolute" }}
    >
      <div
        ref={wrapRef}
        style={{
          width: "min(48vw, 360px)",
          height: "min(48vw, 360px)",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Animated logo video — screen blend makes black transparent */}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/tarcza.png"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            mixBlendMode: "screen",
            display: "block",
          }}
        >
          <source src="/video/anim-logo2.mp4" type="video/mp4" />
          {/* Fallback: static poster already shown by browser if video fails */}
        </video>
      </div>
    </div>
  );
}

// ── HeroCanvas ────────────────────────────────────────────────────────────────
export default function HeroCanvas({ className = "" }: { className?: string }) {
  const setMouse = useSceneStore((s) => s.setMouse);
  const setScroll = useSceneStore((s) => s.setScroll);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      setMouse(
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2
      );
    };
    const onScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      setScroll(window.scrollY, progress);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, [setMouse, setScroll]);

  return (
    <div className={className}>
      <HeroErrorBoundary>
        <AnimLogo />
      </HeroErrorBoundary>
    </div>
  );
}
