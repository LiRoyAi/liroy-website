"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const MicCanvas = dynamic(() => import("@/components/3d/MicCanvas"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const SLIDES = [
  { src: "/images/Gdynia 30L-11.jpg", city: "GDYNIA" },
  { src: "/images/Lodź 30L-37.jpg", city: "ŁÓDŹ" },
  { src: "/images/Szczecin 30L-55.jpg", city: "SZCZECIN" },
  { src: "/images/Kielce-55.jpg", city: "KIELCE" },
  { src: "/images/L7 (22).jpg", city: "" },
];

function ScenaDesktop() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(SLIDES.length - 1) * 100}vw`]
  );
  const headerY = useTransform(scrollYProgress, [0, 0.12], ["-80px", "0px"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      ref={targetRef}
      style={{ height: `${SLIDES.length * 100}vh` }}
      className="relative bg-black"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 3D Mic — floating right accent */}
        <div className="absolute right-[3vw] top-[10vh] w-[18vw] h-[60vh] z-20 pointer-events-none">
          <MicCanvas className="w-full h-full" />
        </div>

        <motion.div
          className="absolute top-0 left-0 right-0 z-10 px-[5vw] pt-[10vh] pointer-events-none"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <p className="text-[#C9A84C] tracking-[0.5em] text-[10px] uppercase mb-3">
            Live
          </p>
          <h2
            className="font-bebas text-white leading-none"
            style={{ fontSize: "clamp(48px, 11vw, 160px)" }}
          >
            30 LAT ALBOOM
          </h2>
          <p className="text-white/40 mt-2 max-w-lg text-sm">
            1995. Alboom. Pierwsza platyna w historii polskiego hip-hopu.
            30 lat później — wciąż na scenie.
          </p>
        </motion.div>

        <motion.div
          className="flex h-screen"
          style={{ x, width: `${SLIDES.length * 100}vw` }}
        >
          {SLIDES.map((slide, i) => (
            <div key={i} className="relative w-screen h-screen flex-shrink-0">
              <Image
                src={slide.src}
                alt={slide.city || "Trasa 30 lat Alboom"}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-black/35" />
              {slide.city && (
                <span
                  className="absolute bottom-[8vh] left-[5vw] font-bebas text-white leading-none"
                  style={{ fontSize: "clamp(40px, 8vw, 120px)" }}
                >
                  {slide.city}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ScenaMobile() {
  return (
    <div className="bg-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-6 pt-20 pb-8"
      >
        <p className="text-[#C9A84C] tracking-[0.5em] text-[10px] uppercase mb-3">Live</p>
        <h2 className="font-bebas text-white leading-none" style={{ fontSize: "clamp(48px, 15vw, 80px)" }}>
          30 LAT ALBOOM
        </h2>
        <p className="text-white/40 mt-2 text-sm">
          1995 — wciąż na scenie.
        </p>
      </motion.div>
      {SLIDES.map((slide, i) => (
        <motion.div
          key={i}
          className="relative h-[70vw] w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Image
            src={slide.src}
            alt={slide.city || "Trasa"}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
          {slide.city && (
            <span className="absolute bottom-4 left-4 font-bebas text-white text-[12vw] leading-none">
              {slide.city}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default function S5_Koncerty() {
  return (
    <section id="scena">
      <div className="hidden md:block">
        <ScenaDesktop />
      </div>
      <div className="block md:hidden">
        <ScenaMobile />
      </div>
    </section>
  );
}
