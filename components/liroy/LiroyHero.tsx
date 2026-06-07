"use client";

import { useRef, useEffect, useState, Component, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(target: number, inView: boolean, duration = 2200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    let raf: number;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, inView, duration]);
  return value;
}

const STATS = [
  { prefix: "~", value: 1500000, suffix: "", label: "sprzedanych płyt", display: (v: number) => `${(v / 1000000).toFixed(1).replace(".", ",")} MLN` },
  { prefix: "", value: 4, suffix: "", label: "Fryderyki", display: (v: number) => `${v}` },
  { prefix: "", value: 44, suffix: "", label: "lata na scenie", display: (v: number) => `${v}` },
  { prefix: "", value: 1, suffix: "", label: "ustawa która zmieniła Polskę", display: (v: number) => `${v}` },
];

function StatItem({ stat, inView }: { stat: typeof STATS[0]; inView: boolean }) {
  const v = useCountUp(stat.value, inView);
  return (
    <div className="flex flex-col items-center text-center px-4">
      <span
        className="font-bebas text-[#C9A84C] leading-none"
        style={{ fontSize: "clamp(36px, 6vw, 80px)" }}
      >
        {stat.prefix}{stat.display(v)}
      </span>
      <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase mt-1 max-w-[120px]">
        {stat.label}
      </span>
    </div>
  );
}

class VideoBgBoundary extends Component<{ children: ReactNode }, { err: boolean }> {
  constructor(props: { children: ReactNode }) { super(props); this.state = { err: false }; }
  static getDerivedStateFromError() { return { err: true }; }
  render() {
    if (this.state.err) return null;
    return this.props.children;
  }
}

function HeroBg() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setShow(true);
  }, []);
  if (!show) return null;
  return (
    /* eslint-disable-next-line jsx-a11y/media-has-caption */
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 w-full h-full object-cover"
      style={{ opacity: 0.18 }}
    >
      <source src="/video/hero-korytarz-tlo.mp4" type="video/mp4" />
    </video>
  );
}

export default function LiroyHero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true });

  return (
    <section id="hero-liroy" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video background */}
      <VideoBgBoundary><HeroBg /></VideoBgBoundary>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#C9A84C] text-[10px] tracking-[0.6em] uppercase mb-6"
        >
          Oficjalna Biografia
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="font-bebas text-white leading-none mb-4"
          style={{ fontSize: "clamp(44px, 10vw, 130px)", letterSpacing: "0.04em" }}
        >
          PIOTR LIROY-MARZEC
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white/50 tracking-[0.3em] text-sm uppercase"
        >
          Raper.&nbsp; Producent.&nbsp; Przedsiębiorca.&nbsp; Poseł.&nbsp; Pionier.
        </motion.p>

        {/* Stats */}
        <div ref={statsRef} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10">
          {STATS.map((stat) => (
            <StatItem key={stat.label} stat={stat} inView={statsInView} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/20" />
        <span className="text-white/20 text-[9px] tracking-[0.4em] uppercase">Scroll</span>
      </div>
    </section>
  );
}
