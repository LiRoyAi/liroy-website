"use client";

import { useState, useEffect } from "react";
import YouTubeEmbed from "@/components/liroy/YouTubeEmbed";

// ── Feature flag ──────────────────────────────────────────────────────────────
// Set to false to disable both ribbon and block instantly (no deploy needed).
const SHOW_L_ANNIVERSARY = true;
// Auto-hide after June 9 2026 (inclusive). Change to extend.
const ANNIVERSARY_END = new Date("2026-06-10T00:00:00");

function anniversaryActive(): boolean {
  if (!SHOW_L_ANNIVERSARY) return false;
  return new Date() < ANNIVERSARY_END;
}

// ── Ribbon ────────────────────────────────────────────────────────────────────

export function L1997Ribbon() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem("l1997-ribbon-dismissed") === "1") {
      setDismissed(true);
    }
  }, []);

  if (!mounted || dismissed || !anniversaryActive()) return null;

  const dismiss = () => {
    localStorage.setItem("l1997-ribbon-dismissed", "1");
    setDismissed(true);
  };

  const scrollToBlock = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("l-1997")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5 border-b"
      style={{
        background:
          "linear-gradient(90deg, #080600 0%, #0e0b02 40%, #0e0b02 60%, #080600 100%)",
        borderColor: "rgba(201,168,76,0.22)",
      }}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="flex-shrink-0 text-base leading-none">🏆</span>
        <p className="text-[11px] tracking-[0.12em] font-mono leading-tight min-w-0">
          <span className="text-[#C9A84C] font-semibold">
            29 lat albumu «L» (1997)
          </span>
          <span className="text-[#C9A84C]/50"> — </span>
          <a
            href="#l-1997"
            onClick={scrollToBlock}
            className="text-[#C9A84C]/70 underline underline-offset-2 decoration-[#C9A84C]/30 hover:text-[#C9A84C] transition-colors whitespace-nowrap"
          >
            zobacz teledysk «Skaczcie do góry»
          </a>
        </p>
      </div>

      <button
        onClick={dismiss}
        aria-label="Zamknij pasek rocznicowy"
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded transition-colors hover:bg-white/5"
        style={{ color: "rgba(201,168,76,0.35)", fontSize: "18px", lineHeight: 1 }}
      >
        ×
      </button>
    </div>
  );
}

// ── Anniversary block (merged: animated cover hero + official teledysk) ───────

export function L1997Block() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted || !anniversaryActive()) return null;

  return (
    <section
      id="l-1997"
      className="relative py-20 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #040300 0%, #080600 60%, #040300 100%)",
      }}
    >
      {/* Top gold separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.4) 40%, rgba(201,168,76,0.4) 60%, transparent 100%)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Category badge */}
        <div className="flex items-center gap-3 mb-10">
          <div
            className="px-3 py-1 text-[9px] tracking-[0.45em] uppercase font-mono border"
            style={{
              color: "#C9A84C",
              borderColor: "rgba(201,168,76,0.28)",
              background: "rgba(201,168,76,0.05)",
            }}
          >
            ALBUM L · 1997
          </div>
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(201,168,76,0.1)" }}
          />
          <span
            className="text-[9px] tracking-[0.3em] font-mono uppercase"
            style={{ color: "rgba(201,168,76,0.3)" }}
          >
            29. ROCZNICA
          </span>
        </div>

        {/* ── Main visual: animated cover (hero, centered) ── */}
        <div className="flex flex-col items-center mb-12">
          <p
            className="text-[9px] tracking-[0.4em] uppercase font-mono mb-3"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Ożywiona okładka · rocznicowy loop
          </p>
          <div className="w-full max-w-[520px]">
            <YouTubeEmbed
              videoId="pANRU4n8SVY"
              label="29 lat albumu «L» — ożywiona okładka"
              sublabel="LiROY · 6.06.1997"
              aspectRatio="1/1"
              poster="https://img.youtube.com/vi/pANRU4n8SVY/hqdefault.jpg"
            />
          </div>
          <a
            href="https://youtube.com/shorts/pANRU4n8SVY"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-mono transition-colors duration-200"
            style={{ color: "rgba(201,168,76,0.5)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#C9A84C")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(201,168,76,0.5)")
            }
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Zobacz na YouTube
          </a>
        </div>

        {/* ── Divider ── */}
        <div
          className="w-full h-px mb-12"
          style={{ background: "rgba(201,168,76,0.1)" }}
        />

        {/* ── Details grid: text left, official teledysk right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: text + awards */}
          <div>
            <h2
              className="font-bebas tracking-wider leading-none mb-2"
              style={{
                fontSize: "clamp(52px, 8vw, 76px)",
                color: "#C9A84C",
              }}
            >
              «L» — 29 LAT
            </h2>
            <p
              className="text-[11px] tracking-[0.38em] uppercase font-mono mb-8"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              6.06.1997 · drugi album studyjny
            </p>

            {/* Award badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div
                className="flex items-center gap-2.5 px-3 py-2.5 border"
                style={{
                  borderColor: "rgba(201,168,76,0.22)",
                  background: "rgba(201,168,76,0.04)",
                }}
              >
                <span className="text-xl leading-none">🏆</span>
                <div>
                  <p
                    className="text-[10px] font-mono tracking-[0.28em] uppercase"
                    style={{ color: "#C9A84C" }}
                  >
                    FRYDERYK 1997
                  </p>
                  <p
                    className="text-[9px] tracking-wide mt-0.5"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Najlepszy album rap / hip-hop
                  </p>
                </div>
              </div>

              <div
                className="flex items-center gap-2.5 px-3 py-2.5 border"
                style={{
                  borderColor: "rgba(201,168,76,0.22)",
                  background: "rgba(201,168,76,0.04)",
                }}
              >
                <span className="text-xl leading-none">💿</span>
                <div>
                  <p
                    className="text-[10px] font-mono tracking-[0.28em] uppercase"
                    style={{ color: "#C9A84C" }}
                  >
                    ZŁOTA PŁYTA
                  </p>
                  <p
                    className="text-[9px] tracking-wide mt-0.5"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Certyfikat złotej płyty
                  </p>
                </div>
              </div>
            </div>

            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.5)", maxWidth: "360px" }}
            >
              Drugi album studyjny Liroya, wydany 6 czerwca 1997. Zdobył Fryderyka
              w kategorii najlepszego albumu rap/hip-hop roku — jeden z najważniejszych
              momentów w historii polskiego hip-hopu.
            </p>
          </div>

          {/* Right: official teledysk (secondary) */}
          <div>
            <p
              className="text-[9px] tracking-[0.4em] uppercase font-mono mb-3"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Oficjalny teledysk · 1997
            </p>
            <YouTubeEmbed
              videoId="fkyDHiXxXZI"
              label="Liroy — Skaczcie do góry (oficjalny teledysk, 1997)"
              sublabel="LIROY POLSKA · YouTube"
            />
          </div>
        </div>
      </div>

      {/* Bottom gold separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.18) 50%, transparent 100%)",
        }}
      />
    </section>
  );
}
