import type { Metadata } from "next";
import LiroyPageNav from "@/components/liroy/LiroyPageNav";
import LiroyHero from "@/components/liroy/LiroyHero";
import LiroyKielce from "@/components/liroy/LiroyKielce";
import LiroyDyskografia from "@/components/liroy/LiroyDyskografia";
import LiroyScena from "@/components/liroy/LiroyScena";
import LiroyBackstage from "@/components/liroy/LiroyBackstage";
import LiroyFilmTV from "@/components/liroy/LiroyFilmTV";
import LiroyFilmografia from "@/components/liroy/LiroyFilmografia";
import LiroyNagrody from "@/components/liroy/LiroyNagrody";
import LiroyParliament from "@/components/liroy/LiroyParliament";
import LiroyLiczby from "@/components/liroy/LiroyLiczby";
import LiroyTVSection from "@/components/liroy/LiroyTVSection";

export const metadata: Metadata = {
  title: "Piotr Liroy-Marzec — Raper. Producent. Poseł.",
  description:
    "Pełna biografia Piotra Liroya-Marzec — legendy polskiego hip-hopu, czterokrotnego laureata Fryderyka, byłego posła na Sejm RP. Dyskografia, filmografia, działalność parlamentarna.",
  openGraph: {
    title: "Piotr Liroy-Marzec — Raper. Producent. Poseł.",
    description: "Oficjalna biografia LIROYA.",
    type: "website",
  },
};

export default function LiroyPage() {
  return (
    <main className="bg-black">
      <LiroyPageNav />
      {/* S1 — Hero */}
      <LiroyHero />
      {/* S2 — Kielce 1982 */}
      <LiroyKielce />
      {/* S3 — Dyskografia */}
      <LiroyDyskografia />
      {/* S4 — Scena */}
      <LiroyScena />
      {/* S5 — Backstage */}
      <LiroyBackstage />
      {/* S6 — Muzyka filmowa & TV */}
      <LiroyFilmTV />
      {/* S7 — Filmografia */}
      <LiroyFilmografia />
      {/* S8 — Nagrody */}
      <LiroyNagrody />
      {/* S9 — Parlament */}
      <LiroyParliament />
      {/* S10 — Liczby */}
      <LiroyLiczby />
      {/* S11 — LIROY TV */}
      <LiroyTVSection />
    </main>
  );
}
