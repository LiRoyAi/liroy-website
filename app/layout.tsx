import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="pl" className="h-full">
      <body className="min-h-full bg-[#080808]">{children}</body>
    </html>
  );
}
