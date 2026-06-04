"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "1982", href: "#kielce" },
  { label: "DYSKOGRAFIA", href: "#dyskografia" },
  { label: "SCENA", href: "#scena" },
  { label: "PARLAMENT", href: "#parlament" },
  { label: "TV", href: "#liroy-tv" },
];

export default function LiroyPageNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/5"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/L7_LP_Front_Cover.png"
            alt="LIROY"
            width={1600}
            height={1600}
            className="w-8 h-8 object-contain"
          />
          <span className="font-bebas text-lg tracking-[0.15em] text-[#C9A84C] group-hover:text-white transition-colors">
            LIROY
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNav(e, item.href)}
              className="text-[10px] font-semibold tracking-[0.25em] text-white/40 hover:text-[#C9A84C] transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/drop"
            className="text-[10px] font-semibold tracking-[0.25em] text-white/40 hover:text-[#C9A84C] transition-colors duration-200"
          >
            SKLEP
          </Link>
        </div>
      </div>
    </nav>
  );
}
