import Link from "next/link";
import type { Metadata } from "next";
import VideoGrid, { type VideoItem } from "@/components/VideoGrid";

export const metadata: Metadata = {
  title: "LIROY TV — 24/7 Muzyka. Kultura. Bunt.",
  description: "Twoja antena na kulturę bez kompromisów.",
};

const PLAYLIST_ID = "PL1JRTA9pmLreGR10UG36dg6-C7BFQ9KFn";

async function getPlaylistVideos(): Promise<VideoItem[]> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return [];

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=50&key=${key}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];

    const data = await res.json();

    return (data.items ?? [])
      .filter(
        (item: { snippet: { resourceId?: { videoId?: string }; thumbnails?: { medium?: { url?: string }; high?: { url?: string } } } }) =>
          item.snippet?.resourceId?.videoId &&
          item.snippet?.thumbnails?.medium?.url
      )
      .map((item: { snippet: { resourceId: { videoId: string }; title: string; thumbnails: { high?: { url: string }; medium: { url: string } }; publishedAt: string } }) => ({
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail:
          item.snippet.thumbnails.high?.url ??
          item.snippet.thumbnails.medium.url,
        publishedAt: item.snippet.publishedAt,
      }));
  } catch {
    return [];
  }
}

export default async function TVPage() {
  const videos = await getPlaylistVideos();

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

            {/* Live badge */}
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

        {/* Interactive player + grid (client component) */}
        <VideoGrid videos={videos} />

        {/* Fallback if API failed */}
        {videos.length === 0 && (
          <p
            className="text-[#333] text-xs tracking-widest uppercase mt-8 text-center"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Nie można załadować playlisty. Odśwież stronę.
          </p>
        )}
      </div>
    </div>
  );
}
