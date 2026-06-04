"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const SOCIALS = [
  { label: "YouTube", href: "https://www.youtube.com/@liroyPolska" },
  { label: "Spotify", href: "https://open.spotify.com/artist/1YNJc03EgclUK2rnLX7tE5" },
  { label: "Instagram", href: "https://www.instagram.com/liroy_marzec" },
  { label: "Facebook", href: "https://www.facebook.com/LiroyPolska" },
  { label: "TikTok", href: "https://www.tiktok.com/@liroypolska" },
];

export default function S8_Kontakt() {
  return (
    <section
      id="kontakt"
      className="relative min-h-screen overflow-hidden bg-black flex flex-col items-center justify-end pb-16"
    >
      {/* Portrait photo */}
      <div className="absolute inset-0">
        <Image
          src="/images/Piotr Liroy Marzec.jpeg"
          alt="Piotr Liroy Marzec"
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/20" />
      </div>

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
              <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase mb-2">Booking</p>
              <a
                href="mailto:booking@liroy.pl"
                className="text-white/70 hover:text-white transition-colors text-sm tracking-widest"
              >
                booking@liroy.pl
              </a>
            </div>
            <div className="hidden sm:block w-px bg-white/10" />
            <div>
              <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase mb-2">Media</p>
              <a
                href="mailto:media@liroy.pl"
                className="text-white/70 hover:text-white transition-colors text-sm tracking-widest"
              >
                media@liroy.pl
              </a>
            </div>
          </div>

          {/* Social links — text-based (no external SVG import) */}
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
            © {new Date().getFullYear()} Piotr Liroy-Marzec. Wszelkie prawa zastrzeżone.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
