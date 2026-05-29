"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setVisible(y > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled
              ? "bg-[rgba(8,8,8,0.92)] backdrop-blur-md border-b border-white/[0.06]"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="font-['Barlow_Condensed'] font-black text-2xl tracking-widest text-[#ca8a04] hover:text-[#fbbf24] transition-colors duration-200 cursor-pointer"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.15em" }}
            >
              LIROY
            </Link>

            <div className="flex items-center gap-8">
              {[
                { label: "MUZYKA", href: "#muzyka" },
                { label: "TV", href: "/tv" },
                { label: "SKLEP", href: "https://shop.liroy.pl", external: true },
                { label: "KONTAKT", href: "#kontakt" },
              ].map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold tracking-[0.2em] text-[#888] hover:text-[#ca8a04] transition-colors duration-200 cursor-pointer"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-xs font-semibold tracking-[0.2em] text-[#888] hover:text-[#ca8a04] transition-colors duration-200 cursor-pointer"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
