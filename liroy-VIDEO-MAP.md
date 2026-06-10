# LIROY VIDEO MAP

Rejestr filmów osadzonych na stronie oraz plików wideo w `public/video/`.

---

## 🎬 YouTube — osadzone embedy (youtube-nocookie)

### ✅ AKTYWNE

| Video ID | Tytuł (YouTube) | Gdzie osadzone |
|---|---|---|
| `fkyDHiXxXZI` | LIROY - SKACZCIE DO GÓRY (1997) | Strona główna — blok rocznicowy «L» (`L1997_Anniversary.tsx`) + /tv TELEDYSKI |
| `LNTA_jN8Jcw` | Liroy — Pierwszy występ w Telewizji (Lalamido 1993) | /tv TELEDYSKI (`YouTubeCurated.tsx`) |
| `OeOhjjz4Vwg` | LiROY — PKiN wręczenie platynowej płyty 1995 | /tv TELEDYSKI (`YouTubeCurated.tsx`) |
| `nZ4h-1nihHw` | Liroy — Moja Autobiografia VIDEO | /tv TELEDYSKI + S7_TVTeaser (strona główna) |
| `o7XS3H9_n24` | LiROY — XXXI ROCZNICA WYDANIA PŁYTY "SCYZORYK" EP | Strona główna — blok rocznicowy «Scyzoryk» (`L1997_Anniversary.tsx` → `ScyzorykAlboomBlock`) + /tv TELEDYSKI + S7_TVTeaser |
| `Q7ym_R8QnAU` | LIROY & DJ HWR – ZŁOŚĆ feat. PiH, KABE [Official Teaser] | /tv TELEDYSKI (`YouTubeCurated.tsx`) |
| `kuGisaXOKOE` | Koncert Kielce | /tv KONCERTY (`YouTubeCurated.tsx`) |
| `wdQep96v0zA` | Koncert Kielce | /tv KONCERTY (`YouTubeCurated.tsx`) |
| `na8YNKJFFKU` | Koncert Kielce | /tv KONCERTY (`YouTubeCurated.tsx`) |
| `JeD8dbjpk7I` | Koncert Kielce | /tv KONCERTY (`YouTubeCurated.tsx`) |
| `DM2QRqt8xqQ` | Koncert Kielce | /tv BACKSTAGE (`YouTubeCurated.tsx`) |
| `t2oz61xBkrs` | Redman koncert Warszawa Progresja | /tv BACKSTAGE (`YouTubeCurated.tsx`) |
| `SrtXMa02rfk` | Redman koncert Warszawa Progresja | /tv BACKSTAGE (`YouTubeCurated.tsx`) |

### 🚫 EMBARGO

| Video ID | Powód |
|---|---|
| `c9rBCq5ubKY` | **EMBARGO — nie osadzać** (L7, 2025) |

> Wszystkie embedy z kanału LiROY POLSKA (UCc1B3_xRUtFtC2SMQH5-bBg), youtube-nocookie.

### ❌ USUNIĘTE (stare martwe ID-y — zastąpione 06.2026)

Wszystkie poniższe zwracały HTTP 404 w YouTube oEmbed API — filmy usunięte przez wrzucających.

| Stare ID | Był label | Sekcja |
|---|---|---|
| `3VvmcLFxro0` | Teledysk #1 | TELEDYSKI + S7_TVTeaser |
| `PH_5YoosihA` | Teledysk #2 | TELEDYSKI |
| `B3-7VM_UNFg` | Czas na Boom Bap! | TELEDYSKI + S7_TVTeaser |
| `UWP4h8ZfkZA` | Kampania | TELEDYSKI |
| `AsdPs3_ckOc` | Klasyk | TELEDYSKI |
| `s5AjCMEWCTQ` | L7 — Trailer | TELEDYSKI |
| `j2uW8lTyL0Y` | Scyzoryk / L Niño | KONCERTY + S7_TVTeaser |
| `URKfbeoEO4M` | Autobiografia | KONCERTY |
| `V1bybztTLgM` | Impreza / Śleboda | KONCERTY |
| `UNPQsjl042c` | Twoja Córka | KONCERTY |
| `bPWxSD8hPXA` | Backstage #1 | BACKSTAGE |
| `JlnJkzwyrsQ` | Backstage #2 | BACKSTAGE |
| `jlsYDbZnnmo` | Backstage #3 | BACKSTAGE |

---

## 📁 public/video/ — pliki lokalne (wszystkie zwykłe git blobs, bez LFS)

