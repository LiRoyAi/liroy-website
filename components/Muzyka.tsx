"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

const RELEASE_DATE = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

function useCountdown(target: Date) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return time;
}


const streamingLinks = [
  {
    label: "SPOTIFY",
    href: "https://open.spotify.com/artist/1YNJc03EgclUK2rnLX7tE5",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    label: "APPLE MUSIC",
    href: "https://music.apple.com/pl/artist/liroy/295315959",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a6.673 6.673 0 0 0-1.769-.75c-.65-.148-1.3-.21-1.95-.227-.195-.007-.39-.01-.584-.013H6.73c-.195.003-.39.006-.584.013-.65.017-1.3.079-1.95.227a6.673 6.673 0 0 0-1.769.75C1.308 1.624.563 2.624.246 3.934a9.23 9.23 0 0 0-.24 2.19C.002 6.32 0 6.516 0 6.712v10.576c0 .196.002.392.006.588a9.23 9.23 0 0 0 .24 2.19c.317 1.31 1.062 2.31 2.18 3.043a6.673 6.673 0 0 0 1.769.75c.65.148 1.3.21 1.95.227.194.007.389.01.584.013h10.542c.195-.003.39-.006.584-.013.65-.017 1.3-.079 1.95-.227a6.673 6.673 0 0 0 1.769-.75c1.118-.733 1.863-1.733 2.18-3.043a9.23 9.23 0 0 0 .24-2.19c.004-.196.006-.392.006-.588V6.712c0-.196-.002-.392-.006-.588zM8.007 18.607a1.16 1.16 0 0 1-1.144-1.175V6.568a1.16 1.16 0 0 1 1.144-1.175c.23 0 .458.069.653.203l8.04 5.432a1.168 1.168 0 0 1 0 1.944l-8.04 5.432a1.16 1.16 0 0 1-.653.203z" />
      </svg>
    ),
  },
];

export default function Muzyka() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const time = useCountdown(RELEASE_DATE);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section id="muzyka" ref={ref} className="relative bg-[#080808] py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Background photo — full bleed, vertical fade top/bottom */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/muzyka-bg.webp"
          alt=""
          fill
          className="object-cover object-center"
          style={{ filter: "brightness(0.35) grayscale(15%)" }}
          sizes="100vw"
        />
        {/* Top fade — from dark above */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, #080808 0%, transparent 20%)",
          }}
        />
        {/* Bottom fade — to dark below */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, #080808 0%, transparent 20%)",
          }}
        />
        {/* Gold glow accent */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(202,138,4,0.06) 0%, transparent 70%)",
          }}
        />
      </div>
      {/* All content above background */}
      <div className="relative z-10">

      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <span
          className="text-[10px] tracking-[0.5em] text-[#444] uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
        >
          MUZYKA
        </span>
      </motion.div>

      {/* Section description */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-[#555] text-base sm:text-lg max-w-2xl mb-16 leading-relaxed"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500, letterSpacing: "0.04em" }}
      >
        Ponad trzy dekady muzyki. Od Alboomu po L7 &mdash; każda płyta to dokument czasów.{" "}
        <span className="text-[#888]">Słuchaj na wszystkich platformach.</span>
      </motion.p>

      {/* Featured L7 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl border border-[#ca8a04] bg-[#0a0a08] p-8 md:p-12 mb-12 overflow-hidden"
        style={{ boxShadow: "0 0 60px rgba(202,138,4,0.12), inset 0 0 60px rgba(202,138,4,0.04)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(202,138,4,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Album art — L7 logo */}
          <div
            className="aspect-square rounded-xl flex items-center justify-center max-w-xs mx-auto md:mx-0 p-10"
            style={{
              background: "linear-gradient(135deg, #1a1508 0%, #0a0a08 50%, #1a0808 100%)",
              border: "1px solid rgba(202,138,4,0.2)",
            }}
          >
            <Image
              src="/images/l7-logo.png"
              alt="L7"
              width={290}
              height={200}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          <div>
            <div
              className="text-[#ca8a04] text-xs tracking-[0.4em] mb-3 uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
            >
              NOWY ALBUM
            </div>
            <div className="mb-1">
              <Image
                src="/images/l7-logo.png"
                alt="L7"
                width={290}
                height={200}
                className="object-contain"
                style={{ maxHeight: "clamp(3rem, 8vw, 6rem)", width: "auto" }}
              />
            </div>
            <p className="text-[#888] text-sm mb-8">LIROY &amp; DJ HWR &middot; 2026</p>

            {/* Countdown */}
            <div className="mb-8">
              <div
                className="text-[10px] tracking-[0.4em] text-[#555] uppercase mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
              >
                WINYL L7 &mdash; PREMIERA
              </div>
              <div className="flex gap-4">
                {[
                  { val: pad(time.d), label: "DNI" },
                  { val: pad(time.h), label: "GODZ" },
                  { val: pad(time.m), label: "MIN" },
                  { val: pad(time.s), label: "SEK" },
                ].map(({ val, label }) => (
                  <div key={label} className="text-center">
                    <div
                      className="text-[#ca8a04] tabular-nums"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 900,
                        fontSize: "clamp(1.8rem, 4vw, 3rem)",
                        lineHeight: 1,
                      }}
                    >
                      {val}
                    </div>
                    <div
                      className="text-[#444] text-[9px] tracking-widest mt-1"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Streaming links */}
            <div className="flex flex-wrap gap-3">
              {streamingLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#ca8a04] text-[#ca8a04] hover:bg-[#ca8a04] hover:text-black transition-all duration-300 cursor-pointer text-xs font-bold tracking-widest"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {icon}
                  {label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>


      </div>{/* end z-10 wrapper */}
    </section>
  );
}
