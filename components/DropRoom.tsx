"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { ShopifyProduct } from "@/lib/shopify";

const ZONES = [
  { label: "95 OG",   handle: "95-og"  },
  { label: "SZTOS",   handle: "sztos"  },
  { label: "LiROYAL", handle: "liroyal"},
  { label: "LEGACY",  handle: "legacy" },
  { label: "MUZYKA",  handle: "muzyka" },
] as const;

function formatPrice(product: ShopifyProduct): string {
  const { amount, currencyCode } = product.priceRange.minVariantPrice;
  const num = parseFloat(amount);
  if (currencyCode === "PLN") return `${num.toFixed(2)} zł`;
  return `${num.toFixed(2)} ${currencyCode}`;
}

function ProductCard({ product }: { product: ShopifyProduct }) {
  const image = product.images.edges[0]?.node;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col bg-[#0d0d0d] border border-white/[0.07] rounded-xl overflow-hidden hover:border-[rgba(202,138,4,0.4)] transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#111]">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-[#222] text-4xl font-black"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              L
            </span>
          </div>
        )}

        {product.isPreorder && (
          <div className="absolute top-2 left-2">
            <span
              className="text-[9px] font-black tracking-[0.25em] px-2 py-1 bg-[#ca8a04] text-black rounded uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              PRE-ORDER
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="text-[#f5f5f5] text-sm font-bold leading-tight mb-1 flex-1"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.02em" }}
        >
          {product.title}
        </h3>
        <div className="flex items-center justify-between mt-3 gap-2">
          <span
            className="text-[#ca8a04] font-black text-base tabular-nums"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {formatPrice(product)}
          </span>
          <a
            href={`https://shop.liroy.pl/products/${product.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className={
              product.isPreorder
                ? "flex-shrink-0 text-[9px] font-black tracking-[0.25em] px-4 py-2 bg-[#ca8a04] text-black hover:bg-[#b07803] transition-all duration-200 cursor-pointer uppercase"
                : "flex-shrink-0 text-[9px] font-black tracking-[0.25em] px-4 py-2 border border-white/20 text-[#f5f5f5] hover:border-[#ca8a04] hover:text-[#ca8a04] transition-all duration-200 cursor-pointer uppercase"
            }
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {product.isPreorder ? "ZAMÓW TERAZ" : "KUP"}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyZone({ handle }: { handle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="col-span-full flex flex-col items-center justify-center py-24 gap-6"
    >
      <div
        className="text-[6rem] leading-none select-none font-black text-transparent"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          WebkitTextStroke: "1px rgba(202,138,4,0.2)",
        }}
      >
        {handle.toUpperCase()}
      </div>
      <p
        className="text-[#444] text-xs tracking-[0.4em] uppercase"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
      >
        WKRÓTCE
      </p>
      <div className="w-px h-10 bg-[rgba(202,138,4,0.2)]" />
      <p
        className="text-[#333] text-[11px] tracking-[0.2em] uppercase"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        Drop zapowiedziany. Bądź gotowy.
      </p>
    </motion.div>
  );
}

export default function DropRoom() {
  const [activeZone, setActiveZone] = useState(0);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchZone = useCallback(async (handle: string) => {
    setLoading(true);
    setProducts([]);
    try {
      const res = await fetch(`/api/collection/${handle}`);
      if (!res.ok) throw new Error("fetch failed");
      const data: ShopifyProduct[] = await res.json();
      setProducts(data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchZone(ZONES[activeZone].handle);
  }, [activeZone, fetchZone]);

  return (
    <section id="drop" className="bg-[#080808] py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <span
            className="text-[10px] tracking-[0.5em] text-[#444] uppercase block mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
          >
            SKLEP
          </span>
          <h2
            className="text-[#f5f5f5]"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
            }}
          >
            DROP ROOM
          </h2>
          <p
            className="mt-4 text-[#555] text-sm tracking-wide"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
          >
            Wybierz strefę. Wejdź w klimat.
          </p>
        </div>

        {/* Zone tabs */}
        <div className="flex gap-1 mb-10 overflow-x-auto pb-2">
          {ZONES.map((zone, i) => (
            <button
              key={zone.handle}
              onClick={() => setActiveZone(i)}
              className={`flex-shrink-0 px-5 py-2.5 text-xs font-black tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer border ${
                activeZone === i
                  ? "bg-[#ca8a04] text-black border-[#ca8a04]"
                  : "bg-transparent text-[#555] border-white/[0.08] hover:text-[#f5f5f5] hover:border-white/20"
              }`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              aria-pressed={activeZone === i}
            >
              {zone.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-[#111] animate-pulse"
                />
              ))}
            </motion.div>
          ) : products.length > 0 ? (
            <motion.div
              key={ZONES[activeZone].handle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`empty-${ZONES[activeZone].handle}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1"
            >
              <EmptyZone handle={ZONES[activeZone].label} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shop CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href="https://shop.liroy.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 border border-white/10 text-[#555] hover:border-[#ca8a04] hover:text-[#ca8a04] font-black tracking-[0.2em] text-xs transition-all duration-300 cursor-pointer uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            PEŁNY SKLEP
            <span className="text-base">&#8599;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