| Plik | Rozmiar | Gdzie używany |
|---|---|---|
| `anim-logo2.mp4` | 9.5 MB | `HeroCanvas.tsx` — animowane logo hero (strona główna) |
| `hero-korytarz-tlo.mp4` | 1.1 MB | `LiroyHero.tsx` — tło hero /liroy (Ul. Młoda korytarz, 25s, CRF 24) |
| `dron-sady-tlo.mp4` | 4.5 MB | `LiroyKielce.tsx` — tło sekcji Kielce 1982 (fragment 1:57–2:24 z SADY) |
| `muzyka-l7-tlo.mp4` | 16 MB | `S4_MuzykaL7.tsx` — tło sekcji L7 (22s, CRF 24) |
| `dron-sady-tlo.mp4` | 4.5 MB | `S8_Kontakt.tsx` — tło sekcji Kontakt/Footer |
| `dron-nocny-tlo.mp4` | 2.6 MB | `LiroyTVSection.tsx` tab DRONY — Kielce nocna jazda (25s, CRF 22) |
| `dron-ulica-gory.mp4` | 3.4 MB | `LiroyTVSection.tsx` tab DRONY — Kielce z góry |
| `ferrari-3.mp4` | 8.5 MB | `LiroyTVSection.tsx` tab SESJE — karta Ferrari (z audio, CRF 21) |
| `porsche-maria.mp4` | 7.9 MB | `LiroyTVSection.tsx` tab SESJE — karta Porsche (fragment 31:40–32:23, 43s, CRF 22) |
| `kontakt-bg.mp4` | 494 KB | `PressKitClient.tsx` — /press-kit HERO, opacity **0.45** (NIE 0.18). TYLKO ten plik — S8_Kontakt używa `dron-sady-tlo.mp4` |
| `kontakt-bg.webm` | — | Fallback do kontakt-bg.mp4. Aktualnie nielinkowany w kodzie (PressKitClient używa tylko .mp4). Zostawiony jako rezerwa. |
| `kontakt-poster.jpg` | 22 KB | `S8_Kontakt.tsx` — poster fallback |
| `LiROY - Czas na Boom Bap!.mp4` | — | Tracked, wdrażany na Vercel, **ale nielinkowany w kodzie** (grep = 0). Zachowany świadomie (decyzja Liroy). Nie usuwać jako martwy. |

## 🗄️ Źródła surowe (gitignored, lokalne tylko)

| Plik | Rozmiar | Uwagi |
|---|---|---|
| `public/video/Ujęcie w Porshe z Marią.mp4` | 1.3 GB | Oryginał Porsche. Gitignored. Fragment 31:40–32:23 → `porsche-maria.mp4` |
| `_video_src/` (katalog) | — | Inne surowe źródła (>50 MB). Gitignored. |

## ⚠️ PRESS KIT — PLIKI NA CDN SHOPIFY

Trzy pliki hostowane na cdn.shopify.com (NIE repo, NIE Vercel). Base: https://cdn.shopify.com/s/files/1/0920/0595/8016/files/

- Press Kit PDF (1,76MB): LIROY_PRESS_KIT_2026_FINAL_FRAMED_LAYOUT_V2_SHOPIFY_PRINT.pdf?v=1779539093
- Zdjecia+logo ZIP (17,4MB): LIROY_PRESS_KIT_2026_FINAL_FRAMED_LAYOUT_V2_PACKAGE.zip?v=1779538901
- Rider koncertowy PDF (152KB, 2 strony): LIROY_Rider_Koncertowy_2strony.pdf?v=1779539147

KRUCHOSC: podmiana pliku w Shopify zmienia ?v= → linki w PressKitClient.tsx padaja (404). Po kazdej aktualizacji: pobrac nowy URL z Shopify (page handle: press-kit) i podmienic w PressKitClient.tsx.

---

## Zasady (stan 06.2026)

- Reguła: wyłącznie `.mp4` jako zwykłe git blobs, **< 50 MB**.
- Brak LFS — wrangler/Vercel nie serwuje LFS (text/plain zamiast video/mp4).
- Pliki `.mov` — gitignored (`public/video/*.mov`).
- Pliki >50 MB — do `_video_src/` (gitignored) lub na R2/CDN (osobna decyzja).
- Przed dodaniem nowego embeda YouTube → sprawdzić listę embarg powyżej (embargo: `c9rBCq5ubKY`).

---

## CZYSTOSC public/video/ — LEKCJA PORZADKOWA (sesja 06.2026)

W `public/video/` trzymamy WYLACZNIE pliki uzywane na produkcji (git-tracked, objete negacjami w `.vercelignore`). Surowki i materialy zrodlowe NIE trafiaja tutaj — ida do `_video_src/` (gitignored, poza zasiegiem Vercela).

**Blad do unikniecia:** surowki, koncerty, wystepy i pliki AI ladowaly jako untracked w `public/video/`. `.vercelignore` chronil produkcje (negacje tylko dla wybranych plikow), ale lokalnie zalegalo 1 GB+ smieci. Materialy zastapione YouTube embedami tez nie maja byc w `public/video/` — sa na YT, lokalnie zbedne.

**Bezpieczne czyszczenie untracked smieci (NIE rusza plikow tracked):**

```sh
git clean -n -d public/video/   # dry run — pokazuje co usunie
git clean -f -d public/video/   # usuwa tylko untracked
```

**Stan po czyszczeniu (12 plikow tracked, wszystkie .vercelignore-negated):**
`anim-logo2.mp4`, `dron-nocny-tlo.mp4`, `dron-sady-tlo.mp4`, `dron-ulica-gory.mp4`, `ferrari-3.mp4`, `hero-korytarz-tlo.mp4`, `kontakt-bg.mp4`, `kontakt-bg.webm`, `kontakt-poster.jpg`, `muzyka-l7-tlo.mp4`, `porsche-maria.mp4`, `LiROY - Czas na Boom Bap!.mp4`

**UWAGI:**
- `LiROY - Czas na Boom Bap!.mp4` — tracked, wdrażany na Vercel, ale NIE linkowany w kodzie (grep = 0). ZACHOWANY SWIADOMIE (decyzja Liroy). Nie usuwac jako martwy.
- `kontakt-bg.webm` — fallback do `kontakt-bg.mp4`, aktualnie nielinkowany w kodzie (PressKitClient uzywa tylko .mp4). Zostawiony jako rezerwa.
- `dron-ulica-gory.mp4` — tracked i linkowany (grep = 1), aktywny.
