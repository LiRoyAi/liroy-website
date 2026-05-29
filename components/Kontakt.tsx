"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function AppleMusicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a6.673 6.673 0 0 0-1.769-.75c-.65-.148-1.3-.21-1.95-.227-.195-.007-.39-.01-.584-.013H6.73c-.195.003-.39.006-.584.013-.65.017-1.3.079-1.95.227a6.673 6.673 0 0 0-1.769.75C1.308 1.624.563 2.624.246 3.934a9.23 9.23 0 0 0-.24 2.19C.002 6.32 0 6.516 0 6.712v10.576c0 .196.002.392.006.588a9.23 9.23 0 0 0 .24 2.19c.317 1.31 1.062 2.31 2.18 3.043a6.673 6.673 0 0 0 1.769.75c.65.148 1.3.21 1.95.227.194.007.389.01.584.013h10.542c.195-.003.39-.006.584-.013.65-.017 1.3-.079 1.95-.227a6.673 6.673 0 0 0 1.769-.75c1.118-.733 1.863-1.733 2.18-3.043a9.23 9.23 0 0 0 .24-2.19c.004-.196.006-.392.006-.588V6.712c0-.196-.002-.392-.006-.588zM8.007 18.607a1.16 1.16 0 0 1-1.144-1.175V6.568a1.16 1.16 0 0 1 1.144-1.175c.23 0 .458.069.653.203l8.04 5.432a1.168 1.168 0 0 1 0 1.944l-8.04 5.432a1.16 1.16 0 0 1-.653.203z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const socials = [
  { Icon: YouTubeIcon, href: "https://www.youtube.com/@liroyPolska", label: "YouTube" },
  { Icon: SpotifyIcon, href: "https://open.spotify.com/artist/1YNJc03EgclUK2rnLX7tE5", label: "Spotify" },
  { Icon: AppleMusicIcon, href: "https://music.apple.com/pl/artist/liroy/295315959", label: "Apple Music" },
  { Icon: InstagramIcon, href: "https://www.instagram.com/liroy_marzec", label: "Instagram" },
  { Icon: FacebookIcon, href: "https://www.facebook.com/LiroyPolska", label: "Facebook" },
  { Icon: TikTokIcon, href: "https://www.tiktok.com/@liroypolska", label: "TikTok" },
];

const contacts = [
  { type: "BOOKING", email: "booking@liroy.pl" },
  { type: "MEDIA", email: "media@liroy.pl" },
];

export default function Kontakt() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="kontakt" ref={ref} className="bg-[#080808] py-32 px-6 md:px-16 lg:px-24 border-t border-white/[0.05]">
      <div className="max-w-3xl">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span
            className="text-[10px] tracking-[0.5em] text-[#444] uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
          >
            KONTAKT
          </span>
        </motion.div>

        {/* Contact rows */}
        <div className="space-y-10 mb-12">
          {contacts.map(({ type, email }, i) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/[0.06] pb-8"
            >
              <span
                className="text-[#444] text-xs tracking-[0.4em] uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
              >
                {type}
              </span>
              <a
                href={`mailto:${email}`}
                className="text-[#f5f5f5] hover:text-[#ca8a04] transition-colors duration-200 cursor-pointer text-lg sm:text-2xl font-black tracking-wide"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {email}
              </a>
            </motion.div>
          ))}

          {/* Press Kit row */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/[0.06] pb-8"
          >
            <span
              className="text-[#444] text-xs tracking-[0.4em] uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
            >
              PRESS KIT
            </span>
            <a
              href="https://shop.liroy.pl/pages/press-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5f5f5] hover:text-[#ca8a04] transition-colors duration-200 cursor-pointer text-lg sm:text-2xl font-black tracking-wide"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Pobierz &rarr;
            </a>
          </motion.div>
        </div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center gap-2 mb-16"
        >
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[#444] hover:text-[#ca8a04] transition-colors duration-200 cursor-pointer p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Icon />
            </a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[#2a2a2a] text-xs tracking-[0.2em]"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          &copy; 2026 LIROY. Wszelkie prawa zastrzeżone.
        </motion.p>
      </div>
    </section>
  );
}
