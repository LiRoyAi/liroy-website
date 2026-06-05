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
| `o7XS3H9_n24` | LiROY — XXXI ROCZNICA WYDANIA PŁYTY "SCYZORYK" EP | /tv TELEDYSKI + S7_TVTeaser (strona główna) |
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

## 📁 public/video/ — pliki lokalne

| Plik | Rozmiar | Status | Gdzie używany |
|---|---|---|---|
| `kontakt-bg.mp4` | ~494 KB | ✅ AKTYWNY | `S8_Kontakt.tsx` — tło wideo sekcji Kontakt (H.264 loop) |
| `kontakt-bg.webm` | ~253 KB | ✅ AKTYWNY | `S8_Kontakt.tsx` — tło wideo sekcji Kontakt (VP9 loop) |
| `kontakt-poster.jpg` | ~52 KB | ✅ AKTYWNY | `S8_Kontakt.tsx` — poster fallback (mobile/reduced-motion) |
| `baza zbożowa płyty pamiątki etc.mp4` | ~130 MB | ⚠️ OBECNY (nie zcommitowany) | Nie osadzony. Plik fizycznie istnieje w `public/video/` — NIE jest usunięty mimo wcześniejszego oznaczenia jako DELETED w historii zadań. |
| `baza zbożowa płyty pamiątki etc (2).mp4` | ~34 MB | ⚠️ OBECNY (nie zcommitowany) | Nie osadzony. Druga wersja jw. Fizycznie w `public/video/`. |
| `dron Kielce jazda autem w nocy.mp4` | ~122 MB | ⚠️ OBECNY — SUROWY, nie commitować | Źródło do `kontakt-bg.mp4/.webm`. >100 MB — poza repo (gitignore / LFS). |
| `Anim Logo2.mp4` | — | 📦 DOSTĘPNY | Animacja logo — nie osadzony |
| `FINAL.mp4` | — | 📦 DOSTĘPNY | Nie osadzony |
| `FINAL_pion.mp4` | — | 📦 DOSTĘPNY | Nie osadzony |
| `Scyzoryk XXXI LAT VID.mov` | — | 📦 DOSTĘPNY | Nie osadzony |
| *(pozostałe pliki archiwalne)* | — | 📦 DOSTĘPNY | Materiały surowe / archiwalne, nie osadzone |

---

## Zasady

- Pliki >10 MB → **nie commitować** do gita. Używać LFS lub CDN.
- Pliki kompresowane do repo (`kontakt-bg.*`) → max ~2 MB na plik.
- Przed dodaniem nowego embeda YouTube → sprawdzić listę embarg powyżej.
