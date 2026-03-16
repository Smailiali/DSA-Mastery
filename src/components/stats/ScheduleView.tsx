import React from "react";
import { T } from "@/utils/tokens";
import { useTheme } from "@/hooks/useTheme";

export function ScheduleView({ dark, schedule, setCurrent, curriculum }: any) {
  const [wf, setWf] = React.useState(0);
  const th = useTheme(dark);
  const wkC = [T.teal, T.violet, "#dc2626", T.amber];
  const shown = wf === 0 ? schedule : schedule.filter((d: any) => d.week === wf);

  const allTopics = curriculum ? curriculum.flatMap((w: any) => w.topics) : [];

  // Explicit mapping for schedule focus → topic ID
  const FOCUS_MAP: Record<string, string> = {
    "big-o notation": "big-o",
    "arrays i — basics": "arrays",
    "arrays ii — advanced": "arrays",
    strings: "string-algorithms",
    "hash maps & sets": "hash-maps",
    "two pointers": "two-pointers",
    "sliding window": "sliding-window",
    recursion: "recursion",
    "linked lists i": "linked-lists",
    "linked lists ii": "linked-lists",
    stacks: "stacks",
    "queues + binary search": "queues",
    "sorting algorithms": "sorting",
    "trees i (dfs)": "trees",
    "trees ii (bfs)": "trees",
    "bsts deep dive": "trees",
    heaps: "heaps",
    "graphs i — bfs/dfs": "graphs",
    "graphs ii — advanced": "advanced-graphs",
    "backtracking i": "backtracking",
    "backtracking ii + greedy": "greedy",
    tries: "tries",
    "dp i — 1d": "dynamic-programming",
    "dp ii — 2d + strings": "dynamic-programming",
    "dp iii — knapsack": "advanced-dp",
    "mixed patterns": "mixed-patterns",
  };

  const findTopic = (text: string) => {
    const mapped = FOCUS_MAP[text.toLowerCase()];
    if (mapped) return allTopics.find((t: any) => t.id === mapped);
    // Fallback fuzzy
    const f = text.toLowerCase();
    return allTopics.find((t: any) => {
      const tt = t.title.toLowerCase();
      return f.includes(tt) || tt.includes(f);
    });
  };

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
        📅 30-Day Study Schedule
      </h1>
      <p style={{ color: th.textS, fontSize: 13, marginBottom: 18 }}>
        Your daily battle plan. Consistency beats intensity every time.
      </p>
      <div
        style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}
      >
        {[
          ["All", 0],
          ["Week 1", 1],
          ["Week 2", 2],
          ["Week 3", 3],
          ["Week 4", 4],
        ].map(([l, v]) => (
          <button
            key={v as number}
            className="tab-pill"
            onClick={() => setWf(v as number)}
            style={{
              background:
                wf === v
                  ? v === 0
                    ? T.teal
                    : wkC[(v as number) - 1]
                  : "rgba(255,255,255,0.07)",
              color: wf === v ? "#000" : th.text,
              fontSize: 12,
            }}
          >
            {l}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {shown.map((d: any) => {
          const c = wkC[d.week - 1];
          const isRev =
            d.focus.toLowerCase().includes("review") ||
            d.focus.toLowerCase().includes("mock");
          const matchedTopic = !isRev ? findTopic(d.focus) : null;
          return (
            <div
              key={d.day}
              onClick={
                matchedTopic ? () => setCurrent(matchedTopic.id) : undefined
              }
              style={{
                display: "flex",
                gap: 12,
                padding: "12px 16px",
                borderRadius: 13,
                background: th.bg2,
                border: `1px solid ${isRev ? c + "28" : th.border}`,
                alignItems: "flex-start",
                cursor: matchedTopic || isRev ? "pointer" : undefined,
                transition: "transform 0.15s",
              }}
              className={matchedTopic || isRev ? "card-hover" : ""}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 38,
                  height: 38,
                  borderRadius: 11,
                  background: isRev ? c : `${c}20`,
                  color: isRev ? "#000" : c,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 14,
                }}
              >
                {d.day}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    marginBottom: 5,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 13,
                      color: matchedTopic ? c : th.text,
                    }}
                  >
                    {matchedTopic ? `${matchedTopic.emoji} ` : ""}
                    {d.focus}
                  </span>
                  {isRev && (
                    <span
                      style={{
                        background: `${c}20`,
                        color: c,
                        fontSize: 9,
                        fontWeight: 800,
                        padding: "1px 7px",
                        borderRadius: 99,
                      }}
                    >
                      REVIEW
                    </span>
                  )}
                  {matchedTopic && (
                    <span style={{ fontSize: 10, color: c, opacity: 0.7 }}>
                      →
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {d.tasks.map((t: string, i: number) => (
                    <div
                      key={i}
                      style={{
                        background: th.bg3,
                        fontSize: 11,
                        padding: "2px 8px",
                        borderRadius: 99,
                        color: th.textS,
                      }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
                {isRev && setCurrent && (
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrent("spaced-review");
                      }}
                      style={{
                        padding: "5px 14px",
                        background: `${T.teal}15`,
                        border: `1px solid ${T.teal}30`,
                        borderRadius: 8,
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: 11,
                        color: T.teal,
                        fontFamily: "'Outfit',sans-serif",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      🧠 Review
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrent("mock-interview");
                      }}
                      style={{
                        padding: "5px 14px",
                        background: `${T.red}12`,
                        border: `1px solid ${T.red}28`,
                        borderRadius: 8,
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: 11,
                        color: T.red,
                        fontFamily: "'Outfit',sans-serif",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      ⏱ Mock
                    </button>
                  </div>
                )}
              </div>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  color: c,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                  flexShrink: 0,
                }}
              >
                W{d.week}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
