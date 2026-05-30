import type { Metadata } from "next";
import Link from "next/link";
import DropRoom from "@/components/DropRoom";

export const metadata: Metadata = {
  title: "DROP ROOM — LIROY Official Store",
  description: "Oficjalny sklep Liroya. Odzież, muzyka, akcesoria. 95 OG / SZTOS / LiROYAL / LEGACY / MUZYKA.",
};

export default function DropPage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Back nav */}
      <div className="px-6 md:px-16 lg:px-24 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#555] hover:text-[#ca8a04] transition-colors duration-200 cursor-pointer text-sm tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
        >
          <span>&larr;</span>
          POWRÓT
        </Link>
      </div>

      <DropRoom />
    </div>
  );
}
