import React from "react";
import { T } from "@/utils/tokens";
import { useTheme } from "@/hooks/useTheme";
import { TranslatedCode } from "@/components/editor/TranslatedCode";
import { ProgressRing, SCard } from "@/components/shared/ProgressRing";
import { LangPillMini } from "@/components/editor/LangPill";
import { DEEP_DIVE } from "@/data/deep-dive";

// ── DEEP DIVE SECTION (expandable) ────────────────────────────
export function DeepSection({ title, content, dark, index }: any) {
  const [open, setOpen] = React.useState(index === 0);
  const th = useTheme(dark);
  const icons = ["📖", "🔬", "🧩", "💡", "⚡", "🎯", "🏗️", "🔑"];
  const icon = icons[index % icons.length];

  // Render content with inline code highlighting
  const renderContent = (text: string) => {
    // Split on code blocks (indented lines starting with spaces that look like code)
    const parts = [];
    const lines = text.split("\n");
    let i = 0;
    while (i < lines.length) {
      // Detect code block: line starts with "  " and contains code-like characters
      if (
        lines[i].match(
          /^  \s*(function|const|let|var|if|else|for|while|return|\/\/|queue|visited|dp\[|lo|hi|mid|arr\[)/,
        ) ||
        lines[i].match(/^  \s*[\[\{]/) ||
        (lines[i].startsWith("  ") &&
          lines[i].includes("=") &&
          lines[i].includes(";"))
      ) {
        const codeLines = [];
        while (
          i < lines.length &&
          lines[i].startsWith("  ") &&
          lines[i].trim().length > 0
        ) {
          codeLines.push(lines[i]);
          i++;
        }
        if (codeLines.length > 0) {
          const codeText = codeLines
            .map((l) => l.replace(/^  /, ""))
            .join("\n");
          parts.push({ type: "code", text: codeText });
        }
      } else {
        const textLines = [];
        while (
          i < lines.length &&
          !(
            lines[i].match(
              /^  \s*(function|const|let|var|if|else|for|while|return|\/\/|queue|visited|dp\[|lo|hi|mid|arr\[)/,
            ) ||
            lines[i].match(/^  \s*[\[\{]/) ||
            (lines[i].startsWith("  ") &&
              lines[i].includes("=") &&
              lines[i].includes(";"))
          )
        ) {
          textLines.push(lines[i]);
          i++;
        }
        const t = textLines.join("\n").trim();
        if (t) parts.push({ type: "text", text: t });
      }
    }
    return parts.map((p, pi) => {
      if (p.type === "code") {
        return (
          <pre
            key={pi}
            style={{
              background: dark ? "#0d1117" : "#f4f5f7",
              border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
              borderRadius: 10,
              padding: "12px 14px",
              margin: "10px 0",
              fontSize: 12,
              lineHeight: 1.7,
              fontFamily: "'JetBrains Mono',monospace",
              color: dark ? "#c9d1d9" : "#24292e",
              overflowX: "auto",
              whiteSpace: "pre",
            }}
          >
            {p.text}
          </pre>
        );
      }
      return (
        <div key={pi} style={{ whiteSpace: "pre-wrap" }}>
          {p.text}
        </div>
      );
    });
  };

  return (
    <div
      style={{
        background: th.bg2,
        border: `1px solid ${open ? T.violet + "30" : th.border}`,
        borderRadius: 14,
        marginBottom: 10,
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: "13px 16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 10,
          userSelect: "none",
        }}
      >
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span
          style={{ fontWeight: 700, fontSize: 14, color: th.text, flex: 1 }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: 18,
            color: th.textS,
            transition: "transform 0.2s",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            lineHeight: 1,
          }}
        >
          ›
        </span>
      </div>
      {open && (
        <div
          className="fade-up"
          style={{
            padding: "0 16px 16px",
            fontSize: 13.5,
            lineHeight: 1.9,
            color: th.text,
            borderTop: `1px solid ${th.border}`,
          }}
        >
          <div style={{ paddingTop: 12 }}>{renderContent(content)}</div>
        </div>
      )}
    </div>
  );
}

// ── TOPIC VIEW ─────────────────────────────────────────────────
export function TopicView({
  topic,
  dark,
  progress,
  onToggleTopic,
  onToggleProblem,
  weekColor,
  weekNum,
  setCurrent,
}: any) {
  const [tab, setTab] = React.useState("learn");
  const th = useTheme(dark);
  const donePct = topic.problems.length
    ? Math.round(
        (Object.values(progress.problems || {}).filter(Boolean).length /
          topic.problems.length) *
          100,
      )
    : 0;

  const tabs = [
    { id: "learn", label: "📚 Learn" },
    { id: "code", label: "💻 Code" },
    { id: "practice", label: "🏋️ Practice", badge: topic.problems.length },
  ];

  return (
    <div className="fade-up">
      {/* Breadcrumb */}
      <div className="bc" style={{ marginBottom: 14, color: th.textS }}>
        <span onClick={() => setCurrent("home")}>Home</span>
        <span style={{ opacity: 0.4 }}>›</span>
        <span style={{ color: weekColor }}>Week {weekNum}</span>
        <span style={{ opacity: 0.4 }}>›</span>
        <span style={{ color: th.text, opacity: 1, fontWeight: 600 }}>
          {topic.title}
        </span>
      </div>

      {/* Hero */}
      <div
        style={{
          background: dark
            ? `linear-gradient(135deg,${weekColor}10,${T.d2})`
            : T.l1,
          border: `1px solid ${weekColor}25`,
          borderRadius: 16,
          padding: "20px 22px",
          marginBottom: 16,
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            flexShrink: 0,
            background: `${weekColor}20`,
            border: `1px solid ${weekColor}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
          }}
        >
          {topic.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 150 }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: "-0.4px",
              color: th.text,
              marginBottom: 4,
            }}
          >
            {topic.title}
          </h1>
          <p style={{ fontSize: 13, color: th.textS, lineHeight: 1.6 }}>
            {topic.summary}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexShrink: 0,
            flexWrap: "wrap",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <ProgressRing pct={donePct} size={46} stroke={4} color={weekColor}>
              <span style={{ fontSize: 9, fontWeight: 900, color: weekColor }}>
                {donePct}%
              </span>
            </ProgressRing>
            <div style={{ fontSize: 9, color: th.textS, marginTop: 3 }}>
              problems
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
            }}
            onClick={onToggleTopic}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 8,
                background: progress.topicDone ? weekColor : "transparent",
                border: `2px solid ${progress.topicDone ? weekColor : "rgba(255,255,255,0.2)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
            >
              {progress.topicDone && (
                <span style={{ color: "#000", fontSize: 13, fontWeight: 900 }}>
                  ✓
                </span>
              )}
            </div>
            <span style={{ fontSize: 9, color: th.textS, fontWeight: 600 }}>
              DONE
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            className="tab-pill"
            onClick={() => setTab(t.id)}
            style={{
              background:
                tab === t.id
                  ? weekColor
                  : dark
                    ? "rgba(255,255,255,0.07)"
                    : th.bg3,
              color: tab === t.id ? "#000" : th.text,
            }}
          >
            {t.label}
            {t.badge && (
              <span
                style={{
                  background:
                    tab === t.id ? "rgba(0,0,0,0.18)" : weekColor + "30",
                  color: tab === t.id ? "#000" : weekColor,
                  borderRadius: 99,
                  padding: "0 6px",
                  fontSize: 11,
                  fontWeight: 800,
                }}
              >
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* LEARN TAB */}
      {tab === "learn" && (
        <div className="fade-up">
          <SCard title="🧠 Intuition" dark={dark} accent={weekColor}>
            <div
              style={{
                fontSize: 13.5,
                lineHeight: 1.95,
                color: th.text,
                whiteSpace: "pre-wrap",
              }}
            >
              {topic.intuition}
            </div>
          </SCard>
          {topic.diagram && (
            <SCard title="📐 Visualization" dark={dark}>
              <pre
                style={{
                  fontSize: 12,
                  lineHeight: 1.7,
                  overflowX: "auto",
                  margin: 0,
                  fontFamily: "'JetBrains Mono',monospace",
                  color: th.text,
                  opacity: 0.9,
                }}
              >
                {topic.diagram}
              </pre>
            </SCard>
          )}

          {/* ── DEEP DIVE SECTIONS ── */}
          {DEEP_DIVE[topic.id]?.sections?.map((sec: any, si: number) => (
            <DeepSection
              key={si}
              title={sec.title}
              content={sec.content}
              dark={dark}
              index={si}
            />
          ))}

          <SCard title="⚡ Complexity" dark={dark} accent={T.teal}>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {topic.complexity.common.map((c: any, i: number) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "7px 11px",
                    borderRadius: 8,
                    background: dark ? `${T.teal}0a` : `${T.teal}06`,
                    border: `1px solid ${T.teal}15`,
                    flexWrap: "wrap",
                  }}
                >
                  <code
                    style={{
                      fontWeight: 800,
                      color: T.teal,
                      minWidth: 160,
                      fontSize: 12,
                      fontFamily: "'JetBrains Mono',monospace",
                    }}
                  >
                    {c.name}
                  </code>
                  <span style={{ fontSize: 12.5, color: th.textS }}>
                    {c.desc}
                  </span>
                </div>
              ))}
            </div>
          </SCard>
          <div className="diff-grid">
            <SCard title="🎯 Key Patterns" dark={dark} accent={T.violet}>
              <ul
                style={{
                  margin: 0,
                  padding: "0 0 0 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                {topic.patterns.map((p: any, i: number) => (
                  <li
                    key={i}
                    style={{ fontSize: 13, lineHeight: 1.6, color: th.text }}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </SCard>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <SCard title="⚠️ Common Mistakes" dark={dark} accent={T.red}>
                {topic.mistakes.map((m: any, i: number) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 8,
                      marginBottom: 6,
                      fontSize: 13,
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ color: T.red, flexShrink: 0 }}>✗</span>
                    <span style={{ color: th.text }}>{m}</span>
                  </div>
                ))}
              </SCard>
              <SCard title="🌍 Real-World" dark={dark}>
                {topic.realWorld.map((r: any, i: number) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 8,
                      marginBottom: 5,
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: T.teal, flexShrink: 0 }}>→</span>
                    <span style={{ color: th.textS }}>{r}</span>
                  </div>
                ))}
              </SCard>
            </div>
          </div>
        </div>
      )}

      {/* CODE TAB */}
      {tab === "code" && (
        <div className="fade-up">
          <SCard
            title={
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                💻 Reference Implementation <LangPillMini />
              </span>
            }
            dark={dark}
          >
            <p
              style={{
                fontSize: 12.5,
                color: th.textS,
                marginBottom: 8,
                lineHeight: 1.6,
              }}
            >
              Study each function until you can write it from memory.
            </p>
            <TranslatedCode
              jsCode={topic.code}
              cacheKey={topic.id + "::topic"}
            />
          </SCard>
          <CodeWalkthrough code={topic.code} dark={dark} />
        </div>
      )}

      {/* PRACTICE TAB */}
      {tab === "practice" && (
        <div className="fade-up">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 13, color: th.textS }}>
              {topic.problems.length} problems
            </span>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {["Easy", "Medium", "Hard"].map((d) => {
                const n = topic.problems.filter(
                  (p: any) => p.difficulty === d,
                ).length;
                return n ? (
                  <span
                    key={d}
                    style={{
                      padding: "2px 9px",
                      borderRadius: 99,
                      fontSize: 11,
                      fontWeight: 700,
                      background: (T as any)[d] + "18",
                      color: (T as any)[d],
                    }}
                  >
                    {n} {d}
                  </span>
                ) : null;
              })}
            </div>
          </div>
          {topic.problems.map((p: any, i: number) => (
            <ProblemListItem
              key={p.id}
              problem={p}
              dark={dark}
              index={i}
              done={!!progress.problems?.[p.id]}
              onOpen={() => setCurrent("problem:" + p.id)}
              onToggle={() => onToggleProblem(topic.id, p.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── PROBLEM LIST ITEM (in practice tab) ────────────────────────
export function ProblemListItem({ problem, dark, index, done, onOpen, onToggle }: any) {
  const th = useTheme(dark);
  const dc = (T as any)[problem.difficulty];
  return (
    <div
      style={{
        border: `1px solid ${th.border}`,
        borderRadius: 13,
        marginBottom: 9,
        background: th.bg2,
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = dc + "40")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = th.border)}
    >
      <div
        style={{
          padding: "13px 15px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            opacity: 0.3,
            minWidth: 20,
            color: th.textS,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <div
          style={{
            padding: "2px 9px",
            borderRadius: 99,
            fontSize: 10,
            fontWeight: 800,
            background: dc + "20",
            color: dc,
            flexShrink: 0,
          }}
        >
          {problem.difficulty}
        </div>
        <div
          style={{
            fontWeight: 600,
            flex: 1,
            fontSize: 14,
            color: th.text,
            cursor: "pointer",
          }}
          onClick={onOpen}
        >
          {problem.title}
        </div>
        <button
          onClick={onOpen}
          style={{
            background: `${dc}15`,
            border: `1px solid ${dc}30`,
            borderRadius: 8,
            padding: "4px 12px",
            cursor: "pointer",
            color: dc,
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "'Outfit',sans-serif",
            flexShrink: 0,
          }}
        >
          Solve →
        </button>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            flexShrink: 0,
            cursor: "pointer",
            background: done ? T.teal : "transparent",
            border: `2px solid ${done ? T.teal : "rgba(255,255,255,0.2)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
        >
          {done && (
            <span style={{ color: "#000", fontSize: 11, fontWeight: 900 }}>
              ✓
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Internal reference used by TopicView — CodeWalkthrough is defined in ProblemPage.tsx
// but also needed here; re-declared locally for this module's use.
function CodeWalkthrough({ code, dark }: any) {
  const th = useTheme(dark);
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);

  const funcs = React.useMemo(() => {
    if (!code) return [];
    const blocks: any[] = [];
    const lines = code.split("\n");
    let current: any = null;
    for (const line of lines) {
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

