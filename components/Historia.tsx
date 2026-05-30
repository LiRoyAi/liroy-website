"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const events = [
  {
    year: "1982",
    text: "Grudzień 1982. W domowych warunkach w Kielcach powstaje pierwszy polski utwór rap. Nikt jeszcze nie wiedział, że to początek rewolucji.",
    image: "/images/hist-1982.webp",
    imageAlt: "Liroy — portret klasyczny",
  },
  {
    year: "1995",
    text: "Alboom sprzedał się w nakładzie ponad 500 000 egzemplarzy — jedna z najlepiej sprzedających się polskich płyt w historii. Nie był to przypadek. To był manifest.",
    image: "/images/hist-1995.webp",
    imageAlt: "Liroy na koncercie — zbliżenie",
  },
  {
    year: "2015",
    text: "Producent, przedsiębiorca, artysta, poseł. Człowiek, który zawsze mówi wprost — na scenie i poza nią. Bo ktoś musi.",
    image: null,
    imageAlt: null,
  },
  {
    year: "2026",
    text: "Przez ponad 30 lat na scenie udowadnia, że rap to nie trend — to język. Nowy rozdział trwa: album L7 z DJ HWR i film dokumentalny \"Don't F**k with Liroy\" (2025, reż. Małgorzata Kowalczyk).",
    image: "/images/hist-2026.webp",
    imageAlt: "Liroy — kontakt z tłumem, Kielce",
  },
];

function TimelineItem({
  year,
  text,
  image,
  imageAlt,
  index,
}: {
  year: string;
  text: string;
  image: string | null;
  imageAlt: string | null;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -60 : 60, 0]);
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const imgOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const isRight = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="min-h-[80vh] flex flex-col justify-center px-8 md:px-20 lg:px-32 relative"
    >
      {/* Background photo — subtle, full-width, fades in with scroll */}
      {image && (
        <motion.div
          style={{ opacity: imgOpacity }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            className="object-cover"
            style={{
              objectPosition: "center center",
              filter: "grayscale(30%)",
            }}
            sizes="100vw"
          />
          {/* Strong overlay to keep text legible and design dark */}
          <div
            className="absolute inset-0"
            style={{
              background: isRight
                ? "linear-gradient(to left, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.92) 55%, rgba(8,8,8,0.98) 100%)"
                : "linear-gradient(to right, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.92) 55%, rgba(8,8,8,0.98) 100%)",
            }}
          />
        </motion.div>
      )}

      <motion.div
        style={{ x }}
        className={`relative z-10 flex flex-col ${isRight ? "items-end" : "items-start"}`}
      >
        {/* Outline year */}
        <div
          className="leading-none select-none"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(7rem, 22vw, 18rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(202,138,4,0.3)",
            lineHeight: 0.85,
          }}
        >
          {year}
        </div>

        {/* Text */}
        <p
          className={`mt-4 text-[#f5f5f5] text-base sm:text-lg md:text-xl max-w-lg leading-relaxed ${isRight ? "text-right" : "text-left"}`}
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.03em",
          }}
        >
          {text}
        </p>

        {/* Animated gold line */}
        <div
          className={`mt-4 overflow-hidden ${isRight ? "flex justify-end" : ""}`}
          style={{ maxWidth: "300px" }}
        >
          <motion.div className="h-px bg-[#ca8a04]" style={{ width: lineWidth }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Historia() {
  return (
    <section id="historia" className="bg-[#080808] py-20 relative">
      <div className="sticky top-20 z-20 px-8 md:px-20 pointer-events-none">
        <span
          className="text-[10px] tracking-[0.5em] text-[#333] uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
        >
          HISTORIA
        </span>
      </div>

      {events.map((e, i) => (
        <TimelineItem
          key={e.year}
          year={e.year}
          text={e.text}
          image={e.image}
          imageAlt={e.imageAlt}
          index={i}
        />
      ))}
    </section>
  );
}
