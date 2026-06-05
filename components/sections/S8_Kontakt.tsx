"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
            {/* WebM first — smaller, better quality on modern browsers */}
            <source src="/video/kontakt-bg.webm" type="video/webm" />
            <source src="/video/kontakt-bg.mp4"  type="video/mp4" />
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
          {/* Contact emails */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-12">
            <div>
              <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase mb-2">
                Booking
              </p>
              <a
                href="mailto:booking@liroy.pl"
                className="text-white/70 hover:text-white transition-colors text-sm tracking-widest"
              >
                booking@liroy.pl
              </a>
            </div>
            <div className="hidden sm:block w-px bg-white/10" />
            <div>
              <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase mb-2">
                Media
              </p>
              <a
                href="mailto:media@liroy.pl"
                className="text-white/70 hover:text-white transition-colors text-sm tracking-widest"
              >
                media@liroy.pl
              </a>
            </div>
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
