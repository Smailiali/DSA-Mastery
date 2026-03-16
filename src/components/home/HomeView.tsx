import { T } from "@/utils/tokens";
import { useTheme } from "@/hooks/useTheme";
import { Icon } from "@/components/shared/Icon";
import { ProgressRing } from "@/components/shared/ProgressRing";

interface HomeViewProps {
  dark: boolean;
  curriculum: any[];
  progress: any;
  setCurrent: (id: string) => void;
}

export function HomeView({ dark, curriculum, progress, setCurrent }: HomeViewProps) {
  const th = useTheme(dark);
  const allTopics = curriculum.flatMap((w) => w.topics);
  const allProblems = allTopics.flatMap((t) => t.problems);
  const doneTopics = allTopics.filter((t) => progress[t.id]?.topicDone).length;
  const doneProblems = allProblems.filter((p) =>
    allTopics.some((t) => progress[t.id]?.problems?.[p.id]),
  ).length;
  const pct = allTopics.length
    ? Math.round((doneTopics / allTopics.length) * 100)
    : 0;

  const TOOLS = [
    {
      id: "interview-mastery",
      icon: "trophy",
      label: "Interview Mastery",
      desc: "Top 25 problems + framework",
      color: T.amber,
    },
    {
      id: "pattern-drills",
      icon: "target",
      label: "Pattern Drills",
      desc: "Rapid-fire flashcards",
      color: T.violet,
    },
    {
      id: "mock-interview",
      icon: "clock",
      label: "Mock Interview",
      desc: "45-min timed simulation",
      color: T.red,
    },
    {
      id: "mixed-patterns",
      icon: "shuffle",
      label: "Mixed Patterns",
      desc: "Multi-technique combos",
      color: "#dc2626",
    },
    {
      id: "study-schedule",
      icon: "calendar",
      label: "Study Schedule",
      desc: "30-day daily plan",
      color: T.teal,
    },
    {
      id: "stats-dashboard",
      icon: "chart",
      label: "Progress Stats",
      desc: "Visual mastery dashboard",
      color: T.blue,
    },
  ];

  return (
    <div className="fade-up">
      {/* Hero */}
      <div
        style={{
          background: dark
            ? `linear-gradient(135deg,${T.teal}10,${T.violet}08,${T.d2})`
            : T.l1,
          border: `1px solid ${T.teal}20`,
          borderRadius: 18,
          padding: "24px 26px",
          marginBottom: 18,
          display: "flex",
          alignItems: "center",
          gap: 22,
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 220 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: T.teal,
              marginBottom: 6,
            }}
          >
            30-Day Interview Mastery
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: "-0.7px",
              color: th.text,
              margin: "0 0 8px",
              lineHeight: 1.15,
            }}
          >
            {doneTopics === 0 ? "Master Every" : "Keep Going,"}
            <br />
            {doneTopics === 0 ? "DSA Pattern" : "You're Crushing It"}
          </h1>
          <p
            style={{
              fontSize: 13,
              color: th.textS,
              lineHeight: 1.7,
              margin: "0 0 18px",
              maxWidth: 360,
            }}
          >
            {doneTopics === 0
              ? "22 topics · 65 problems · spaced repetition · mock interviews. Start with Big-O."
              : `${doneTopics}/${allTopics.length} topics · ${doneProblems} problems solved.`}
          </p>
          <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
            <button
              onClick={() =>
                setCurrent(doneTopics === 0 ? "big-o" : "stats-dashboard")
              }
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
                boxShadow: `0 4px 18px ${T.teal}40`,
              }}
            >
              {doneTopics === 0 ? "Start Learning →" : "View Progress →"}
            </button>
            <button
              onClick={() => setCurrent("study-schedule")}
              style={{
                padding: "10px 18px",
                background: "transparent",
                border: `1px solid ${th.borderM}`,
                borderRadius: 11,
                color: th.text,
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "'Outfit',sans-serif",
              }}
            >
              📅 Schedule
            </button>
          </div>
        </div>
        <ProgressRing pct={pct} size={100} stroke={6} color={T.teal}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: T.teal,
                lineHeight: 1,
              }}
            >
              {pct}%
            </div>
            <div style={{ fontSize: 8, color: th.textS }}>complete</div>
          </div>
        </ProgressRing>
      </div>

      {/* ── SMART RECOMMENDATION ── */}
      {doneProblems > 0 &&
        (() => {
          // Find next unsolved problem in the most advanced incomplete topic
          let rec: any = null;
          for (const wk of curriculum) {
            for (const t of wk.topics) {
              const solved = t.problems.filter(
                (p: any) => progress[t.id]?.problems?.[p.id],
              ).length;
              if (solved > 0 && solved < t.problems.length) {
                const nextP = t.problems.find(
                  (p: any) => !progress[t.id]?.problems?.[p.id],
                );
                if (nextP) {
                  rec = {
                    problem: nextP,
                    topic: t,
                    weekColor: wk.color,
                    solved,
                    total: t.problems.length,
                  };
                  break;
                }
              }
            }
            if (rec) break;
          }
          if (!rec) {
            // All started topics complete — find first unstarted topic
            for (const wk of curriculum) {
              for (const t of wk.topics) {
                const solved = t.problems.filter(
                  (p: any) => progress[t.id]?.problems?.[p.id],
                ).length;
                if (solved === 0 && t.problems.length > 0) {
                  rec = {
                    problem: t.problems[0],
                    topic: t,
                    weekColor: wk.color,
                    solved: 0,
                    total: t.problems.length,
                  };
                  break;
                }
              }
              if (rec) break;
            }
          }
          if (!rec) return null;
          const dc = (T as any)[rec.problem.difficulty] || T.teal;
          return (
            <div
              className="card-hover"
              onClick={() => setCurrent("problem:" + rec.problem.id)}
              style={{
                background: dark
                  ? `linear-gradient(135deg,${dc}08,${T.d2})`
                  : T.l1,
                border: `1px solid ${dc}25`,
                borderRadius: 14,
                padding: "14px 18px",
                marginBottom: 16,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  background: `${dc}18`,
                  borderRadius: 10,
                  width: 38,
                  height: 38,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {rec.topic.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 140 }}>
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    color: T.teal,
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                  }}
                >
                  Continue Where You Left Off
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: th.text,
                    marginTop: 2,
                  }}
                >
                  {rec.problem.title}
                </div>
                <div style={{ fontSize: 11, color: th.textS, marginTop: 1 }}>
                  {rec.topic.title} · {rec.solved}/{rec.total} done ·{" "}
                  <span style={{ color: dc }}>{rec.problem.difficulty}</span>
                </div>
              </div>
              <div
                style={{
                  background: `${dc}15`,
                  color: dc,
                  borderRadius: 10,
                  padding: "7px 14px",
                  fontSize: 13,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                Solve →
              </div>
            </div>
          );
        })()}

      {/* Week cards */}
      <div className="week-grid" style={{ marginBottom: 16 }}>
        {curriculum.map((wk) => {
          const done = wk.topics.filter(
            (t: any) => progress[t.id]?.topicDone,
          ).length;
          const p = Math.round((done / wk.topics.length) * 100);
          return (
            <div
              key={wk.week}
              className="card-hover"
              onClick={() => setCurrent(wk.topics[0].id)}
              style={{
                background: th.bg2,
                border: `1px solid ${wk.color}22`,
                borderRadius: 14,
                padding: "15px 17px",
                borderLeft: `3px solid ${wk.color}`,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 8,
                      fontWeight: 800,
                      color: wk.color,
                      textTransform: "uppercase",
                      letterSpacing: ".07em",
                      marginBottom: 3,
                    }}
                  >
                    Week {wk.week}
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 800,
                      color: th.text,
                      marginBottom: 7,
                    }}
                  >
                    {wk.title}
                  </div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {wk.topics.slice(0, 3).map((t: any) => (
                      <span
                        key={t.id}
                        style={{
                          fontSize: 10,
                          padding: "1px 7px",
                          borderRadius: 99,
                          background: progress[t.id]?.topicDone
                            ? wk.color + "20"
                            : th.bg3,
                          color: progress[t.id]?.topicDone
                            ? wk.color
                            : th.textS,
                          border: `1px solid ${progress[t.id]?.topicDone ? wk.color + "30" : th.border}`,
                        }}
                      >
                        {t.emoji} {t.title}
                      </span>
                    ))}
                    {wk.topics.length > 3 && (
                      <span style={{ fontSize: 10, color: th.textS }}>
                        +{wk.topics.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                <ProgressRing pct={p} size={42} stroke={4} color={wk.color}>
                  <span
                    style={{ fontSize: 8, fontWeight: 900, color: wk.color }}
                  >
                    {p}%
                  </span>
                </ProgressRing>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tool cards */}
      <div
        style={{
          fontSize: 10,
          fontWeight: 800,
          color: th.textS,
          textTransform: "uppercase",
          letterSpacing: ".07em",
          marginBottom: 9,
        }}
      >
        Practice Tools
      </div>
      <div className="tool-grid">
        {TOOLS.map((tool) => (
          <div
            key={tool.id}
            className="card-hover"
            onClick={() => setCurrent(tool.id)}
            style={{
              background: th.bg2,
              border: `1px solid ${tool.color}18`,
              borderRadius: 13,
              padding: "13px 15px",
            }}
          >
            <div style={{ marginBottom: 5 }}>
              <Icon name={tool.icon} size={22} color={tool.color} />
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: th.text,
                marginBottom: 2,
              }}
            >
              {tool.label}
            </div>
            <div style={{ fontSize: 11, color: th.textS }}>{tool.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
