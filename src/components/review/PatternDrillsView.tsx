import React from "react";
import { T } from "@/utils/tokens";
import { useTheme } from "@/hooks/useTheme";
import { fmtTime, getLocalDateStr } from "@/utils/dateUtils";
import { SafeStorage } from "@/utils/SafeStorage";
import { SCard, ProgressRing } from "@/components/shared/ProgressRing";
import { TranslatedCode } from "@/components/editor/TranslatedCode";

export function PatternDrillsView({ dark, drills }: any) {
  const [idx, setIdx] = React.useState(0);
  const [shown, setShown] = React.useState(false);
  const [score, setScore] = React.useState({ right: 0, wrong: 0 });
  const [results, setResults] = React.useState({}); // {drillIdx: true/false} — latest result per drill
  const [round, setRound] = React.useState(1);
  const th = useTheme(dark);
  const drill = drills[idx];
  const next = (ok: boolean) => {
    setScore((s) => ({
      right: s.right + (ok ? 1 : 0),
      wrong: s.wrong + (ok ? 0 : 1),
    }));
    setResults((r) => ({ ...r, [idx]: ok }));
    setShown(false);
    const nextIdx = (idx + 1) % drills.length;
    if (nextIdx === 0) setRound((r) => r + 1);
    setIdx(nextIdx);
  };
  const total = score.right + score.wrong,
    acc = total ? Math.round((score.right / total) * 100) : 0;
  const ac = acc >= 80 ? T.teal : acc >= 60 ? T.amber : T.red;
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
        🎯 Pattern Drills
      </h1>
      <p style={{ color: th.textS, fontSize: 13, marginBottom: 18 }}>
        Build the instinct to identify the right approach in seconds.
        {round > 1 ? ` Round ${round}.` : ""}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 10,
          marginBottom: 18,
        }}
      >
        {[
          ["Correct", score.right, T.teal],
          ["Wrong", score.wrong, T.red],
          ["Accuracy", total ? acc + "%" : "—", ac],
        ].map(([l, v, c]) => (
          <div
            key={l as string}
            style={{
              background: th.bg2,
              border: `1px solid ${c}20`,
              borderRadius: 13,
              padding: "13px",
              textAlign: "center",
            }}
          >
            <div
              style={{ fontSize: 24, fontWeight: 900, color: c as string, lineHeight: 1 }}
            >
              {v as any}
            </div>
            <div style={{ fontSize: 11, color: th.textS, marginTop: 3 }}>
              {l as string}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          background: dark
            ? `linear-gradient(135deg,${T.violet}10,${T.teal}08,${T.d2})`
            : T.l1,
          border: `1px solid ${T.violet}25`,
          borderRadius: 18,
          padding: "26px 28px",
          marginBottom: 14,
          position: "relative",
          minHeight: 180,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 18,
            fontSize: 11,
            fontWeight: 700,
            color: th.textS,
          }}
        >
          {idx + 1}/{drills.length}
        </div>
        <div
          style={{
            fontSize: 9,
            fontWeight: 800,
            color: T.violet,
            textTransform: "uppercase",
            letterSpacing: ".08em",
            marginBottom: 12,
          }}
        >
          Identify the Pattern
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            lineHeight: 1.65,
            color: th.text,
            marginBottom: 20,
          }}
        >
          {drill.q}
        </div>
        {!shown ? (
          <button
            onClick={() => setShown(true)}
            style={{
              background: `linear-gradient(135deg,${T.violet},#6d28d9)`,
              border: "none",
              borderRadius: 11,
              color: "#fff",
              padding: "10px 24px",
              cursor: "pointer",
              fontWeight: 800,
              fontSize: 14,
              fontFamily: "'Outfit',sans-serif",
            }}
          >
            Reveal Answer
          </button>
        ) : (
          <div className="fade-up">
            <div
              style={{
                background: `${T.teal}14`,
                border: `1px solid ${T.teal}30`,
                borderRadius: 11,
                padding: "12px 16px",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  color: T.teal,
                  letterSpacing: ".06em",
                  marginBottom: 3,
                }}
              >
                ANSWER
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: th.text }}>
                {drill.a}
              </div>
            </div>
            <div
              style={{
                fontSize: 12,
                color: th.textS,
                marginBottom: 14,
                lineHeight: 1.6,
              }}
            >
              💡 {drill.hint}
            </div>
            <div style={{ display: "flex", gap: 9 }}>
              <button
                onClick={() => next(true)}
                style={{
                  flex: 1,
                  background: `linear-gradient(135deg,${T.teal},#00b894)`,
                  border: "none",
                  borderRadius: 11,
                  padding: "10px",
                  cursor: "pointer",
                  fontWeight: 800,
                  fontSize: 14,
                  color: "#000",
                  fontFamily: "'Outfit',sans-serif",
                }}
              >
                ✅ Got it!
              </button>
              <button
                onClick={() => next(false)}
                style={{
                  flex: 1,
                  background: `${T.red}14`,
                  border: `1px solid ${T.red}28`,
                  borderRadius: 11,
                  padding: "10px",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 14,
                  color: T.red,
                  fontFamily: "'Outfit',sans-serif",
                }}
              >
                ❌ Missed
              </button>
            </div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {drills.map((_: any, i: number) => {
          const r = (results as any)[i];
          return (
            <div
              key={i}
              onClick={() => {
                setIdx(i);
                setShown(false);
              }}
              style={{
                width: 20,
                height: 20,
                borderRadius: 5,
                cursor: "pointer",
                background:
                  i === idx
                    ? T.violet
                    : r !== undefined
                      ? r
                        ? T.teal + "60"
                        : T.red + "60"
                      : th.bg3,
                border: `2px solid ${i === idx ? T.violet : "transparent"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 8,
                transition: "all 0.12s",
                color: r !== undefined ? (r ? T.teal : T.red) : th.textS,
              }}
            >
              {r !== undefined ? (r ? "✓" : "✗") : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MockInterviewView({ dark, mockProblems }: any) {
  const [stage, setStage] = React.useState("select"); // select | phase | debrief | history
  const [sel, setSel] = React.useState(null);
  const [tLeft, setTLeft] = React.useState(0);
  const [phase, setPhase] = React.useState(0); // 0=clarify, 1=plan, 2=code, 3=test, 4=optimize
  const [showH, setShowH] = React.useState(false);
  const [showS, setShowS] = React.useState(false);
  const [notes, setNotes] = React.useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
  });
  const [checks, setChecks] = React.useState({});
  const [rating, setRating] = React.useState(0);
  const [history, setHistory] = React.useState<any[]>(() =>
    SafeStorage.get<any[]>("dsa-mock-history", []) ?? [],
  );
  const [showHistoryView, setShowHistoryView] = React.useState(false);
  const timerRef = React.useRef<any>();
  const startTimeRef = React.useRef(0);
  const th = useTheme(dark);
  const prob = mockProblems.find((p: any) => p.id === sel);

  const PHASES = [
    {
      name: "Clarify",
      icon: "🔍",
      time: 2,
      desc: "Restate the problem. Ask about constraints, edge cases, input size.",
    },
    {
      name: "Plan",
      icon: "📝",
      time: 5,
      desc: "Identify the pattern. State brute force first, then optimize. Explain your approach.",
    },
    {
      name: "Code",
      icon: "💻",
      time: 20,
      desc: "Write clean code. Use clear names. Narrate as you go.",
    },
    {
      name: "Test",
      icon: "🧪",
      time: 3,
      desc: "Trace through examples. Check edge cases: empty, single element, duplicates.",
    },
    {
      name: "Optimize",
      icon: "⚡",
      time: 5,
      desc: "State time/space complexity. Can you improve? Discuss tradeoffs.",
    },
  ];

  const start = (p: any) => {
    setSel(p.id);
    setShowH(false);
    setShowS(false);
    setPhase(0);
    setRating(0);
    setChecks({});
    setNotes({ 0: "", 1: "", 2: "", 3: "", 4: "" });
    setTLeft(p.time * 60);
    setStage("phase");
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(
      () =>
        setTLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            setStage("debrief");
            return 0;
          }
          return t - 1;
        }),
      1000,
    );
  };
  const endEarly = () => {
    clearInterval(timerRef.current);
    setStage("debrief");
  };
  React.useEffect(() => () => clearInterval(timerRef.current), []);
  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const urg = tLeft < 60 ? T.red : tLeft < 180 ? T.amber : T.teal;
  const upct = prob ? (tLeft / (prob.time * 60)) * 100 : 100;

  const saveSession = () => {
    const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
    const checkedCount = Object.values(checks).filter(Boolean).length;
    const entry = {
      id: sel,
      title: prob?.title || "",
      difficulty: prob?.difficulty || "",
      date: getLocalDateStr(),
      elapsed,
      rating,
      checkedCount,
      totalChecks: 6,
      usedHint: showH,
      usedSolution: showS,
    };
    const updated = [entry, ...history].slice(0, 30);
    setHistory(updated);
    SafeStorage.set("dsa-mock-history", updated);
  };

  // ── SELECT ──
  if (stage === "select")
    return (
      <div className="fade-up">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 4,
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <h1
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: th.text,
              letterSpacing: "-0.4px",
            }}
          >
            ⏱️ Mock Interview
          </h1>
          {history.length > 0 && (
            <button
              onClick={() => setShowHistoryView(!showHistoryView)}
              style={{
                background: "rgba(255,255,255,0.07)",
                border: `1px solid ${th.border}`,
                borderRadius: 9,
                padding: "6px 14px",
                cursor: "pointer",
                color: th.text,
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "'Outfit',sans-serif",
              }}
            >
              {showHistoryView
                ? "← Problems"
                : "📊 History (" + history.length + ")"}
            </button>
          )}
        </div>
        <p style={{ color: th.textS, fontSize: 13, marginBottom: 16 }}>
          Simulate real interview conditions with structured phases.
        </p>

        {showHistoryView ? (
          <div className="fade-up">
            <SCard title="📊 Session History" dark={dark}>
              {history.map((h: any, i: number) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "9px 12px",
                    borderRadius: 9,
                    background: th.bg3 || th.bg2,
                    border: `1px solid ${th.border}`,
                    marginBottom: 6,
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontSize: 14 }}>
                    {h.rating >= 4 ? "✅" : h.rating >= 3 ? "🟡" : "🔴"}
                  </span>
                  <div style={{ flex: 1, minWidth: 100 }}>
                    <div
                      style={{ fontSize: 13, fontWeight: 700, color: th.text }}
                    >
                      {h.title}
                    </div>
                    <div style={{ fontSize: 11, color: th.textS }}>
                      {h.date} · {fmtTime(h.elapsed)} · {h.checkedCount}/6
                      checklist{h.usedHint ? " · used hint" : ""}
                      {h.usedSolution ? " · used solution" : ""}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: 12,
                          opacity: s <= h.rating ? 1 : 0.2,
                        }}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </SCard>
          </div>
        ) : (
          <>
            <div
              style={{
                background: `${T.amber}0a`,
                border: `1px solid ${T.amber}25`,
                borderRadius: 11,
                padding: "11px 14px",
                marginBottom: 18,
                fontSize: 13,
                color: th.text,
                lineHeight: 1.6,
              }}
            >
              <strong style={{ color: T.amber }}>📋 Interview Phases: </strong>
              Clarify (2 min) → Plan (5 min) → Code (20 min) → Test (3 min) →
              Optimize (5 min)
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {mockProblems.map((p: any) => {
                const pastSessions = history.filter((h: any) => h.id === p.id);
                const bestRating = pastSessions.length
                  ? Math.max(...pastSessions.map((h: any) => h.rating))
                  : 0;
                return (
                  <div
                    key={p.id}
                    className="card-hover"
                    onClick={() => start(p)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "16px 18px",
                      borderRadius: 14,
                      background: th.bg2,
                      border: `1px solid ${th.border}`,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 7,
                          marginBottom: 3,
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: 14,
                            color: th.text,
                          }}
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
                        {bestRating > 0 && (
                          <span style={{ fontSize: 10, color: th.textS }}>
                            {pastSessions.length}× attempted
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: th.textS }}>
                        {p.category} · {p.time} min
                        {bestRating > 0
                          ? ` · best: ${"⭐".repeat(bestRating)}`
                          : ""}
                      </div>
                    </div>
                    <div
                      style={{
                        background: `${T.teal}15`,
                        color: T.teal,
                        borderRadius: 10,
                        padding: "7px 14px",
                        fontSize: 13,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      Start →
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    );

  // ── ACTIVE INTERVIEW (phased) ──
  if (stage === "phase" && prob) {
    const ph = PHASES[phase];
    return (
      <div className="fade-up">
        {/* Timer bar */}
        <div
          style={{
            background: th.bg2,
            border: `1px solid ${urg}30`,
            borderRadius: 14,
            padding: "14px 18px",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <ProgressRing pct={upct} size={54} stroke={4} color={urg}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 900,
                color: urg,
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {fmt(tLeft)}
            </span>
          </ProgressRing>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: th.text }}>
              {prob.title}
            </div>
            <div style={{ fontSize: 12, color: th.textS }}>
              {prob.category} · {prob.difficulty}
            </div>
          </div>
          <button
            onClick={endEarly}
            style={{
              background: `${T.red}14`,
              border: `1px solid ${T.red}28`,
              borderRadius: 9,
              padding: "7px 14px",
              cursor: "pointer",
              color: T.red,
              fontWeight: 700,
              fontSize: 13,
              fontFamily: "'Outfit',sans-serif",
              flexShrink: 0,
            }}
          >
            End Early
          </button>
        </div>

        {/* Phase navigation */}
        <div
          style={{
            display: "flex",
            gap: 4,
            marginBottom: 14,
            overflowX: "auto",
            paddingBottom: 4,
          }}
        >
          {PHASES.map((p, i) => (
            <button
              key={i}
              onClick={() => setPhase(i)}
              style={{
                padding: "6px 14px",
                borderRadius: 99,
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                background:
                  i === phase
                    ? `${T.violet}20`
                    : i < phase
                      ? `${T.teal}12`
                      : "rgba(255,255,255,0.05)",
                border: `1px solid ${i === phase ? T.violet + "40" : i < phase ? T.teal + "25" : "transparent"}`,
                color: i === phase ? T.violet : i < phase ? T.teal : th.textS,
                fontFamily: "'Outfit',sans-serif",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {p.icon} {p.name}
            </button>
          ))}
        </div>

        {/* Current phase */}
        <div
          style={{
            background: `${T.violet}08`,
            border: `1px solid ${T.violet}20`,
            borderRadius: 12,
            padding: "12px 16px",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: th.text,
              marginBottom: 4,
            }}
          >
            {ph.icon} Phase {phase + 1}: {ph.name}{" "}
            <span style={{ fontSize: 12, fontWeight: 400, color: th.textS }}>
              ({ph.time} min suggested)
            </span>
          </div>
          <div style={{ fontSize: 13, color: th.textS, lineHeight: 1.6 }}>
            {ph.desc}
          </div>
        </div>

        {/* Problem description */}
        <SCard title="📋 Problem" dark={dark} accent={T.teal}>
          <div style={{ fontSize: 14, lineHeight: 1.8, color: th.text }}>
            {prob.desc}
          </div>
        </SCard>

        {/* Workspace for current phase */}
        <SCard title={`📝 ${ph.name} Notes`} dark={dark}>
          <textarea
            value={(notes as any)[phase] || ""}
            onChange={(e) =>
              setNotes((n) => ({ ...n, [phase]: e.target.value }))
            }
            placeholder={
              phase === 0
                ? "Restate the problem. What are the constraints? Edge cases?"
                : phase === 1
                  ? "What pattern fits? Brute force approach? Optimal approach?"
                  : phase === 2
                    ? "Write your solution here..."
                    : phase === 3
                      ? "Trace through example inputs. What edge cases to test?"
                      : "Time complexity? Space complexity? Can you optimize?"
            }
            style={{
              width: "100%",
              minHeight: phase === 2 ? 220 : 120,
              background: dark ? "#0d1117" : "#f4f5f7",
              color: dark ? "#c9d1d9" : "#24292e",
              border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              borderRadius: 9,
              padding: "12px",
              fontSize: 13,
              fontFamily: "'JetBrains Mono',monospace",
              lineHeight: 1.7,
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </SCard>

        {/* Hint/Solution (penalized) */}
        <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
          {!showH && (
            <button
              onClick={() => setShowH(true)}
              style={{
                background: `${T.amber}14`,
                border: `1px solid ${T.amber}28`,
                borderRadius: 9,
                padding: "8px 16px",
                cursor: "pointer",
                color: T.amber,
                fontWeight: 700,
                fontSize: 13,
                fontFamily: "'Outfit',sans-serif",
              }}
            >
              💡 Hint (noted in debrief)
            </button>
          )}
          {!showS && (
            <button
              onClick={() => setShowS(true)}
              style={{
                background: `${T.violet}14`,
                border: `1px solid ${T.violet}28`,
                borderRadius: 9,
                padding: "8px 16px",
                cursor: "pointer",
                color: T.violet,
                fontWeight: 700,
                fontSize: 13,
                fontFamily: "'Outfit',sans-serif",
              }}
            >
              ✅ Solution (noted in debrief)
            </button>
          )}
        </div>
        {showH && (
          <div
            className="fade-in"
            style={{
              background: `${T.amber}0d`,
              border: `1px solid ${T.amber}25`,
              borderRadius: 11,
              padding: "12px 16px",
              marginTop: 10,
              fontSize: 13,
              color: th.text,
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: T.amber }}>💡 </strong>
            {prob.hint}
          </div>
        )}
        {showS && (
          <div className="fade-in" style={{ marginTop: 10 }}>
            <SCard title="✅ Solution" dark={dark} accent={T.teal}>
              <TranslatedCode
                jsCode={prob.solution}
                cacheKey={`mock-${prob.id}::solution`}
              />
            </SCard>
          </div>
        )}

        {/* Next phase button */}
        <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
          {phase > 0 && (
            <button
              onClick={() => setPhase(phase - 1)}
              style={{
                padding: "10px 20px",
                background: "rgba(255,255,255,0.07)",
                border: `1px solid ${th.border}`,
                borderRadius: 11,
                color: th.text,
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "'Outfit',sans-serif",
              }}
            >
              ← {PHASES[phase - 1].name}
            </button>
          )}
          {phase < 4 ? (
            <button
              onClick={() => setPhase(phase + 1)}
              style={{
                padding: "10px 20px",
                background: `linear-gradient(135deg,${T.violet},#6d28d9)`,
                border: "none",
                borderRadius: 11,
                color: "#fff",
                fontWeight: 800,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "'Outfit',sans-serif",
                flex: 1,
              }}
            >
              Next: {PHASES[phase + 1].name} →
            </button>
          ) : (
            <button
              onClick={endEarly}
              style={{
                padding: "10px 20px",
                background: `linear-gradient(135deg,${T.teal},#00b894)`,
                border: "none",
                borderRadius: 11,
                color: "#000",
                fontWeight: 800,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "'Outfit',sans-serif",
                flex: 1,
              }}
            >
              Finish & Debrief →
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── DEBRIEF ──
  const assessItems = [
    "Understood before coding",
    "Stated brute force first",
    "Identified optimal pattern",
    "Clean code, clear names",
    "Tested with examples",
    "Explained thinking aloud",
  ];
  return (
    <div className="fade-up">
      <h1
        style={{
          fontSize: 24,
          fontWeight: 900,
          color: T.teal,
          marginBottom: 6,
          letterSpacing: "-0.4px",
        }}
      >
        ✅ Session Complete
      </h1>
      <p style={{ color: th.textS, fontSize: 13, marginBottom: 18 }}>
        Honest self-assessment accelerates growth faster than anything else.
      </p>

      {/* Penalties */}
      {(showH || showS) && (
        <div
          style={{
            background: `${T.amber}0a`,
            border: `1px solid ${T.amber}20`,
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 12,
            fontSize: 12,
            color: th.text,
          }}
        >
          <strong style={{ color: T.amber }}>⚠️ Used during session: </strong>
          {showH && <span style={{ color: T.amber }}>Hint </span>}
          {showS && <span style={{ color: T.amber }}>Solution </span>}
          <span style={{ color: th.textS }}>
            — In a real interview, this would count against you. Practice until
            you don't need these.
          </span>
        </div>
      )}

      {prob && (
        <SCard title={`Solution: ${prob.title}`} dark={dark} accent={T.teal}>
          <TranslatedCode
            jsCode={prob.solution}
            cacheKey={`mock-${prob.id}::debrief`}
          />
        </SCard>
      )}

      {/* Self-rating */}
      <SCard title="⭐ Overall Rating" dark={dark} accent={T.amber}>
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            marginBottom: 8,
          }}
        >
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => setRating(s)}
              style={{
                fontSize: 28,
                background: "none",
                border: "none",
                cursor: "pointer",
                opacity: s <= rating ? 1 : 0.25,
                transition: "all 0.15s",
                transform: s <= rating ? "scale(1.1)" : "scale(1)",
                filter: s <= rating ? "none" : "grayscale(1)",
              }}
            >
              ⭐
            </button>
          ))}
        </div>
        <div style={{ textAlign: "center", fontSize: 12, color: th.textS }}>
          {rating === 0
            ? "Rate your performance"
            : rating <= 2
              ? "Keep practicing — you'll get there!"
              : rating <= 3
                ? "Solid attempt, room to improve"
                : rating === 4
                  ? "Strong performance!"
                  : "Nailed it! 🎉"}
        </div>
      </SCard>

      {/* Checklist */}
      <SCard title="🪞 Self-Assessment Checklist" dark={dark}>
        {assessItems.map((q, i) => (
          <label
            key={i}
            onClick={() => setChecks((c) => ({ ...c, [i]: !(c as any)[i] }))}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              marginBottom: 9,
              cursor: "pointer",
              fontSize: 13,
              color: th.text,
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 5,
                flexShrink: 0,
                background: (checks as any)[i] ? T.teal : "transparent",
                border: `2px solid ${(checks as any)[i] ? T.teal : "rgba(255,255,255,0.2)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s",
              }}
            >
              {(checks as any)[i] && (
                <span style={{ color: "#000", fontSize: 10, fontWeight: 900 }}>
                  ✓
                </span>
              )}
            </div>
            {q}
          </label>
        ))}
        <div style={{ fontSize: 12, color: th.textS, marginTop: 6 }}>
          {Object.values(checks).filter(Boolean).length}/6 checked
        </div>
      </SCard>

      {/* Phase notes review */}
      {Object.values(notes).some((n) => n.trim()) && (
        <SCard title="📝 Your Notes" dark={dark}>
          {PHASES.map((p, i) =>
            (notes as any)[i]?.trim() ? (
              <div key={i} style={{ marginBottom: 10 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: T.violet,
                    marginBottom: 3,
                  }}
                >
                  {p.icon} {p.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: th.text,
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 8,
                    padding: "8px 10px",
                  }}
                >
                  {(notes as any)[i]}
                </div>
              </div>
            ) : null,
          )}
        </SCard>
      )}

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={() => {
            saveSession();
            setStage("select");
            setSel(null);
          }}
          style={{
            flex: 1,
            background: `linear-gradient(135deg,${T.teal},#00b894)`,
            border: "none",
            borderRadius: 11,
            padding: "11px 24px",
            cursor: "pointer",
            fontWeight: 800,
            fontSize: 14,
            color: "#000",
            fontFamily: "'Outfit',sans-serif",
          }}
        >
          Save & Try Another →
        </button>
        <button
          onClick={() => {
            saveSession();
            setStage("select");
            setSel(null);
            setShowHistoryView(true);
          }}
          style={{
            padding: "11px 18px",
            background: "rgba(255,255,255,0.07)",
            border: `1px solid ${th.border}`,
            borderRadius: 11,
            color: th.text,
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "'Outfit',sans-serif",
          }}
        >
          📊 View History
        </button>
      </div>
    </div>
  );
}
