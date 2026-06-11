import { kv } from "@vercel/kv";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body: { matchId?: string; score?: string; nick?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { matchId, score, nick } = body;
  if (!matchId || !score || !nick) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const scoreKey = `votes:${matchId}:${score}`;
  const nickKey = `ranking:${nick}`;

  await Promise.all([kv.incr(scoreKey), kv.incr(nickKey)]);

  const pattern = `votes:${matchId}:*`;
  const keys = await kv.keys(pattern);
  const counts: Record<string, number> = {};
  if (keys.length > 0) {
    const values = await kv.mget<number[]>(...keys);
    keys.forEach((k, i) => {
      const shortKey = k.replace(`votes:${matchId}:`, "");
      counts[shortKey] = values[i] ?? 0;
    });
  }

  return Response.json({ matchId, results: counts });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const matchId = searchParams.get("matchId");
  if (!matchId) {
    return Response.json({ error: "matchId required" }, { status: 400 });
  }

  const voteKeys = await kv.keys(`votes:${matchId}:*`);
  const results: Record<string, number> = {};
  if (voteKeys.length > 0) {
    const values = await kv.mget<number[]>(...voteKeys);
    voteKeys.forEach((k, i) => {
      const shortKey = k.replace(`votes:${matchId}:`, "");
      results[shortKey] = values[i] ?? 0;
    });
  }

  const rankingKeys = await kv.keys("ranking:*");
  const ranking: { nick: string; points: number }[] = [];
  if (rankingKeys.length > 0) {
    const values = await kv.mget<number[]>(...rankingKeys);
    rankingKeys.forEach((k, i) => {
      ranking.push({ nick: k.replace("ranking:", ""), points: values[i] ?? 0 });
    });
  }

  ranking.sort((a, b) => b.points - a.points);

  return Response.json({ matchId, results, ranking: ranking.slice(0, 10) });
}
