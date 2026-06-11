"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Match {
  id: string;
  group: string;
  t1: { name: string; flag: string };
  t2: { name: string; flag: string };
  date: string;
  time: string;
}

const MATCHES: Match[] = [
  {
    id: "mex-rsa",
    group: "A",
    t1: { name: "Meksyk", flag: "🇲🇽" },
    t2: { name: "RPA", flag: "🇿🇦" },
    date: "11 czerwca 2026",
    time: "21:00",
  },
  {
    id: "kor-cze",
    group: "A",
    t1: { name: "Korea Płd.", flag: "🇰🇷" },
    t2: { name: "Czechy", flag: "🇨🇿" },
    date: "11 czerwca 2026",
    time: "04:00",
  },
];

type Results = Record<string, number>;
interface RankingEntry {
  nick: string;
  points: number;
}

function MatchCard({
  match,
  nick,
}: {
  match: Match;
  readonly nick: string;
}) {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [voted, setVoted] = useState(false);
  const [results, setResults] = useState<Results>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(`voted:${match.id}`);
    if (stored) {
      setVoted(true);
      fetchResults();
    }
  }, [match.id]);

  const fetchResults = useCallback(async () => {
    try {
      const res = await fetch(`/api/mundial/vote?matchId=${match.id}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results ?? {});
      }
    } catch {
      // silently ignore
    }
  }, [match.id]);

  const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);

  const getBarWidth = (scoreKey: string) => {
    if (totalVotes === 0) return 0;
    return Math.round(((results[scoreKey] ?? 0) / totalVotes) * 100);
  };

  const topScores = Object.entries(results)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const handleVote = async () => {
    if (!nick.trim()) {
      setError("Wpisz nick przed typowaniem!");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const scoreStr = `${score1}-${score2}`;
      const res = await fetch("/api/mundial/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchId: match.id, score: scoreStr, nick }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setResults(data.results ?? {});
      setVoted(true);
      localStorage.setItem(`voted:${match.id}`, scoreStr);
    } catch {
      setError("Błąd połączenia. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  const myVote = voted ? localStorage.getItem(`voted:${match.id}`) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative border border-[#FFD700]/20 bg-[#0a0a0a] rounded-sm overflow-hidden"
    >
      {/* Group badge */}
      <div
        className="absolute top-0 left-0 px-3 py-1 text-xs tracking-widest"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          background: "#FFD700",
          color: "#000",
        }}
      >
        GRUPA {match.group}
      </div>

      <div className="pt-10 pb-6 px-6">
        {/* Date + time */}
        <p
          className="text-center text-[11px] tracking-widest mb-6"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            color: "#FFD700",
          }}
        >
          {match.date} · {match.time}
        </p>

        {/* Teams row */}
        <div className="flex items-center gap-4">
          {/* Team 1 */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <span className="text-5xl">{match.t1.flag}</span>
            <span
              className="text-sm tracking-widest text-center"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                color: "#f5f5f5",
              }}
            >
              {match.t1.name}
            </span>
          </div>

          {/* Score pickers */}
          {!voted ? (
            <div className="flex items-center gap-3">
              <ScorePicker value={score1} onChange={setScore1} />
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: "2rem",
                  color: "#FFD700",
                }}
              >
                :
              </span>
              <ScorePicker value={score2} onChange={setScore2} />
            </div>
          ) : (
            <div
              className="text-center px-4"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "2.5rem",
                color: "#FFD700",
                letterSpacing: "0.05em",
              }}
            >
              {myVote ?? "?"}
            </div>
          )}

          {/* Team 2 */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <span className="text-5xl">{match.t2.flag}</span>
            <span
              className="text-sm tracking-widest text-center"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                color: "#f5f5f5",
              }}
            >
              {match.t2.name}
            </span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-center text-red-500 text-xs mt-4 tracking-wide">
            {error}
          </p>
        )}

        {/* Vote button */}
        {!voted && (
          <div className="flex justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleVote}
              disabled={loading}
              className="px-10 py-3 text-black text-sm tracking-[0.2em] disabled:opacity-50"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                background: "#FFD700",
                letterSpacing: "0.2em",
              }}
            >
              {loading ? "WYSYŁAM..." : "TYPUJ"}
            </motion.button>
          </div>
        )}

        {/* Results bars */}
        <AnimatePresence>
          {voted && topScores.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 space-y-2"
            >
              <p
                className="text-xs tracking-widest mb-3 text-center"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "#FFD700",
                }}
              >
                ROZKŁAD TYPOWAŃ ({totalVotes}{" "}
                {totalVotes === 1 ? "głos" : "głosy/głosów"})
              </p>
              {topScores.map(([key, count]) => (
                <div key={key} className="flex items-center gap-3">
                  <span
                    className="w-12 text-right text-sm"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      color: key === myVote ? "#FFD700" : "#f5f5f5",
                    }}
                  >
                    {key}
                  </span>
                  <div className="flex-1 h-5 bg-[#111] rounded-sm overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getBarWidth(key)}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="h-full"
                      style={{
                        background:
                          key === myVote
                            ? "#FFD700"
                            : "rgba(255,215,0,0.25)",
                      }}
                    />
                  </div>
                  <span
                    className="w-8 text-xs"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      color: "#666",
                    }}
                  >
                    {getBarWidth(key)}%
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ScorePicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={() => onChange(Math.min(9, value + 1))}
        className="w-9 h-9 flex items-center justify-center border border-[#FFD700]/40 text-[#FFD700] hover:bg-[#FFD700]/10 transition-colors"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: "1.2rem",
        }}
      >
        +
      </button>
      <span
        className="text-3xl w-10 text-center"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          color: "#fff",
        }}
      >
        {value}
      </span>
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-9 h-9 flex items-center justify-center border border-[#FFD700]/40 text-[#FFD700] hover:bg-[#FFD700]/10 transition-colors"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: "1.2rem",
        }}
      >
        −
      </button>
    </div>
  );
}

export default function MundialPage() {
  const [nick, setNick] = useState("");
  const [nickSaved, setNickSaved] = useState(false);
  const [nickInput, setNickInput] = useState("");
  const [ranking, setRanking] = useState<RankingEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("mundial:nick");
    if (stored) {
      setNick(stored);
      setNickSaved(true);
    }
    fetchRanking();
  }, []);

  const fetchRanking = async () => {
    try {
      const res = await fetch("/api/mundial/vote?matchId=mex-rsa");
      if (res.ok) {
        const data = await res.json();
        setRanking(data.ranking ?? []);
      }
    } catch {
      // silently ignore
    }
  };

  const saveNick = () => {
    const trimmed = nickInput.trim();
    if (!trimmed) return;
    localStorage.setItem("mundial:nick", trimmed);
    setNick(trimmed);
    setNickSaved(true);
  };

  const changeNick = () => {
    setNickSaved(false);
    setNickInput(nick);
  };

  return (
    <main
      className="min-h-screen"
      style={{ background: "#000", color: "#f5f5f5" }}
    >
      {/* Hero */}
      <section className="relative pt-24 pb-16 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, #FFD700 2px, #FFD700 3px)",
          }}
        />
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.4em] mb-3"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#FFD700" }}
        >
          H2H ARCHIVE
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl tracking-tight uppercase mb-4"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            color: "#fff",
          }}
        >
          Mundial 2026
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-sm tracking-[0.3em] uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#FFD700" }}
        >
          Typuj wyniki — walcz o pozycję w rankingu
        </motion.p>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-8 h-px w-48"
          style={{ background: "#FFD700", transformOrigin: "center" }}
        />
      </section>

      {/* Nick section */}
      <section className="px-6 pb-10 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {!nickSaved ? (
            <motion.div
              key="nick-input"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="border border-[#FFD700]/30 bg-[#0a0a0a] p-6 rounded-sm"
            >
              <p
                className="text-xs tracking-[0.3em] mb-4 text-center"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "#FFD700",
                }}
              >
                TWÓJ NICK
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={24}
                  value={nickInput}
                  onChange={(e) => setNickInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveNick()}
                  placeholder="np. LiroyFan99"
                  className="flex-1 bg-[#111] border border-[#333] px-4 py-2 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#FFD700]/50"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                />
                <button
                  onClick={saveNick}
                  className="px-6 py-2 text-black text-sm tracking-widest"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    background: "#FFD700",
                  }}
                >
                  OK
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="nick-saved"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex items-center justify-between border border-[#FFD700]/20 bg-[#0a0a0a] px-5 py-3 rounded-sm"
            >
              <span
                className="text-xs tracking-widest"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "#555",
                }}
              >
                NICK:
              </span>
              <span
                className="text-base tracking-wide"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  color: "#FFD700",
                }}
              >
                {nick}
              </span>
              <button
                onClick={changeNick}
                className="text-[10px] tracking-widest underline"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "#555",
                }}
              >
                ZMIEŃ
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Matches */}
      <section className="px-6 pb-16 max-w-2xl mx-auto space-y-6">
        <p
          className="text-xs tracking-[0.4em] mb-6 text-center"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#FFD700" }}
        >
          MECZE — 11.06.2026
        </p>
        {MATCHES.map((match) => (
          <MatchCard key={match.id} match={match} nick={nick} />
        ))}
      </section>

      {/* Ranking */}
      <section className="px-6 pb-24 max-w-lg mx-auto">
        <div className="border border-[#FFD700]/20 bg-[#0a0a0a] rounded-sm overflow-hidden">
          <div
            className="px-6 py-4 border-b border-[#FFD700]/10 flex items-center justify-between"
          >
            <p
              className="text-xs tracking-[0.4em]"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                color: "#FFD700",
              }}
            >
              RANKING — TOP 10
            </p>
            <button
              onClick={fetchRanking}
              className="text-[10px] tracking-widest text-[#444] hover:text-[#FFD700] transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              ODŚWIEŻ
            </button>
          </div>
          {ranking.length === 0 ? (
            <p
              className="text-center py-10 text-[#444] text-sm tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              BRAK TYPOWAŃ
            </p>
          ) : (
            <ul className="divide-y divide-[#111]">
              {ranking.map((entry, i) => (
                <motion.li
                  key={entry.nick}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 px-6 py-3"
                >
                  <span
                    className="w-6 text-center text-sm"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      color: i < 3 ? "#FFD700" : "#444",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="flex-1 text-sm tracking-wide"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      color: entry.nick === nick ? "#FFD700" : "#f5f5f5",
                    }}
                  >
                    {entry.nick}
                  </span>
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      color: "#666",
                    }}
                  >
                    {entry.points} pkt
                  </span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
