# LIROY VIDEO MAP

Rejestr filmów osadzonych na stronie oraz plików wideo w `public/video/`.

---

## 🎬 YouTube — osadzone embedy (youtube-nocookie)

| Video ID | Tytuł | Rok | Kanał | Gdzie osadzone |
|---|---|---|---|---|
| `fkyDHiXxXZI` | Liroy — Skaczcie do góry (oficjalny teledysk) | 1997 | LiROY POLSKA | Strona główna — blok rocznicowy albumu «L» (29 lat), `L1997_Anniversary.tsx` |
| `c9rBCq5ubKY` | *(L7 — embargoed)* | 2025 | — | **EMBARGO — nie osadzać** |

> `c9rBCq5ubKY` — objęty embargiem, nie używać w żadnym embedzie na stronie.

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
