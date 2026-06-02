import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LIROY — Legenda. Bunt. Przyszłość.",
  description: "Oficjalna strona LIROYA — legendy polskiego rapu, byłego posła, ikony kultury.",
  openGraph: {
    title: "LIROY — Legenda. Bunt. Przyszłość.",
    description: "Oficjalna strona LIROYA.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`h-full ${bebasNeue.variable}`}>
      <body className="min-h-full bg-black">{children}</body>
    </html>
  );
}
