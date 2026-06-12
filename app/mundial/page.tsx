"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Match {
  id: string;
  group: string;
  t1: { name: string; flag: string };
  t2: { name: string; flag: string };
  date: string;
  time: string;
  deadline: string;
}

const MATCHES: Match[] = [
  {
    id: "mex-rsa",
    group: "A",
    t1: { name: "Meksyk", flag: "🇲🇽" },
    t2: { name: "RPA", flag: "🇿🇦" },
    date: "11 czerwca 2026",
    time: "21:00",
    deadline: "2026-06-11T19:00:00Z",
  },
  {
    id: "kor-cze",
    group: "A",
    t1: { name: "Korea Płd.", flag: "🇰🇷" },
    t2: { name: "Czechy", flag: "🇨🇿" },
    date: "11 czerwca 2026",
    time: "04:00",
    deadline: "2026-06-12T02:00:00Z",
  },
  {
    id: "bra-mar",
    group: "C",
    t1: { name: "Brazylia", flag: "🇧🇷" },
    t2: { name: "Maroko", flag: "🇲🇦" },
    date: "12 czerwca 2026",
    time: "19:00",
    deadline: "2026-06-12T17:00:00Z",
  },
  {
    id: "hai-sco",
    group: "C",
    t1: { name: "Haiti", flag: "🇭🇹" },
    t2: { name: "Szkocja", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
    date: "12 czerwca 2026",
    time: "22:00",
    deadline: "2026-06-12T20:00:00Z",
  },
  {
    id: "ger-cuw",
    group: "E",
    t1: { name: "Niemcy", flag: "🇩🇪" },
    t2: { name: "Curaçao", flag: "🇨🇼" },
    date: "13 czerwca 2026",
    time: "01:00",
    deadline: "2026-06-12T23:00:00Z",
  },
  {
    id: "ned-jpn",
    group: "F",
    t1: { name: "Holandia", flag: "🇳🇱" },
    t2: { name: "Japonia", flag: "🇯🇵" },
    date: "13 czerwca 2026",
    time: "19:00",
    deadline: "2026-06-13T17:00:00Z",
  },
  {
    id: "bel-egy",
    group: "G",
    t1: { name: "Belgia", flag: "🇧🇪" },
    t2: { name: "Egipt", flag: "🇪🇬" },
    date: "13 czerwca 2026",
    time: "22:00",
    deadline: "2026-06-13T20:00:00Z",
  },
  {
    id: "esp-cpv",
    group: "H",
    t1: { name: "Hiszpania", flag: "🇪🇸" },
    t2: { name: "Rep. Zielonego Przylądka", flag: "🇨🇻" },
    date: "14 czerwca 2026",
    time: "01:00",
    deadline: "2026-06-13T23:00:00Z",
  },
];

function categorize(matches: Match[], now: Date) {
  const active: Match[] = [];
  const upcoming: Match[] = [];
  const finished: Match[] = [];
  for (const m of matches) {
    const dl = new Date(m.deadline);
    const windowStart = new Date(dl.getTime() - 2 * 3600_000);
    const windowEnd = new Date(dl.getTime() + 24 * 3600_000);
    if (now > windowEnd) finished.push(m);
    else if (now >= windowStart) active.push(m);
    else upcoming.push(m);
  }
  return { active, upcoming, finished };
}

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    h: Math.floor(diff / 3600_000),
    m: Math.floor((diff % 3600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1000),
  };
}

function Countdown({ target }: { target: Date }) {
  const [tl, setTl] = useState(() => getTimeLeft(target));
  useEffect(() => {
    const id = setInterval(() => setTl(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  if (!tl)
    return (
      <span
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          color: "#FFD700",
        }}
      >
        OTWARTO!
      </span>
    );
  return (
    <span
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700,
        color: "#FFD700",
        fontSize: "1.1rem",
        letterSpacing: "0.05em",
      }}
    >
      {String(tl.h).padStart(2, "0")}:{String(tl.m).padStart(2, "0")}:
      {String(tl.s).padStart(2, "0")}
    </span>
  );
}

type Results = Record<string, number>;
interface RankingEntry {
  nick: string;
  points: number;
}
interface UserRank {
  position: number;
  points: number;
}

function MatchCard({
  match,
  nick,
  upcoming = false,
}: {
  match: Match;
  nick: string;
  upcoming?: boolean;
}) {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [voted, setVoted] = useState(false);
  const [results, setResults] = useState<Results>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isPast = new Date() > new Date(match.deadline);
  const windowOpenTime = useMemo(
    () => new Date(new Date(match.deadline).getTime() - 2 * 3600_000),
    [match.deadline]
  );

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
      style={upcoming ? { opacity: 0.7 } : {}}
    >
      <div
        className="absolute top-0 left-0 px-3 py-1 text-xs tracking-widest"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          background: upcoming ? "#333" : "#FFD700",
          color: upcoming ? "#aaa" : "#000",
        }}
      >
        GRUPA {match.group}
      </div>

      <div className="pt-10 pb-6 px-6">
        <p
          className="text-center text-[11px] tracking-widest mb-6"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            color: upcoming ? "#555" : "#FFD700",
          }}
        >
          {match.date} · {match.time}
        </p>

        <div className="flex items-center gap-4">
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

          {upcoming ? (
            <div className="flex flex-col items-center gap-1 px-2 text-center">
              <span
                className="text-[9px] tracking-widest mb-1"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "#555",
                }}
              >
                OTWARCIE ZA
              </span>
              <Countdown target={windowOpenTime} />
            </div>
          ) : voted ? (
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
          ) : !isPast ? (
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
                fontWeight: 700,
                fontSize: "1.4rem",
                color: "#444",
                letterSpacing: "0.05em",
              }}
            >
              ⏰
            </div>
          )}

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

        {error && (
          <p className="text-center text-red-500 text-xs mt-4 tracking-wide">
            {error}
          </p>
        )}

        {isPast && !voted && !upcoming && (
          <p
            className="text-center text-xs mt-6 tracking-widest"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              color: "#555",
            }}
          >
            ⏰ Typowanie zamknięte — mecz w toku
          </p>
        )}

        {!isPast && !voted && !upcoming && (
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
                          key === myVote ? "#FFD700" : "rgba(255,215,0,0.25)",
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

function SectionLabel({
  children,
  dim = false,
}: {
  children: React.ReactNode;
  dim?: boolean;
}) {
  return (
    <p
      className="text-xs tracking-[0.4em] mb-6 text-center"
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        color: dim ? "#444" : "#FFD700",
      }}
    >
      {children}
    </p>
  );
}

