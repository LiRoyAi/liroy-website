import NewNavbar from "@/components/NewNavbar";
import ChapterHero from "@/components/ChapterHero";
import ChapterKielce from "@/components/ChapterKielce";
import ChapterScena from "@/components/ChapterScena";
import ChapterMuzyka from "@/components/ChapterMuzyka";
import ChapterDrop from "@/components/ChapterDrop";
import ChapterKontakt from "@/components/ChapterKontakt";

export default function Home() {
  return (
    <main className="bg-black">
      <NewNavbar />
      <ChapterHero />
      <ChapterKielce />
      <ChapterScena />
      <ChapterMuzyka />
      <ChapterDrop />
      <ChapterKontakt />
    </main>
  );
}
