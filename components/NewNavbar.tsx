"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "HISTORIA", href: "#historia" },
  { label: "SCENA", href: "#scena" },
  { label: "MUZYKA", href: "#muzyka" },
  { label: "DROP", href: "#drop" },
  { label: "KONTAKT", href: "#kontakt" },
];

const EXTERNAL_LINKS = [
  { label: "LIROY", href: "/liroy" },
];

export default function NewNavbar() {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > 80);
      setScrolled(y > 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
            scrolled
              ? "bg-black/90 backdrop-blur-md border-b border-white/5"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <a
              href="#hero"
              onClick={(e) => handleNav(e, "#hero")}
              className="flex items-center gap-3"
            >
              <Image
                src="/images/l7-logo.png"
                alt="LIROY"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
              />
              <span
                className="font-bebas text-xl tracking-[0.15em] text-[#C9A84C]"
              >
                LIROY
              </span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href)}
                  className="text-[10px] font-semibold tracking-[0.25em] text-white/50 hover:text-[#C9A84C] transition-colors duration-200 cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
              <div className="w-px h-4 bg-white/10" />
              {EXTERNAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[10px] font-semibold tracking-[0.25em] text-[#C9A84C]/70 hover:text-[#C9A84C] transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
