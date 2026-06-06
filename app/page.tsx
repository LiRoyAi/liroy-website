import NewNavbar from "@/components/NewNavbar";
import S1_Hero3D from "@/components/sections/S1_Hero3D";
import S2_Biografia from "@/components/sections/S2_Biografia";
import S3_Dysk3D from "@/components/sections/S3_Dysk3D";
import S4_MuzykaL7 from "@/components/sections/S4_MuzykaL7";
import S5_Koncerty from "@/components/sections/S5_Koncerty";
import S6_Drop3D from "@/components/sections/S6_Drop3D";
import S7_TVTeaser from "@/components/sections/S7_TVTeaser";
import S8_Kontakt from "@/components/sections/S8_Kontakt";
import { L1997Ribbon, L1997Block, L1997Spotlight } from "@/components/sections/L1997_Anniversary";

export default function Home() {
  return (
    <main className="bg-black">
      <NewNavbar />
      {/* Anniversary ribbon — album «L» 1997, auto-hides after 9.06.2026 */}
      <L1997Ribbon />
      {/* S1 — Hero 3D (rotating shield, mouse parallax) */}
      <S1_Hero3D />
      {/* Anniversary spotlight — album «L» 1997 (animated cover, 1:1), auto-hides after 9.06.2026 */}
      <L1997Spotlight />
      {/* S2 — Biografia / Kielce 1982 (timeline, parallax photo) */}
      <S2_Biografia />
      {/* S3 — Dyskografia (3D spinning vinyl records) */}
      <S3_Dysk3D />
      {/* S4 — Muzyka L7 (album art 3D card, streaming links) */}
      <S4_MuzykaL7 />
      {/* Anniversary block — album «L» 1997 (odrębny od L7), auto-hides after 9.06.2026 */}
      <L1997Block />
      {/* S5 — Koncerty / 30 lat Alboom (horizontal scroll + 3D mic) */}
      <S5_Koncerty />
      {/* S6 — Drop Room (products with depth) */}
      <S6_Drop3D />
      {/* S7 — LIROY TV teaser (YouTube embeds) */}
      <S7_TVTeaser />
      {/* S8 — Kontakt / Footer */}
      <S8_Kontakt />
    </main>
  );
}
