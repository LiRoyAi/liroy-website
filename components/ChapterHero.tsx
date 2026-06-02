"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ChapterHero() {
  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Autoplay video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/l7-logo.png"
      >
        <source src="/video/Anim Logo2.mp4" type="video/mp4" />
      </video>

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black pointer-events-none" />
      {/* Top gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/l7-logo.png"
            alt="L7"
            width={280}
            height={280}
            priority
            className="w-[min(40vw,280px)] h-auto drop-shadow-2xl"
          />
        </motion.div>

        <motion.p
          animate={{ opacity: [0.9, 0.2, 0.9] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/60 tracking-[0.5em] text-[10px] md:text-xs font-light uppercase"
        >
          Scroll to Discover
        </motion.p>
      </div>
    </section>
  );
}
