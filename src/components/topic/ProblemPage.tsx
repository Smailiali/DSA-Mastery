import React from "react";
import { T } from "@/utils/tokens";
import { useTheme } from "@/hooks/useTheme";
import { HintAccordion } from "@/components/shared/HintAccordion";
import { SCard } from "@/components/shared/ProgressRing";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { EditorialPanel } from "./EditorialPanel";
import { ProblemNotes } from "./ProblemNotes";

export function ProblemPage({
  problem,
  topic,
  dark,
  done,
  onToggle,
  onBack,
  weekColor,
}: any) {
  const th = useTheme(dark);
  const dc = (T as any)[problem.difficulty];
  const [tab, setTab] = React.useState("editor");

  return (
    <div className="fade-up">
      {/* Breadcrumb */}
      <div className="bc" style={{ marginBottom: 14, color: th.textS }}>
        <span onClick={() => onBack("home")}>Home</span>
        <span style={{ opacity: 0.4 }}>›</span>
        <span style={{ color: weekColor }} onClick={() => onBack(topic.id)}>
          {topic.title}
        </span>
        <span style={{ opacity: 0.4 }}>›</span>
        <span style={{ color: th.text, opacity: 1, fontWeight: 600 }}>
          {problem.title}
        </span>
      </div>

      {/* Header */}
      <div
        style={{
          background: dark ? `linear-gradient(135deg,${dc}0d,${T.d2})` : T.l1,
          border: `1px solid ${dc}25`,
          borderRadius: 16,
          padding: "18px 20px",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 4,
            }}
          >
            <h1
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: th.text,
                letterSpacing: "-0.3px",
              }}
            >
              {problem.title}
            </h1>
            <span
              style={{
                padding: "2px 10px",
                borderRadius: 99,
                fontSize: 11,
                fontWeight: 800,
                background: dc + "20",
                color: dc,
              }}
            >
              {problem.difficulty}
            </span>
          </div>
          <div style={{ fontSize: 12, color: th.textS }}>
            {topic.title} · Practice Problem
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            onClick={onToggle}
            style={{
              width: 26,
              height: 26,
              borderRadius: 8,
              cursor: "pointer",
              flexShrink: 0,
              background: done ? T.teal : "transparent",
              border: `2px solid ${done ? T.teal : "rgba(255,255,255,0.2)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
          >
            {done && (
              <span style={{ color: "#000", fontSize: 13, fontWeight: 900 }}>
                ✓
              </span>
            )}
          </div>
          <span style={{ fontSize: 12, color: th.textS, fontWeight: 600 }}>
            {done ? "Solved ✓" : "Mark solved"}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}
      >
        {[
          ["editor", "💻 Code Editor"],
          ["description", "📋 Description"],
          ["hints", "💡 Hints"],
          ["notes", "📝 Notes"],
        ].map(([id, label]) => (
          <button
            key={id}
            className="tab-pill"
            onClick={() => setTab(id)}
            style={{
              background:
                tab === id
                  ? weekColor
                  : dark
                    ? "rgba(255,255,255,0.07)"
                    : th.bg3,
              color: tab === id ? "#000" : th.text,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "editor" && (
        <div className="fade-up">
          <CodeEditor problem={problem} dark={dark} />
        </div>
      )}

      {tab === "description" && (
        <div className="fade-up">
          <SCard dark={dark} accent={dc}>
            <div
              style={{
                fontSize: 14,
                lineHeight: 1.8,
                color: th.text,
                whiteSpace: "pre-wrap",
                marginBottom: 12,
              }}
            >
              {problem.description}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {problem.examples.map((ex: any, i: number) => (
                <div
                  key={i}
                  style={{
                    background: dark ? `${T.teal}0a` : `${T.teal}0d`,
                    border: `1px solid ${T.teal}20`,
                    borderRadius: 9,
                    padding: "9px 13px",
                    fontSize: 12,
                    fontFamily: "'JetBrains Mono',monospace",
                    color: th.text,
                  }}
                >
                  <span style={{ color: T.teal, fontWeight: 700 }}>
                    Input:{" "}
                  </span>
                  {ex.input}
                  <span
                    style={{ color: T.amber, fontWeight: 700, marginLeft: 12 }}
                  >
                    Output:{" "}
                  </span>
                  {ex.output}
                </div>
              ))}
            </div>
          </SCard>
          {problem.whyInterviewers && (
            <div
              style={{
                background: `${T.red}0a`,
                border: `1px solid ${T.red}20`,
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 12,
                lineHeight: 1.6,
                color: th.text,
              }}
            >
              <span style={{ fontWeight: 700, color: T.red }}>
                🎯 Why interviewers love this:{" "}
              </span>
              <span style={{ color: th.textS }}>{problem.whyInterviewers}</span>
            </div>
          )}
        </div>
      )}

      {tab === "hints" && (
        <div className="fade-up">
          <HintAccordion hints={problem.hints} dark={dark} />
          <div style={{ marginTop: 14 }}>
            <div
              style={{
                background: `${T.violet}10`,
                border: `1px solid ${T.violet}25`,
                borderRadius: 10,
                padding: "11px 14px",
                fontSize: 13,
                lineHeight: 1.6,
                color: th.text,
              }}
            >
              <span style={{ fontWeight: 700, color: T.violet }}>
                ✅ Approach:{" "}
              </span>
              {problem.solution}
            </div>
          </div>
          <EditorialPanel problemId={problem.id} dark={dark} />
        </div>
      )}
      {tab === "notes" && (
        <div className="fade-up">
          <ProblemNotes problemId={problem.id} dark={dark} />
        </div>
      )}
    </div>
  );
}

// ── CODE WALKTHROUGH (breaks code into annotated functions) ───
export function CodeWalkthrough({ code, dark }: any) {
  const th = useTheme(dark);
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);

  // Parse code into functions: split on "// N." or "function" at start of line
  const funcs = React.useMemo(() => {
    if (!code) return [];
    const blocks: any[] = [];
    const lines = code.split("\n");
    let current: any = null;
    for (const line of lines) {
      // Detect function start: comment header like "// 1. Name" or "function name("
      const headerMatch = line.match(/^\/\/\s*\d+\.\s*(.+)/);
      const funcMatch = line.match(/^function\s+(\w+)/);
      if (headerMatch || (funcMatch && !current)) {
        if (current && current.lines.length) blocks.push(current);
        current = {
          title: headerMatch
            ? headerMatch[1].trim()
            : funcMatch
              ? funcMatch[1]
              : "Code",
          lines: [],
          comments: [],
        };
      }
      if (!current)
        current = { title: "Implementation", lines: [], comments: [] };
      current.lines.push(line);
      // Extract inline comments
      const cm = line.match(/\/\/\s*(.+)$/);
      if (cm && !line.trim().startsWith("//"))
        current.comments.push(cm[1].trim());
    }
    if (current && current.lines.length) blocks.push(current);
    return blocks;
  }, [code]);

  if (funcs.length <= 1) return null;

  return (
    <div style={{ marginTop: 2 }}>
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: T.violet,
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        🔍 Code Walkthrough{" "}
        <span style={{ fontWeight: 400, opacity: 0.6 }}>
          — click each function to study
        </span>
      </div>
      {funcs.map((fn, i) => (
        <div
          key={i}
          style={{
            background: th.bg2,
            border: `1px solid ${openIdx === i ? T.teal + "40" : th.border}`,
            borderRadius: 12,
            marginBottom: 8,
            overflow: "hidden",
            transition: "border-color 0.2s",
          }}
        >
          <div
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            style={{
              padding: "10px 14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                background: T.teal + "20",
                color: T.teal,
                borderRadius: 6,
                padding: "1px 8px",
                fontSize: 11,
                fontWeight: 800,
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {i + 1}
            </span>
            <span
              style={{ fontWeight: 700, fontSize: 13, color: th.text, flex: 1 }}
            >
              {fn.title}
            </span>
            {fn.comments.length > 0 && (
              <span
                style={{
                  fontSize: 10,
                  color: th.textS,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 99,
                  padding: "1px 8px",
                }}
              >
                {fn.comments.length} annotations
              </span>
            )}
            <span
              style={{
                fontSize: 16,
                color: th.textS,
                transition: "transform 0.2s",
                transform: openIdx === i ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              ›
            </span>
          </div>
          {openIdx === i && (
            <div
              className="fade-up"
              style={{ borderTop: `1px solid ${th.border}` }}
            >
              <pre
                style={{
                  background: dark ? "#0d1117" : "#f4f5f7",
                  margin: 0,
                  padding: "14px 16px",
                  fontSize: 12,
                  lineHeight: 1.8,
                  fontFamily: "'JetBrains Mono',monospace",
                  color: dark ? "#c9d1d9" : "#24292e",
                  overflowX: "auto",
                  whiteSpace: "pre",
                }}
              >
                {fn.lines.join("\n")}
              </pre>
              {fn.comments.length > 0 && (
                <div
                  style={{
                    padding: "10px 14px",
                    background: `${T.teal}06`,
                    borderTop: `1px solid ${T.teal}15`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: T.teal,
                      marginBottom: 6,
                    }}
                  >
                    KEY INSIGHTS
                  </div>
                  {fn.comments.map((c: any, ci: number) => (
                    <div
                      key={ci}
                      style={{
                        display: "flex",
                        gap: 6,
                        marginBottom: 4,
                        fontSize: 12,
                        color: th.text,
                      }}
                    >
                      <span style={{ color: T.teal, flexShrink: 0 }}>→</span>
                      <span style={{ lineHeight: 1.6 }}>{c}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
