"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ChapterKielce() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="historia"
      ref={sectionRef}
      className="relative grain-overlay min-h-screen w-full overflow-hidden bg-black flex items-center"
    >
      {/* Giant 1982 — outline only */}
      <div
        aria-hidden="true"
        className="absolute z-[2] left-0 top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none font-bebas"
        style={{
          fontSize: "clamp(120px, 30vw, 480px)",
          WebkitTextStroke: "1.5px rgba(255,255,255,0.15)",
          color: "transparent",
          lineHeight: 0.85,
          paddingLeft: "4vw",
        }}
      >
        1982
      </div>

      {/* Right side photo — parallax */}
      <motion.div
        className="absolute z-[2] right-0 top-0 w-[55%] md:w-[50%] h-full"
        style={{ y: photoY }}
      >
        <Image
          src="/images/Kielce-2.jpg"
          alt="Kielce — początki"
          fill
          className="object-cover"
          sizes="55vw"
        />
        {/* Fade left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        {/* Dim */}
        <div className="absolute inset-0 bg-black/25" />
      </motion.div>

      {/* Text block */}
      <div className="relative z-10 px-[5vw] max-w-[50vw] md:max-w-[40vw]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="text-xs tracking-[0.4em] text-[#C9A84C] mb-6 uppercase">
            Kielce, Polska
          </p>
          <p
            className="text-white/80 leading-relaxed"
            style={{ fontSize: "clamp(14px, 1.8vw, 20px)" }}
          >
            Zaczęło się w Kielcach.
            <br />
            Zanim był internet, zanim był streaming —<br />
            było życie na ulicy i mikrofon.
          </p>
          <p
            className="mt-4 font-bebas text-[#C9A84C]"
            style={{ fontSize: "clamp(20px, 3vw, 40px)", letterSpacing: "0.05em" }}
          >
            Od 1982.
          </p>
        </motion.div>
      </div>

      {/* Bottom gradient into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
