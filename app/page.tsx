import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Historia from "@/components/Historia";
import Muzyka from "@/components/Muzyka";
import Sygnal from "@/components/Sygnal";
import Sklep from "@/components/Sklep";
import LiroyTV from "@/components/LiroyTV";
import Kontakt from "@/components/Kontakt";

export default function Home() {
  return (
    <main className="bg-[#080808]">
      <Navbar />
      <Hero />
      <Historia />
      <Muzyka />
      <Sygnal />
      <Sklep />
      <LiroyTV />
      <Kontakt />
    </main>
  );
}
