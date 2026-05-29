import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LIROY TV — 24/7 Muzyka. Kultura. Bunt.",
  description: "Twoja antena na kulturę bez kompromisów.",
};

export default function TVPage() {
  return (
    <div className="relative min-h-screen bg-[#020202] flex flex-col overflow-hidden scanlines">
      {/* Full-page scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)",
        }}
      />

      {/* Red glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(139,0,0,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Back button */}
      <div className="relative z-20 px-6 md:px-12 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#555] hover:text-[#ca8a04] transition-colors duration-200 cursor-pointer text-sm tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
        >
          <span className="text-base">&larr;</span>
          POWRÓT
        </Link>
      </div>

      {/* Main content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-start px-6 md:px-12 pb-16 pt-10 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="w-full mb-2">
          <div
            className="text-[10px] tracking-[0.5em] text-[#333] uppercase mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
          >
            OFICJALNY KANAŁ
          </div>
          <h1
            className="text-[#ca8a04] leading-none"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(4rem, 14vw, 10rem)",
              letterSpacing: "0.05em",
            }}
          >
            LIROY TV
          </h1>
          <p
            className="text-[#444] text-sm tracking-[0.25em] uppercase mt-2 mb-8"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
          >
            24/7 &mdash; Muzyka. Kultura. Bunt.
          </p>
        </div>

        {/* YouTube embed */}
        <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/[0.07] mb-8 relative">
          <iframe
            src="https://www.youtube.com/embed/videoseries?list=PLplaceholder&autoplay=0&rel=0&modestbranding=1"
            title="LIROY TV — Oficjalny kanał YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
            style={{ border: "none" }}
          />
        </div>

        {/* Description */}
        <p
          className="text-[#555] text-center text-base tracking-wide max-w-xl"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 400, letterSpacing: "0.05em" }}
        >
          Twoja antena na kulturę bez kompromisów.
        </p>

        {/* Live indicator */}
        <div className="flex items-center gap-2 mt-6">
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span
            className="text-[#333] text-[10px] tracking-[0.4em] uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
          >
            24 GODZINY NA DOBĘ
          </span>
        </div>
      </div>
    </div>
  );
}
