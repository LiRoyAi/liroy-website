"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const SOCIALS = [
  { label: "YouTube",   href: "https://www.youtube.com/@liroyPolska" },
  { label: "Spotify",   href: "https://open.spotify.com/artist/1YNJc03EgclUK2rnLX7tE5" },
  { label: "Instagram", href: "https://www.instagram.com/liroy_marzec" },
  { label: "Facebook",  href: "https://www.facebook.com/LiroyPolska" },
  { label: "TikTok",    href: "https://www.tiktok.com/@liroypolska" },
];

export default function S8_Kontakt() {
  // showVideo is always false on SSR → poster image; set true on desktop after mount
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const isMobile =
      window.innerWidth < 768 || navigator.maxTouchPoints > 1;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isMobile && !reduced) {
      setShowVideo(true);
    }
  }, []);

  return (
    <section
      id="kontakt"
      className="relative min-h-screen overflow-hidden bg-black flex flex-col items-center justify-end pb-16"
    >
      {/* ─── Background layer ───────────────────────────────────────────── */}
      <div className="absolute inset-0">
        {showVideo ? (
          /* Desktop: looping drone video */
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/video/kontakt-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover object-center"
            aria-hidden="true"
          >
            <source src="/video/dron-sady-tlo.mp4" type="video/mp4" />
          </video>
        ) : (
          /* Mobile / prefers-reduced-motion / SSR: static poster */
          <Image
            src="/video/kontakt-poster.jpg"
            alt="Kielce nocą z lotu ptaka"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        )}

        {/* Dark gradient overlay — text stays readable, gold accent at top */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.72) 35%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0.28) 100%)",
          }}
        />
        {/* Subtle gold shimmer along the very top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "rgba(201,168,76,0.18)" }}
        />
      </div>

      {/* ─── Content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Contact */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-12 flex-wrap items-start">
            <div>
              <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase mb-2">
                Booking / Kontakt
              </p>
              <p className="text-white/50 text-xs tracking-widest mb-1">
                Dorota Liroy-Marzec
              </p>
              <a
                href="tel:+48791742606"
                className="text-white/70 hover:text-white transition-colors text-sm tracking-widest block mb-1"
              >
                791 742 606
              </a>
              <a
                href="mailto:Manager@liroy.pl"
                className="text-white/70 hover:text-white transition-colors text-sm tracking-widest"
              >
                Manager@liroy.pl
              </a>
            </div>
            <div className="hidden sm:block w-px bg-white/10 self-stretch" />
            <div>
              <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase mb-2">
                Press Kit / EPK
              </p>
              <Link
                href="/press-kit"
                className="text-white/70 hover:text-[#C9A84C] transition-colors text-sm tracking-widest"
              >
                Materiały dla mediów →
              </Link>
            </div>
          </div>

          {/* Press Kit CTA */}
          <div className="mb-12">
            <Link
              href="/press-kit"
              className="inline-block border border-[#C9A84C]/60 text-[#C9A84C] px-10 py-4 text-[10px] tracking-[0.35em] uppercase hover:bg-[#C9A84C] hover:text-black transition-all duration-300 font-bebas"
            >
              Press Kit / EPK — Materiały dla organizatorów i mediów →
            </Link>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap items-center justify-center gap-5 mb-12">
            {SOCIALS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-[#C9A84C] transition-colors duration-200 text-[10px] tracking-[0.3em] uppercase font-bebas"
              >
                {label}
              </a>
            ))}
          </div>

          <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
            © {new Date().getFullYear()} Piotr Liroy-Marzec. Wszelkie prawa
            zastrzeżone.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
