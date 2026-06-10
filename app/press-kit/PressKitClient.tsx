"use client";

import { Component, ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

class VideoBgBoundary extends Component<{ children: ReactNode }, { err: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { err: false };
  }
  static getDerivedStateFromError() {
    return { err: true };
  }
  render() {
    if (this.state.err) return null;
    return this.props.children;
  }
}

function HeroBg() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(true);
    }
  }, []);
  if (!show) return null;
  return (
    /* eslint-disable-next-line jsx-a11y/media-has-caption */
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 w-full h-full object-cover"
      style={{ opacity: 0.18 }}
      aria-hidden="true"
    >
      <source src="/video/kontakt-bg.mp4" type="video/mp4" />
    </video>
  );
}

const DOWNLOADS = [
  {
    label: "Pobierz Press Kit PDF",
    href: "https://cdn.shopify.com/s/files/1/0920/0595/8016/files/LIROY_PRESS_KIT_2026_FINAL_FRAMED_LAYOUT_V2_SHOPIFY_PRINT.pdf?v=1779539093",
  },
  {
    label: "Pobierz zdjęcia i logo (ZIP)",
    href: "https://cdn.shopify.com/s/files/1/0920/0595/8016/files/LIROY_PRESS_KIT_2026_FINAL_FRAMED_LAYOUT_V2_PACKAGE.zip?v=1779538901",
  },
  {
    label: "Pobierz rider koncertowy",
    href: "https://cdn.shopify.com/s/files/1/0920/0595/8016/files/LIROY_Rider_Koncertowy_2strony.pdf?v=1779539147",
  },
];

const MATERIALS = [
  "Press Kit PDF",
  "Zdjęcia prasowe",
  "Logotypy",
  "Rider koncertowy",
  "Gotowe opisy dla organizatorów i mediów",
];

const OFFICIAL_LINKS = [
  { label: "www.liroy.pl", href: "https://www.liroy.pl" },
  { label: "YouTube (@liroyPolska)", href: "https://www.youtube.com/@liroyPolska" },
  { label: "Spotify", href: "https://open.spotify.com/artist/1YNJc03EgclUK2rnLX7tE5" },
  { label: "Apple Music", href: "https://music.apple.com/pl/artist/liroy/295315959?l=pl" },
  { label: "Instagram (@liroy_marzec)", href: "https://www.instagram.com/liroy_marzec" },
  { label: "Facebook (LiroyPolska)", href: "https://www.facebook.com/LiroyPolska" },
  { label: "TikTok (@liroypolska)", href: "https://www.tiktok.com/@liroypolska" },
];

