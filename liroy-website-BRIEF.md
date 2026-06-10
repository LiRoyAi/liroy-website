# LIROY WEBSITE — BRIEF

Repozytorium: Next.js (App Router), Tailwind CSS, Framer Motion. Hosting: Vercel.
Sklep/CDN: shop.liroy.pl (Shopify, osobna subdomena).

---

## Mapa sekcji / podstron

### Strona główna (/)

| Komponent | Sekcja |
|-----------|--------|
| `LiroyHero.tsx` | Hero z animowanym logo |
| `S2_*` … `S7_*` | Sekcje środkowe (bio, muzyka, TV, itp.) |
| `S8_Kontakt.tsx` | Kontakt / Footer (tło: `dron-sady-tlo.mp4`) |

### /press-kit

| Komponent | Treść | Wideo |
|-----------|-------|-------|
| `PressKitClient.tsx` | Bio prasowe, 3 pliki do pobrania (CDN Shopify), kontakt Manager@liroy.pl (Dorota Liroy-Marzec, 791 742 606), linki oficjalne | tło: kontakt-bg.mp4 (opacity **0.45**, overlay rgba 0.72/0.50/0.72) |

Wejścia: (1) przycisk CTA gold w `S8_Kontakt`, (2) link „Materiały dla mediów →" w stopce `S8_Kontakt`. Brak w głównej nawigacji (świadomie — materiały dla branży, nie publiczności).

Kontakt na całej stronie ujednolicony na Manager@liroy.pl — booking@liroy.pl i media@liroy.pl usunięte (06.2026).

### PRESS KIT — FINALNY STAN (1c8b70f)

- Podstrona /press-kit w pełni live, hero z wideo kontakt-bg.mp4.
- Hero: `min-h-[72vh]` (NIE `min-h-screen` — full screen spychał całą treść pod widok, user musiał zjeżdżać jak na osobną stronę).
- Tło wideo: video opacity 0.45 + overlay `linear-gradient(135deg, rgba(0,0,0,0.72), rgba(10,8,0,0.5), rgba(0,0,0,0.72))`.
  **LEKCJA:** overlay 0.93/0.76 + video opacity 0.18 = czerń (mnożnik tłumienia ×2). Przy ciemnym klipie tła NIE dawać dwóch ciężkich warstw naraz.
- Kontakt na całej stronie: tylko Manager@liroy.pl (Dorota Liroy-Marzec, 791 742 606). booking@/media@ usunięte z całego repo.
- Martwe komponenty usunięte/zignorowane: `Kontakt.tsx` (usunięty), `ChapterKontakt.tsx` (nieimportowany relikt — do sprzątania przy okazji).
- **LEKCJA:** przy szukaniu „znikniętej" treści grepować warianty z myślnikiem (press-kit nie tylko press) i sprawdzać czy treść nie żyje w osobnym systemie. Press Kit cały czas był stroną Shopify (shop.liroy.pl/pages/press-kit, id 711322534272), nie w repo Next.js.

---

## Zasady wideo / learnings

**LEKCJA (sesja porządkowa public/video/, 06.2026):** surowki i materiały źródłowe trzymać w `_video_src/` (gitignored), NIGDY w `public/video/`. `public/video/` = tylko pliki produkcyjne (12 tracked). Czyszczenie untracked śmieci: `git clean -f -d public/video/` (nie rusza tracked). Zwolniło 1 GB+ lokalnie, zero wpływu na repo/produkcję. „Boom Bap" mp4 zachowany świadomie mimo braku linka w kodzie.

---

## ⚠️ PRESS KIT — PLIKI NA CDN SHOPIFY

Trzy pliki hostowane na cdn.shopify.com (NIE repo, NIE Vercel). Base: https://cdn.shopify.com/s/files/1/0920/0595/8016/files/

- Press Kit PDF (1,76MB): LIROY_PRESS_KIT_2026_FINAL_FRAMED_LAYOUT_V2_SHOPIFY_PRINT.pdf?v=1779539093
- Zdjecia+logo ZIP (17,4MB): LIROY_PRESS_KIT_2026_FINAL_FRAMED_LAYOUT_V2_PACKAGE.zip?v=1779538901
- Rider koncertowy PDF (152KB, 2 strony): LIROY_Rider_Koncertowy_2strony.pdf?v=1779539147

KRUCHOSC: podmiana pliku w Shopify zmienia ?v= → linki w PressKitClient.tsx padaja (404). Po kazdej aktualizacji: pobrac nowy URL z Shopify (page handle: press-kit) i podmienic w PressKitClient.tsx.

---

## Historia „zniknietego" Press Kitu

Byl strona Shopify (shop.liroy.pl/pages/press-kit), nie czescia repo. Stary `components/Kontakt.tsx` (relikt, odpiety przy refaktorze na `S8_Kontakt`) linkowal na Shopify. Rozwiazanie: natywna /press-kit w Next.js, pliki zostaja na CDN Shopify, Kontakt.tsx usuniety. Learning: przy „znikniętych" tresciach grepowac warianty z myslnikiem (press-kit nie tylko press) i sprawdzac czy tresc nie zyje w osobnym systemie (Shopify pod inna subdomena).
