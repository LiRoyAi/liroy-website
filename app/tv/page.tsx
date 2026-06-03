import Link from "next/link";
import type { Metadata } from "next";
import VideoGrid, { type VideoItem } from "@/components/VideoGrid";
import YouTubeCurated from "@/components/YouTubeCurated";

export const metadata: Metadata = {
  title: "LIROY TV — 24/7 Muzyka. Kultura. Bunt.",
  description: "Twoja antena na kulturę bez kompromisów.",
};

// Force server-render on every request so a stale empty build result
// never gets served while the API key is valid.
export const dynamic = "force-dynamic";

const PLAYLIST_ID = "PL1JRTA9pmLreGR10UG36dg6-C7BFQ9KFn";
const BASE_URL = "https://liroy-website.vercel.app";

type FetchResult =
  | { ok: true; videos: VideoItem[] }
  | { ok: false; reason: string };

async function getPlaylistVideos(): Promise<FetchResult> {
  const key = process.env.YOUTUBE_API_KEY;

  if (!key) {
    console.error("[LIROY TV] YOUTUBE_API_KEY is not set");
    return { ok: false, reason: "YOUTUBE_API_KEY env var missing" };
  }

  const url =
    `https://www.googleapis.com/youtube/v3/playlistItems` +
    `?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=50&key=${key}`;

  let res: Response;
  try {
    res = await fetch(url, {
      // Some Google API keys carry HTTP-referrer restrictions.
      // Server-side requests have no referrer by default — add one explicitly.
      headers: { Referer: BASE_URL },
      cache: "no-store",
    });
  } catch (err) {
    console.error("[LIROY TV] Network error fetching playlist:", err);
    return { ok: false, reason: `Network error: ${String(err)}` };
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "(unreadable)");
    console.error(
      `[LIROY TV] YouTube API responded ${res.status} ${res.statusText}: ${body}`
    );
    return { ok: false, reason: `YouTube API ${res.status}: ${body.slice(0, 200)}` };
  }

  let data: { items?: unknown[] };
  try {
    data = await res.json();
  } catch (err) {
    console.error("[LIROY TV] Failed to parse YouTube API response:", err);
    return { ok: false, reason: "Invalid JSON from YouTube API" };
  }

  type RawItem = {
    snippet: {
      resourceId?: { videoId?: string };
      title: string;
      thumbnails?: {
        high?: { url: string };
        medium?: { url: string };
      };
      publishedAt: string;
    };
  };

  const videos: VideoItem[] = (data.items ?? [])
    .filter((item): item is RawItem => {
      const s = (item as RawItem).snippet;
      return !!(s?.resourceId?.videoId && (s?.thumbnails?.medium?.url || s?.thumbnails?.high?.url));
    })
    .map((item) => ({
      videoId: item.snippet.resourceId!.videoId!,
      title: item.snippet.title,
      thumbnail:
        item.snippet.thumbnails?.high?.url ??
        item.snippet.thumbnails!.medium!.url,
      publishedAt: item.snippet.publishedAt,
    }));

  console.log(`[LIROY TV] Fetched ${videos.length} videos from playlist ${PLAYLIST_ID}`);
  return { ok: true, videos };
}

export default async function TVPage() {
  const result = await getPlaylistVideos();
  const videos = result.ok ? result.videos : [];
  const apiError = result.ok ? null : result.reason;

  return (
    <div className="relative min-h-screen bg-[#020202] flex flex-col overflow-hidden">
      {/* Full-page scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)",
        }}
      />

      {/* Red glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(139,0,0,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Back button */}
      <div className="relative z-20 px-6 md:px-12 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#555] hover:text-[#ca8a04] transition-colors duration-200 cursor-pointer text-sm tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
        >
          <span className="text-base">&larr;</span>
          POWRÓT
        </Link>
      </div>

      {/* Main content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-start px-6 md:px-12 pb-24 pt-8 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="w-full mb-8">
          <div
            className="text-[10px] tracking-[0.5em] text-[#333] uppercase mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
          >
            OFICJALNY KANAŁ
          </div>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h1
              className="text-[#ca8a04] leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(3.5rem, 12vw, 8rem)",
                letterSpacing: "0.05em",
              }}
            >
              LIROY TV
            </h1>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span
                className="text-[#333] text-[10px] tracking-[0.4em] uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
              >
                24 GODZINY NA DOBĘ
              </span>
            </div>
          </div>
          <p
            className="text-[#444] text-sm tracking-[0.25em] uppercase mt-1"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
          >
            24/7 &mdash; Muzyka. Kultura. Bunt.
          </p>
        </div>

        {/* Curated YouTube embeds — always available, no API needed */}
        <YouTubeCurated />

        {/* Playlist player — powered by YouTube API */}
        <VideoGrid videos={videos} />

        {/* API error — visible only in dev/staging, helps diagnose */}
        {apiError && (
          <div className="mt-8 w-full rounded-xl border border-red-900/40 bg-red-950/20 p-4">
            <p
              className="text-red-500 text-xs tracking-widest uppercase mb-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
            >
              Nie można załadować listy filmów
            </p>
            <p
              className="text-red-900 text-[11px] font-mono break-all"
            >
              {apiError}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
