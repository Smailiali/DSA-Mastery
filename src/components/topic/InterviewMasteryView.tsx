import React from "react";
import { T } from "@/utils/tokens";
import { useTheme } from "@/hooks/useTheme";
import { SafeStorage } from "@/utils/SafeStorage";
import { SCard } from "@/components/shared/ProgressRing";

export function InterviewMasteryView({ dark, problems, setCurrent, allProblems }: any) {
  const [filter, setFilter] = React.useState("All");
  const [expanded, setExpanded] = React.useState(null);
  const [checked, setChecked] = React.useState<Record<string, boolean>>(() =>
    SafeStorage.get<Record<string, boolean>>("dsa-iv25-checked", {}) ?? {},
  );
  const th = useTheme(dark);
  const shown =
    filter === "All"
      ? problems
      : problems.filter((p: any) => p.difficulty === filter);
  const doneCount = Object.values(checked).filter(Boolean).length;
  const toggle = (id: any) => {
    const up = { ...checked, [id]: !(checked as any)[id] };
    setChecked(up);
    SafeStorage.set("dsa-iv25-checked", up);
  };
  const findMatch = (title: string) => {
    if (!allProblems) return null;
    const t = title.toLowerCase();
    return allProblems.find((p: any) => {
      const pt = p.title.toLowerCase();
      return pt === t || pt.includes(t) || t.includes(pt);
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
        🏆 Interview Mastery
      </h1>
      <p
        style={{
          color: th.textS,
          fontSize: 13,
          marginBottom: 18,
          lineHeight: 1.6,
        }}
      >
        The 25 most frequently asked problems + the mental framework to crack
        any interview.
      </p>
      <SCard title="🧠 The 6-Step Framework" dark={dark} accent={T.teal}>
        {[
          [
            "1. Understand",
            "Restate the problem. Ask: constraints? edge cases?",
          ],
          [
            "2. Examples",
            "Walk through 2–3 examples — this reveals the pattern.",
          ],
          ["3. Brute Force", "State the naive O(n²) approach first."],
          [
            "4. Optimize",
            "Ask: what data structure eliminates the bottleneck?",
          ],
          ["5. Code", "Write clean, narrate your thinking."],
          ["6. Test", "Trace with examples. Check edge cases."],
        ].map(([s, d], i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              marginBottom: i < 5 ? 10 : 0,
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                background: T.teal,
                color: "#000",
                borderRadius: 7,
                padding: "2px 9px",
                fontSize: 10,
                fontWeight: 900,
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {s}
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: th.text }}>
              {d}
            </div>
          </div>
        ))}
      </SCard>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: 6, flex: 1, flexWrap: "wrap" }}>
          {["All", "Easy", "Medium", "Hard"].map((d) => (
            <button
              key={d}
              className="tab-pill"
              onClick={() => setFilter(d)}
              style={{
                background:
                  filter === d
                    ? d === "All"
                      ? T.teal
                      : (T as any)[d]
                    : "rgba(255,255,255,0.07)",
                color: filter === d ? "#000" : th.text,
                fontSize: 12,
              }}
            >
              {d}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 12, color: T.teal, fontWeight: 700 }}>
          {doneCount}/25 mastered
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {shown.map((p: any, i: number) => {
          const isOpen = expanded === p.id;
          const match = findMatch(p.title);
          return (
            <div
              key={p.id}
              className="card-hover"
              style={{
                borderRadius: 12,
                background: th.bg2,
                border: `1px solid ${isOpen ? T.violet + "40" : th.border}`,
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              <div
                onClick={() => setExpanded(isOpen ? null : p.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "11px 14px",
                  cursor: "pointer",
                  flexWrap: "wrap",
                }}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(p.id);
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    flexShrink: 0,
                    cursor: "pointer",
                    background: (checked as any)[p.id] ? T.teal : "transparent",
                    border: `2px solid ${(checked as any)[p.id] ? T.teal : "rgba(255,255,255,0.2)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                >
                  {(checked as any)[p.id] && (
                    <span
                      style={{ color: "#000", fontSize: 11, fontWeight: 900 }}
                    >
                      ✓
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    opacity: 0.3,
                    minWidth: 20,
                    color: th.textS,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  style={{
                    padding: "2px 9px",
                    borderRadius: 99,
                    fontSize: 10,
                    fontWeight: 800,
                    background: (T as any)[p.difficulty] + "20",
                    color: (T as any)[p.difficulty],
                    flexShrink: 0,
                  }}
                >
                  {p.difficulty}
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 13,
                      color: th.text,
                      textDecoration: (checked as any)[p.id] ? "line-through" : "none",
                      opacity: (checked as any)[p.id] ? 0.6 : 1,
                    }}
                  >
                    {p.title}
                  </div>
                  <div style={{ fontSize: 11, color: th.textS }}>{p.combo}</div>
                </div>
                <div
                  style={{
                    background: `${T.violet}15`,
                    color: T.violet,
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 9px",
                    borderRadius: 99,
                    flexShrink: 0,
                  }}
                >
                  {p.pattern}
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color: th.textS,
                    transition: "transform 0.2s",
                    transform: isOpen ? "rotate(90deg)" : "rotate(0)",
                  }}
                >
                  ›
                </span>
              </div>
              {isOpen && (
                <div
                  className="fade-up"
                  style={{
                    padding: "0 14px 14px",
                    borderTop: `1px solid ${th.border}`,
                  }}
                >
                  <div style={{ paddingTop: 12 }}>
                    <div
                      style={{
                        fontSize: 13,
                        color: th.text,
                        lineHeight: 1.7,
                        marginBottom: 10,
                      }}
                    >
                      <span style={{ fontWeight: 700, color: T.teal }}>
                        💡 Key Insight:{" "}
                      </span>
                      {p.desc}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                        marginBottom: 10,
                      }}
                    >
                      <div
                        style={{
                          background: `${T.amber}0d`,
                          border: `1px solid ${T.amber}20`,
                          borderRadius: 8,
                          padding: "6px 10px",
                          fontSize: 11,
                          color: th.text,
                        }}
                      >
                        <span style={{ fontWeight: 700, color: T.amber }}>
                          Pattern:{" "}
                        </span>
                        {p.pattern}
                      </div>
                      <div
                        style={{
                          background: `${T.violet}0d`,
                          border: `1px solid ${T.violet}20`,
                          borderRadius: 8,
                          padding: "6px 10px",
                          fontSize: 11,
                          color: th.text,
                        }}
                      >
                        <span style={{ fontWeight: 700, color: T.violet }}>
                          Combo:{" "}
                        </span>
                        {p.combo}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {match && setCurrent && (
                        <button
                          onClick={() => setCurrent("problem:" + match.id)}
                          style={{
                            background: `linear-gradient(135deg,${T.teal},#00b894)`,
                            border: "none",
                            borderRadius: 9,
                            padding: "8px 16px",
                            cursor: "pointer",
                            fontWeight: 700,
                            fontSize: 12,
                            color: "#000",
                            fontFamily: "'Outfit',sans-serif",
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          💻 Solve in Editor →
                        </button>
                      )}
                      <a
                        href={`https://leetcode.com/problems/${p.title
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)/g, "")}/`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: `1px solid ${th.border}`,
                          borderRadius: 9,
                          padding: "8px 16px",
                          cursor: "pointer",
                          fontWeight: 600,
                          fontSize: 12,
                          color: th.textS,
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          fontFamily: "'Outfit',sans-serif",
                        }}
                      >
                        🔗 LeetCode
                      </a>
                      <button
                        onClick={() => toggle(p.id)}
                        style={{
                          background: (checked as any)[p.id]
                            ? `${T.teal}15`
                            : "rgba(255,255,255,0.07)",
                          border: `1px solid ${(checked as any)[p.id] ? T.teal + "30" : th.border}`,
                          borderRadius: 9,
                          padding: "8px 16px",
                          cursor: "pointer",
                          fontWeight: 700,
                          fontSize: 12,
                          color: (checked as any)[p.id] ? T.teal : th.text,
                          fontFamily: "'Outfit',sans-serif",
                        }}
                      >
                        {(checked as any)[p.id] ? "✓ Mastered" : "Mark Mastered"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