export default function MundialPage() {
  const [nick, setNick] = useState("");
  const [nickSaved, setNickSaved] = useState(false);
  const [nickInput, setNickInput] = useState("");
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [rankingTotal, setRankingTotal] = useState(0);
  const [userRank, setUserRank] = useState<UserRank | null>(null);
  const [finishedOpen, setFinishedOpen] = useState(false);
  const [now, setNow] = useState(() => new Date());

  const fetchRanking = async (overrideNick?: string) => {
    try {
      const n = overrideNick !== undefined ? overrideNick : nick;
      const nickParam = n ? `&nick=${encodeURIComponent(n)}` : "";
      const res = await fetch(`/api/mundial/vote?${nickParam}`);
      if (res.ok) {
        const data = await res.json();
        setRanking(data.ranking ?? []);
        setRankingTotal(data.total ?? 0);
        setUserRank(data.userRank ?? null);
      }
    } catch {
      // silently ignore
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("mundial:nick");
    if (stored) {
      setNick(stored);
      setNickSaved(true);
      fetchRanking(stored);
    } else {
      fetchRanking("");
    }
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const saveNick = () => {
    const trimmed = nickInput.trim();
    if (!trimmed) return;
    localStorage.setItem("mundial:nick", trimmed);
    setNick(trimmed);
    setNickSaved(true);
    fetchRanking(trimmed);
  };

  const changeNick = () => {
    setNickSaved(false);
    setNickInput(nick);
  };

  const { active, upcoming, finished } = useMemo(
    () => categorize(MATCHES, now),
    [now]
  );

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
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            color: "#FFD700",
          }}
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
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            color: "#FFD700",
          }}
        >
          Typuj wyniki — walcz o pozycję w rankingu
        </motion.p>
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
      <section className="px-6 pb-16 max-w-2xl mx-auto">
        {/* Typuj teraz */}
        {active.length > 0 && (
          <div className="mb-12">
            <SectionLabel>TYPUJ TERAZ</SectionLabel>
            <div className="space-y-6">
              {active.map((match) => (
                <MatchCard key={match.id} match={match} nick={nick} />
              ))}
            </div>
          </div>
        )}

        {/* Nadchodzące */}
        {upcoming.length > 0 && (
          <div className="mb-12">
            <SectionLabel dim={active.length > 0}>
              NADCHODZĄCE ({upcoming.length})
            </SectionLabel>
            <div className="space-y-6">
              {upcoming.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  nick={nick}
                  upcoming
                />
              ))}
            </div>
          </div>
        )}

        {/* Zakończone */}
        {finished.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setFinishedOpen((v) => !v)}
              className="w-full flex items-center justify-between mb-4 hover:opacity-80 transition-opacity"
            >
              <span
                className="text-xs tracking-[0.4em]"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "#333",
                }}
              >
                ZAKOŃCZONE ({finished.length})
              </span>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "#333",
                  fontSize: "0.65rem",
                }}
              >
                {finishedOpen ? "▲ ZWIŃ" : "▼ ROZWIŃ"}
              </span>
            </button>
            <AnimatePresence>
              {finishedOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6 overflow-hidden"
                >
                  {finished.map((match) => (
                    <MatchCard key={match.id} match={match} nick={nick} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {active.length === 0 && upcoming.length === 0 && finished.length === 0 && (
          <p
            className="text-center text-[#444] tracking-widest text-sm"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            BRAK MECZÓW
          </p>
        )}
      </section>

      {/* Ranking */}
      <section className="px-6 pb-24 max-w-lg mx-auto">
        <div className="border border-[#FFD700]/20 bg-[#0a0a0a] rounded-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#FFD700]/10 flex items-center justify-between">
            <p
              className="text-xs tracking-[0.4em]"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                color: "#FFD700",
              }}
            >
              RANKING — TOP 50
            </p>
            <button
              onClick={() => fetchRanking()}
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
                  transition={{ delay: i * 0.02 }}
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

          {/* User position — shown when user is outside top 50 */}
          {nickSaved && userRank && userRank.position > 50 && (
            <div className="px-6 py-3 border-t border-[#FFD700]/20 bg-[#0d0d0d]">
              <p
                className="text-xs tracking-widest"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "#FFD700",
                }}
              >
                Twoja pozycja: #{userRank.position} — {userRank.points} pkt
              </p>
            </div>
          )}

          {/* Total players */}
          <div className="px-6 py-2 border-t border-[#111]">
            <p
              className="text-[10px] tracking-widest"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                color: "#333",
              }}
            >
              Łącznie graczy: {rankingTotal}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
