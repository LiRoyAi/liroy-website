import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Historia from "@/components/Historia";
import Dyskografia from "@/components/Dyskografia";
import Muzyka from "@/components/Muzyka";
import Sygnal from "@/components/Sygnal";
import DropRoom from "@/components/DropRoom";
import Sklep from "@/components/Sklep";
import LiroyTV from "@/components/LiroyTV";
import Kontakt from "@/components/Kontakt";

export default function Home() {
  return (
    <main className="bg-[#080808]">
      <Navbar />
      <Hero />
      <Historia />
      <Dyskografia />
      <Muzyka />
      <Sygnal />
      <DropRoom />
      <Sklep />
      <LiroyTV />
      <Kontakt />
    </main>
  );
}
