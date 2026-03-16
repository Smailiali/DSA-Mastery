import React from "react";
import { T } from "@/utils/tokens";
import { useTheme } from "@/hooks/useTheme";
import { ProgressRing, MiniBar, SCard } from "@/components/shared/ProgressRing";
import { SafeStorage } from "@/utils/SafeStorage";
import { getLocalDateStr, fmtTime } from "@/utils/dateUtils";
import { getReviewQueue } from "@/utils/sm2";

export function ResetDataPanel({ dark }: any) {
  const th = useTheme(dark);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [confirmText, setConfirmText] = React.useState("");
  const [resetDone, setResetDone] = React.useState(false);

  const handleReset = () => {
    if (confirmText !== "RESET") return;
    // Clear all DSA-related localStorage keys
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("dsa-")) keysToRemove.push(key);
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch {}
    setResetDone(true);
    setTimeout(() => window.location.reload(), 1500);
  };

  return (
    <div
      style={{
        marginTop: 24,
        padding: "16px 18px",
        borderRadius: 14,
        border: `1px solid ${T.red}20`,
        background: `${T.red}06`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: showConfirm ? 12 : 0,
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: th.text }}>
            Reset All Data
          </div>
          <div style={{ fontSize: 11, color: th.textS, marginTop: 2 }}>
            Clear all progress, streaks, drafts, notes, and start fresh.
          </div>
        </div>
        {!showConfirm && !resetDone && (
          <button
            onClick={() => setShowConfirm(true)}
            style={{
              background: `${T.red}14`,
              border: `1px solid ${T.red}30`,
              borderRadius: 9,
              padding: "7px 16px",
              cursor: "pointer",
              color: T.red,
              fontWeight: 700,
              fontSize: 12,
              fontFamily: "'Outfit',sans-serif",
              flexShrink: 0,
            }}
          >
            Reset
          </button>
        )}
      </div>
      {resetDone && (
        <div
          style={{
            textAlign: "center",
            padding: "8px 0",
            color: T.teal,
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          ✓ Data cleared. Reloading…
        </div>
      )}
      {showConfirm && !resetDone && (
        <div className="fade-up">
          <div
            style={{
              background: `${T.red}0a`,
              border: `1px solid ${T.red}20`,
              borderRadius: 10,
              padding: "12px 14px",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: T.red,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              ⚠ This cannot be undone
            </div>
            <div
              style={{
                fontSize: 12,
                color: th.text,
                lineHeight: 1.6,
                marginBottom: 10,
              }}
            >
              This will permanently delete all your progress, solved problems,
              streak data, code drafts, notes, spaced repetition data, and mock
              interview history.
            </div>
            <div style={{ fontSize: 12, color: th.textS, marginBottom: 8 }}>
              Type <strong style={{ color: T.red }}>RESET</strong> to confirm:
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
                placeholder="Type RESET"
                style={{
                  flex: 1,
                  padding: "7px 10px",
                  background: dark ? "#0d1117" : "#fff",
                  border: `1px solid ${T.red}30`,
                  borderRadius: 7,
                  fontSize: 13,
                  color: th.text,
                  fontFamily: "'JetBrains Mono',monospace",
                  fontWeight: 700,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                onClick={handleReset}
                disabled={confirmText !== "RESET"}
                style={{
                  padding: "7px 18px",
                  background: confirmText === "RESET" ? T.red : `${T.red}30`,
                  border: "none",
                  borderRadius: 7,
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 12,
                  cursor: confirmText === "RESET" ? "pointer" : "not-allowed",
                  fontFamily: "'Outfit',sans-serif",
                  opacity: confirmText === "RESET" ? 1 : 0.5,
                }}
              >
                Delete All
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setConfirmText("");
                }}
                style={{
                  padding: "7px 14px",
                  background: "rgba(255,255,255,0.07)",
                  border: `1px solid ${th.border}`,
                  borderRadius: 7,
                  color: th.textS,
                  fontWeight: 600,
                  fontSize: 12,
                  cursor: "pointer",
                  fontFamily: "'Outfit',sans-serif",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function StatsDashboard({
  dark,
  curriculum,
  progress,
  streakData,
  activityData,
  srData,
}: any) {
  const th = useTheme(dark);
  const allTopics = curriculum.flatMap((w: any) => w.topics);
  const allProblems = allTopics.flatMap((t: any) => t.problems);
  const doneTopics = allTopics.filter((t: any) => progress[t.id]?.topicDone).length;
  const doneProblems = allProblems.filter((p: any) =>
    allTopics.some((t: any) => progress[t.id]?.problems?.[p.id]),
  ).length;
  const tpct = Math.round((doneTopics / allTopics.length) * 100) || 0;
  const ppct = Math.round((doneProblems / allProblems.length) * 100) || 0;
  const byD: any = {
    Easy: { t: 0, d: 0 },
    Medium: { t: 0, d: 0 },
    Hard: { t: 0, d: 0 },
  };
  for (const t of allTopics)
    for (const p of t.problems) {
      byD[p.difficulty].t++;
      if (progress[t.id]?.problems?.[p.id]) byD[p.difficulty].d++;
    }

  // ── WEAK TOPIC DETECTION ──
  const topicStats = allTopics.map((t: any) => {
    const total = t.problems.length;
    const solved = t.problems.filter(
      (p: any) => progress[t.id]?.problems?.[p.id],
    ).length;
    const pct = total ? Math.round((solved / total) * 100) : 0;
    const timerTotal = t.problems.reduce(
      (acc: any, p: any) => acc + SafeStorage.get(`dsa-timer-${p.id}`, 0),
      0,
    );
    return { topic: t, total, solved, pct, timerTotal };
  });
  const weakTopics = topicStats
    .filter((s: any) => s.pct < 50 && s.total > 0)
    .sort((a: any, b: any) => a.pct - b.pct)
    .slice(0, 5);
  const strongTopics = topicStats
    .filter((s: any) => s.pct >= 80)
    .sort((a: any, b: any) => b.pct - a.pct);

  // ── RECOMMENDED NEXT PROBLEM ──
  const nextProblems: any[] = [];
  for (const t of allTopics) {
    for (const p of t.problems) {
      if (!progress[t.id]?.problems?.[p.id]) {
        nextProblems.push({ problem: p, topic: t });
        if (nextProblems.length >= 5) break;
      }
    }
    if (nextProblems.length >= 5) break;
  }

  // ── TIME STATS ──
  const totalTime = allProblems.reduce(
    (acc: any, p: any) => acc + SafeStorage.get(`dsa-timer-${p.id}`, 0),
    0,
  );
  const avgTime = doneProblems > 0 ? Math.round(totalTime / doneProblems) : 0;

  // ── ACTIVITY STATS ──
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return getLocalDateStr(d);
  });
  const week7 = last7.reduce((s: any, d: any) => s + ((activityData || {})[d] || 0), 0);
  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return getLocalDateStr(d);
  });
  const activeDays30 = last30.filter((d) => (activityData || {})[d] > 0).length;

  const milestones = [
    {
      l: "Week 1 Foundations",
      done: curriculum[0]?.topics.every((t: any) => progress[t.id]?.topicDone),
    },
    {
      l: "Week 2 Core",
      done: curriculum[1]?.topics.every((t: any) => progress[t.id]?.topicDone),
    },
    {
      l: "Week 3 Advanced",
      done: curriculum[2]?.topics.every((t: any) => progress[t.id]?.topicDone),
    },
    {
      l: "Week 4 Mastery",
      done: curriculum[3]?.topics.every((t: any) => progress[t.id]?.topicDone),
    },
    { l: "50%+ Problems Solved", done: ppct >= 50 },
    { l: "All Easy Done", done: byD.Easy.d >= byD.Easy.t && byD.Easy.t > 0 },
    {
      l: "70%+ Medium Done",
      done: byD.Medium.d >= Math.floor(byD.Medium.t * 0.7),
    },
  ];
  const mc = milestones.filter((m) => m.done).length;
  return (
    <div className="fade-up">
      <h1
        style={{
          fontSize: 24,
          fontWeight: 900,
          color: th.text,
          marginBottom: 4,
          letterSpacing: "-0.4px",
        }}
      >
        📈 Progress Dashboard
      </h1>
      <p style={{ color: th.textS, fontSize: 13, marginBottom: 18 }}>
        Your real-time mastery snapshot.
      </p>

      {/* ── TOP STATS ── */}
      <div className="stat-grid" style={{ marginBottom: 18 }}>
        {[
          [doneTopics, allTopics.length, "Topics", T.teal, tpct],
          [doneProblems, allProblems.length, "Problems", T.violet, ppct],
          [
            streakData?.current || 0,
            "",
            "Day Streak",
            T.amber,
            Math.min(100, (streakData?.current || 0) * 10),
          ],
          [
            fmtTime(totalTime),
            "",
            "Total Time",
            T.blue,
            Math.min(100, Math.round((totalTime / 3600) * 10)),
          ],
        ].map(([v, tot, l, c, p]) => (
          <div
            key={l as any}
            style={{
              background: th.bg2,
              border: `1px solid ${c}20`,
              borderRadius: 14,
              padding: "14px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 7,
            }}
          >
            <ProgressRing pct={p} size={50} stroke={5} color={c}>
              <span style={{ fontSize: 10, fontWeight: 900, color: c }}>
                {v}
              </span>
            </ProgressRing>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: th.text }}>
                {l}
              </div>
              {tot && (
                <div style={{ fontSize: 10, color: th.textS }}>/{tot}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── ACTIVITY SUMMARY ── */}
      <div
        style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}
      >
        {[
          ["Last 7 days", week7 + " solved", T.teal],
          ["Active days (30d)", activeDays30 + "/30", T.violet],
          ["Avg time/problem", doneProblems ? fmtTime(avgTime) : "—", T.amber],
          [
            "Review queue",
            getReviewQueue(srData || {}).length + " due",
            T.blue,
          ],
        ].map(([l, v, c]) => (
          <div
            key={l}
            style={{
              flex: 1,
              minWidth: 100,
              background: th.bg2,
              border: `1px solid ${c}15`,
              borderRadius: 11,
              padding: "10px 12px",
            }}
          >
            <div
              style={{ fontSize: 16, fontWeight: 900, color: c, lineHeight: 1 }}
            >
              {v}
            </div>
            <div style={{ fontSize: 10, color: th.textS, marginTop: 3 }}>
              {l}
            </div>
          </div>
        ))}
      </div>

      {/* ── WEAK TOPICS ── */}
      {weakTopics.length > 0 && (
        <SCard title="🔴 Needs Work" dark={dark} accent={T.red}>
          <p style={{ fontSize: 12, color: th.textS, marginBottom: 8 }}>
            Topics with the lowest completion — focus here for maximum
            improvement.
          </p>
          {weakTopics.map((s: any) => (
            <div
              key={s.topic.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 10px",
                borderRadius: 9,
                background: `${T.red}06`,
                border: `1px solid ${T.red}12`,
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 14 }}>{s.topic.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: th.text }}>
                  {s.topic.title}
                </div>
                <div style={{ fontSize: 11, color: th.textS }}>
                  {s.solved}/{s.total} solved ·{" "}
                  {s.timerTotal > 0
                    ? fmtTime(s.timerTotal) + " spent"
                    : "not started"}
                </div>
              </div>
              <div
                style={{
                  background: `${T.red}20`,
                  color: T.red,
                  borderRadius: 99,
                  padding: "2px 10px",
                  fontSize: 11,
                  fontWeight: 800,
                }}
              >
                {s.pct}%
              </div>
            </div>
          ))}
        </SCard>
      )}

      {/* ── STRONG TOPICS ── */}
      {strongTopics.length > 0 && (
        <SCard title="🟢 Strong Areas" dark={dark} accent={T.teal}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {strongTopics.map((s: any) => (
              <span
                key={s.topic.id}
                style={{
                  background: `${T.teal}15`,
                  color: T.teal,
                  borderRadius: 99,
                  padding: "3px 12px",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {s.topic.emoji} {s.topic.title} ({s.pct}%)
              </span>
            ))}
          </div>
        </SCard>
      )}

      <div className="diff-grid" style={{ marginBottom: 12 }}>
        <SCard title="📅 By Week" dark={dark}>
          {curriculum.map((wk: any) => {
            const d = wk.topics.filter((t: any) => progress[t.id]?.topicDone).length;
            return (
              <MiniBar
                key={wk.week}
                done={d}
                total={wk.topics.length}
                color={wk.color}
                label={`Week ${wk.week}: ${wk.title}`}
              />
            );
          })}
        </SCard>
        <SCard title="🎯 By Difficulty" dark={dark}>
          {[
            ["Easy", T.teal],
            ["Medium", T.amber],
            ["Hard", T.red],
          ].map(([d, c]) => (
            <MiniBar
              key={d}
              done={byD[d].d}
              total={byD[d].t}
              color={c}
              label={d}
            />
          ))}
        </SCard>
      </div>

      {/* ── TOPIC BREAKDOWN ── */}
      <SCard title="📊 All Topics" dark={dark}>
        {topicStats.map((s: any) => (
          <div
            key={s.topic.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 12, width: 18, textAlign: "center" }}>
              {s.topic.emoji}
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: th.text,
                flex: 1,
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {s.topic.title}
            </span>
            <div
              style={{
                width: 80,
                height: 5,
                borderRadius: 99,
                background: "rgba(255,255,255,0.06)",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: s.pct + "%",
                  background:
                    s.pct >= 80 ? T.teal : s.pct >= 40 ? T.amber : T.red,
                  borderRadius: 99,
                  transition: "width 0.3s",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: s.pct >= 80 ? T.teal : s.pct >= 40 ? T.amber : T.red,
                minWidth: 30,
                textAlign: "right",
              }}
            >
              {s.pct}%
            </span>
          </div>
        ))}
      </SCard>

      <SCard
        title={`🎖️ Readiness (${mc}/${milestones.length} milestones)`}
        dark={dark}
        accent={mc >= 5 ? T.teal : T.amber}
      >
        {milestones.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 10px",
              borderRadius: 9,
              background: m.done ? `${T.teal}08` : th.bg3,
              border: `1px solid ${m.done ? T.teal + "20" : th.border}`,
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 5,
                flexShrink: 0,
                background: m.done ? T.teal : "transparent",
                border: `2px solid ${m.done ? T.teal : "rgba(255,255,255,0.15)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {m.done && (
                <span style={{ color: "#000", fontSize: 11, fontWeight: 900 }}>
                  ✓
                </span>
              )}
            </div>
            <span
              style={{
                fontSize: 13,
                color: m.done ? th.text : th.textS,
                fontWeight: m.done ? 600 : 400,
              }}
            >
              {m.l}
            </span>
            {m.done && (
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: 10,
                  color: T.teal,
                  fontWeight: 700,
                }}
              >
                Done ✓
              </span>
            )}
          </div>
        ))}
        {mc >= 6 && (
          <div
            style={{
              marginTop: 12,
              padding: "11px 14px",
              borderRadius: 9,
              background: `linear-gradient(135deg,${T.teal}14,${T.violet}0e)`,
              border: `1px solid ${T.teal}22`,
              fontSize: 13,
              color: th.text,
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            🎉 You're interview-ready! Time to apply.
          </div>
        )}
      </SCard>

      {/* ── RESET DATA ── */}
      <ResetDataPanel dark={dark} />
    </div>
  );
}
