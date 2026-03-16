import React from "react";
import { T } from "@/utils/tokens";
import { useTheme } from "@/hooks/useTheme";
import { TranslatedCode } from "@/components/editor/TranslatedCode";

export function MixedPatternsView({ dark, patterns }: any) {
  const [active, setActive] = React.useState(null);
  const th = useTheme(dark);
  const TC: Record<string, string> = {
    "Sliding Window": T.teal,
    "Hash Map": T.violet,
    Graph: "#dc2626",
    BFS: T.blue,
    "Topological Sort": T.violet,
    Heap: T.amber,
    Stack: "#059669",
    Design: "#db2777",
    "Hash Set": "#0891b2",
    Greedy: T.amber,
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
        🔀 Mixed Patterns
      </h1>
      <p style={{ color: th.textS, fontSize: 13, marginBottom: 16 }}>
        Problems combining multiple techniques — hardest real interview
        questions.
      </p>
      <div
        style={{
          background: `${T.amber}0a`,
          border: `1px solid ${T.amber}20`,
          borderRadius: 11,
          padding: "11px 14px",
          marginBottom: 18,
          fontSize: 13,
          color: th.text,
          lineHeight: 1.5,
        }}
      >
        <strong style={{ color: T.amber }}>🧠 Strategy: </strong>Identify slow
        core op → pick DS that fixes it → check if another DS handles rest →
        combine.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {patterns.map((p: any) => (
          <div
            key={p.id}
            style={{
              border: `1px solid ${active === p.id ? T.violet + "40" : th.border}`,
              borderRadius: 14,
              overflow: "hidden",
              background: th.bg2,
              transition: "border-color 0.2s",
            }}
          >
            <div
              className="problem-row"
              onClick={() => setActive(active === p.id ? null : p.id)}
              style={{
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    marginBottom: 6,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{ fontWeight: 800, fontSize: 14, color: th.text }}
                  >
                    {p.title}
                  </span>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: 99,
                      fontSize: 10,
                      fontWeight: 800,
                      background: (T as any)[p.difficulty] + "20",
                      color: (T as any)[p.difficulty],
                    }}
                  >
                    {p.difficulty}
                  </span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {p.tags.map((tag: string) => (
                    <span
                      key={tag}
                      style={{
                        padding: "2px 7px",
                        borderRadius: 99,
                        fontSize: 10,
                        fontWeight: 700,
                        background: (TC[tag] || "#888") + "18",
                        color: TC[tag] || "#888",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span style={{ opacity: 0.3, fontSize: 10 }}>
                {active === p.id ? "▲" : "▼"}
              </span>
            </div>
            {active === p.id && (
              <div
                className="fade-up"
                style={{
                  padding: "0 16px 16px",
                  borderTop: `1px solid ${th.border}`,
                }}
              >
                <div
                  style={{
                    paddingTop: 12,
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: th.text,
                    marginBottom: 10,
                  }}
                >
                  {p.description}
                </div>
                <div
                  style={{
                    background: `${T.violet}0e`,
                    border: `1px solid ${T.violet}22`,
                    borderRadius: 9,
                    padding: "10px 13px",
                    fontSize: 13,
                    marginBottom: 10,
                    color: th.text,
                    lineHeight: 1.6,
                  }}
                >
                  <strong style={{ color: T.violet }}>💡 </strong>
                  {p.insight}
                </div>
                <TranslatedCode
                  jsCode={p.code}
                  cacheKey={`mixed-${p.id}::code`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
