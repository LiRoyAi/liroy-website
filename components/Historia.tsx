"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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
    text: "Przez ponad 30 lat na scenie udowadnia, że rap to nie trend — to język. Nowy rozdział trwa: album L7 z DJ HWR.",
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

      <DocCard />
    </section>
  );
}

function DocCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-8 md:mx-20 lg:mx-32 mb-20"
    >
      <div
        className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c0c0c] p-8 md:p-12"
        style={{ boxShadow: "0 0 60px rgba(0,0,0,0.6)" }}
      >
        {/* Top bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span
            className="text-[9px] tracking-[0.4em] text-[#444] uppercase px-3 py-1 border border-white/[0.08] rounded-full"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
          >
            FILM DOKUMENTALNY
          </span>
          <span
            className="text-[9px] tracking-[0.3em] text-[#ca8a04] uppercase px-3 py-1 border border-[rgba(202,138,4,0.3)] rounded-full"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
          >
            DOSTĘPNY ONLINE · 9 PLATFORM
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-[#f5f5f5] mb-1 leading-none"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 6vw, 4rem)",
            letterSpacing: "-0.02em",
          }}
        >
          DON&apos;T F**K WITH LIROY
        </h3>

        {/* Meta */}
        <p
          className="text-[#555] text-sm mb-8 tracking-wide"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500, letterSpacing: "0.06em" }}
        >
          2025 &nbsp;&middot;&nbsp; reż. Małgorzata Kowalczyk &nbsp;&middot;&nbsp; Premiera kinowa: 21 marca 2025
        </p>

        {/* Description */}
        <p
          className="text-[#999] text-base leading-relaxed mb-8 max-w-2xl"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500, letterSpacing: "0.03em" }}
        >
          Szczera i osobista spowiedź pioniera polskiego hip-hopu.
          Nie tylko raper &mdash; trudny dzieciak z Kielc, poseł ze swoją misją,
          kochający ojciec.
        </p>

        {/* Ice-T quote */}
        <div className="border-l-2 border-[#ca8a04] pl-6">
          <blockquote
            className="text-[#f5f5f5] italic mb-2"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              letterSpacing: "0.02em",
            }}
          >
            &ldquo;Liroy is OG. Don&apos;t f**k with him.&rdquo;
          </blockquote>
          <cite
            className="text-[#555] text-xs tracking-[0.2em] not-italic uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
          >
            Ice-T
          </cite>
        </div>
      </div>
    </motion.div>
  );
}
