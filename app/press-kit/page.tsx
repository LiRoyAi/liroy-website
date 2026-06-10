import type { Metadata } from "next";
import PressKitClient from "./PressKitClient";

export const metadata: Metadata = {
  title: "LiROY — Press Kit / EPK",
  description:
    "Oficjalny Press Kit / EPK LiROY-a: bio prasowe, zdjęcia, logo, rider koncertowy, linki oficjalne i kontakt bookingowy dla organizatorów, mediów i grafików.",
};

export default function PressKitPage() {
  return (
    <main className="bg-black">
      <PressKitClient />
    </main>
  );
}
