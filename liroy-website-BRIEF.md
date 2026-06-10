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
| `PressKitClient.tsx` | Bio prasowe, 3 pliki do pobrania (CDN Shopify), kontakt Manager@liroy.pl (Dorota Liroy-Marzec, 791 742 606), linki oficjalne | tło: kontakt-bg.mp4 (opacity 0.18, reuse z nazwy S8) |

Wejścia: (1) przycisk CTA gold w `S8_Kontakt`, (2) link „Materiały dla mediów →" w stopce `S8_Kontakt`. Brak w głównej nawigacji (świadomie — materiały dla branży, nie publiczności).

Kontakt na całej stronie ujednolicony na Manager@liroy.pl — booking@liroy.pl i media@liroy.pl usunięte (06.2026).

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