export default function PressKitClient() {
  return (
    <>
      {/* ─── Back nav ────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 py-5 pointer-events-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bebas text-base tracking-[0.2em] text-[#C9A84C] hover:text-white transition-colors duration-200"
          >
            ← LIROY
          </Link>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HERO                                                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center">
        <VideoBgBoundary>
          <HeroBg />
        </VideoBgBoundary>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.93) 0%, rgba(10,8,0,0.76) 50%, rgba(0,0,0,0.93) 100%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "rgba(201,168,76,0.18)" }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#C9A84C] tracking-[0.6em] text-[10px] uppercase mb-6"
          >
            Materiały oficjalne · 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-bebas text-white leading-none mb-6"
            style={{ fontSize: "clamp(52px, 13vw, 160px)", letterSpacing: "0.06em" }}
          >
            PRESS KIT / EPK
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/50 text-xs tracking-[0.25em] uppercase mb-14 max-w-xl"
          >
            Oficjalne materiały dla organizatorów, mediów i grafików
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center"
          >
            {DOWNLOADS.map(({ label, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#C9A84C] text-[#C9A84C] font-bebas px-8 py-4 text-xs tracking-[0.3em] uppercase hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
              >
                {label}
              </a>
            ))}
          </motion.div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to top, #000 0%, transparent 100%)" }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* KIM JEST LIROY                                                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-black py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[#C9A84C] tracking-[0.6em] text-[10px] uppercase mb-6"
          >
            Biogram prasowy
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-bebas text-white leading-none mb-10"
            style={{ fontSize: "clamp(40px, 8vw, 100px)" }}
          >
            Kim jest LiROY
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="border-l-2 border-[#C9A84C]/30 pl-8"
          >
            <p
              className="text-white/60 leading-relaxed"
              style={{ fontSize: "clamp(14px, 1.5vw, 17px)" }}
            >
              LiROY, właściwie Piotr Liroy-Marzec, to ojciec i protoplasta polskiego rapu — artysta, który jako pierwszy przebił się z rapem do masowej świadomości, otwierając drogę nie tylko samemu gatunkowi muzycznemu, ale całej kulturze Hip-Hop w Polsce. Swoją drogę rozpoczął już w 1982 roku, na długo zanim rap i Hip-Hop stały się w Polsce zjawiskiem rozpoznawalnym. Przez wiele lat był postacią absolutnie pionierską — pierwszą i samotną na froncie gatunku, który później stał się jednym z najważniejszych nurtów muzycznych w kraju. Debiutancki album „Alboom" sprzedał się w nakładzie przekraczającym 500 000 egzemplarzy, ustanawiając rekord wszech czasów polskiego rapu. Łączna sprzedaż płyt LiROY-a sięga blisko 1,5 miliona egzemplarzy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ALBUM L7                                                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28 px-6 overflow-hidden"
        style={{ background: "#080808" }}
      >
        <div
          aria-hidden="true"
          className="absolute right-[3vw] top-1/2 -translate-y-1/2 font-bebas pointer-events-none select-none"
          style={{
            fontSize: "clamp(120px, 30vw, 480px)",
            WebkitTextStroke: "1.5px rgba(201,168,76,0.08)",
            color: "transparent",
            lineHeight: 1,
          }}
        >
          L7
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[#C9A84C] tracking-[0.6em] text-[10px] uppercase mb-6"
          >
            Aktualny etap
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-bebas text-white leading-none mb-10"
            style={{ fontSize: "clamp(40px, 8vw, 100px)" }}
          >
            Album «L7»<br />i aktualny etap
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/60 leading-relaxed"
            style={{ fontSize: "clamp(14px, 1.5vw, 17px)" }}
          >
            Album „L7", nagrany wspólnie z DJ-em HWR, otworzył kolejny etap w historii LiROY-a — powrót do autorskiego, bezkompromisowego rapu i przypomnienie, że jego muzyka nie jest wyłącznie częścią historii, ale nadal żyje na scenie. Po premierze „L7" i trasie koncertowej LiROY kontynuuje nowy etap twórczy. W 2026 roku spodziewana jest kolejna płyta, zapowiadająca następny rozdział jego muzycznej historii.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MATERIAŁY W PAKIECIE                                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-black py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[#C9A84C] tracking-[0.6em] text-[10px] uppercase mb-6"
          >
            Co znajdziesz w pakiecie
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-bebas text-white leading-none mb-12"
            style={{ fontSize: "clamp(40px, 8vw, 100px)" }}
          >
            Materiały w pakiecie
          </motion.h2>

          <div className="flex flex-col gap-0">
            {MATERIALS.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex items-center gap-5 py-4 border-b border-white/8"
              >
                <div className="w-2 h-2 rounded-full bg-[#C9A84C] flex-shrink-0" />
                <span className="text-white/70 tracking-[0.15em] text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* KONTAKT BOOKING                                                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28 px-6"
        style={{ background: "#080808" }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "rgba(201,168,76,0.15)" }}
        />

        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[#C9A84C] tracking-[0.6em] text-[10px] uppercase mb-6"
          >
            Organizatorzy i media
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-bebas text-white leading-none mb-12"
            style={{ fontSize: "clamp(40px, 8vw, 100px)" }}
          >
            Kontakt booking
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="border border-white/8 p-8"
          >
            <p className="font-bebas text-white tracking-[0.15em] text-2xl mb-8">
              Dorota Liroy-Marzec
            </p>

            <div className="flex flex-col sm:flex-row gap-8">
              <div>
                <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase mb-2">
                  Telefon
                </p>
                <a
                  href="tel:+48791742606"
                  className="text-white/70 hover:text-white transition-colors text-sm tracking-widest"
                >
                  791 742 606
                </a>
              </div>
              <div className="hidden sm:block w-px bg-white/10" />
              <div>
                <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase mb-2">
                  E-mail
                </p>
                <a
                  href="mailto:Manager@liroy.pl"
                  className="text-white/70 hover:text-white transition-colors text-sm tracking-widest"
                >
                  Manager@liroy.pl
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* LINKI OFICJALNE                                                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-black py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[#C9A84C] tracking-[0.6em] text-[10px] uppercase mb-6"
          >
            Sieć
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-bebas text-white leading-none mb-12"
            style={{ fontSize: "clamp(40px, 8vw, 100px)" }}
          >
            Linki oficjalne
          </motion.h2>

          <div className="border-t border-white/8">
            {OFFICIAL_LINKS.map(({ label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                viewport={{ once: true }}
                className="flex items-center justify-between py-5 border-b border-white/8 group"
              >
                <span className="font-bebas text-white/50 group-hover:text-[#C9A84C] transition-colors duration-200 tracking-[0.15em] text-lg">
                  {label}
                </span>
                <span className="text-[#C9A84C]/40 group-hover:text-[#C9A84C] transition-colors duration-200 text-sm tracking-widest">
                  →
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────────────────────── */}
      <footer className="bg-black border-t border-white/5 py-10 px-6 text-center">
        <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
          © {new Date().getFullYear()} Piotr Liroy-Marzec. Wszelkie prawa zastrzeżone.
        </p>
        <div className="mt-4">
          <Link
            href="/"
            className="text-[#C9A84C]/40 hover:text-[#C9A84C] transition-colors duration-200 font-bebas text-[10px] tracking-[0.3em] uppercase"
          >
            ← Powrót na stronę główną
          </Link>
        </div>
      </footer>
    </>
  );
}
