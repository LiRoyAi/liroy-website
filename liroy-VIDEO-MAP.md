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
| `kontakt-bg.mp4` | 494 KB | zapasowy zasób (legacy) |
| `kontakt-poster.jpg` | 22 KB | `S8_Kontakt.tsx` — poster fallback |

## 🗄️ Źródła surowe (gitignored, lokalne tylko)

| Plik | Rozmiar | Uwagi |
|---|---|---|
| `public/video/Ujęcie w Porshe z Marią.mp4` | 1.3 GB | Oryginał Porsche. Gitignored. Fragment 31:40–32:23 → `porsche-maria.mp4` |
| `_video_src/` (katalog) | — | Inne surowe źródła (>50 MB). Gitignored. |

## Zasady (stan 06.2026)

- Reguła: wyłącznie `.mp4` jako zwykłe git blobs, **< 50 MB**.
- Brak LFS — wrangler/Vercel nie serwuje LFS (text/plain zamiast video/mp4).
- Pliki `.mov` — gitignored (`public/video/*.mov`).
- Pliki >50 MB — do `_video_src/` (gitignored) lub na R2/CDN (osobna decyzja).
- Przed dodaniem nowego embeda YouTube → sprawdzić listę embarg powyżej (embargo: `c9rBCq5ubKY`).
