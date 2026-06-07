"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

function useCountUp(target: number, inView: boolean, duration = 2400) {
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
  {
    value: 1500000,
    format: (v: number) => `~${(v / 1000000).toFixed(1).replace(".", ",")} MLN`,
    label: "płyt sprzedanych",
  },
  {
    value: 500000,
    format: (v: number) => `${(v / 1000).toFixed(0)}K+`,
    label: "egzemplarzy Alboom",
  },
  {
    value: 4,
    format: (v: number) => `${v}`,
    label: "Fryderyki",
  },
  {
    value: 1995,
    format: (v: number) => `${v}`,
    label: "rok przełomu",
  },
  {
    value: 44,
    format: (v: number) => `${v}`,
    label: "lata w rapie",
  },
  {
    value: 1,
    format: (v: number) => `${v}`,
    label: "ustawa która zmieniła życie pacjentów",
  },
];

function StatBig({ stat, inView }: { stat: typeof STATS[0]; inView: boolean }) {
  const v = useCountUp(stat.value, inView);
  return (
    <div className="flex flex-col items-center text-center py-8 px-4 border-b border-white/8 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <span
        className="font-bebas text-white leading-none mb-2"
        style={{ fontSize: "clamp(48px, 7vw, 100px)" }}
      >
        {stat.format(v)}
      </span>
      <span className="text-white/25 text-[10px] tracking-[0.35em] uppercase max-w-[140px] leading-relaxed">
        {stat.label}
      </span>
    </div>
  );
}

export default function LiroyLiczby() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="liczby"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0a0a0a 0%, #050505 50%, #0c0900 100%)" }}
    >
      {/* Gold top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(201,168,76,0.20)" }} />

      {/* Background text watermark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
      >
        <span
          className="font-bebas leading-none text-white/[0.02]"
          style={{ fontSize: "40vw" }}
        >
          1982
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
        <div className="text-center mb-16">
          <h2
            className="font-bebas text-[#C9A84C] leading-none"
            style={{ fontSize: "clamp(52px, 10vw, 130px)" }}
          >
            LICZBY NIE KŁAMIĄ
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-[#C9A84C]" />
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border border-white/8"
        >
          {STATS.map((stat) => (
            <StatBig key={stat.label} stat={stat} inView={inView} />
          ))}
        </div>
      </div>

      {/* Gold bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "rgba(201,168,76,0.10)" }} />
    </section>
  );
}
