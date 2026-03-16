import React from "react";
import { T, clr } from "@/utils/tokens";
import { useTheme } from "@/hooks/useTheme";
import { getReviewQueue } from "@/utils/sm2";

export function ReviewSession({
  dark,
  srData,
  onRate,
  allTopics,
  allProblems,
  setCurrent,
}: any) {
  const th = useTheme(dark);
  const queue = getReviewQueue(srData);
  const [idx, setIdx] = React.useState(0);
  const [show, setShow] = React.useState(false);
  if (!queue.length)
    return (
      <div
        className="fade-up"
        style={{ textAlign: "center", padding: "40px 20px" }}
      >
        <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
        <h2 style={{ color: th.text, marginBottom: 6 }}>All caught up!</h2>
        <p style={{ color: th.textS, fontSize: 14 }}>
          No problems due for review.
        </p>
      </div>
    );
  const item = queue[Math.min(idx, queue.length - 1)];
  const problem = allProblems.find((p: any) => p.id === item?.problemId);
  const topic = problem
    ? allTopics.find((t: any) => t.problems.some((p: any) => p.id === problem.id))
    : null;
  if (!problem)
    return <div style={{ color: th.textS, padding: 20 }}>Loading...</div>;
  const handleRate = (q: any) => {
    onRate(item.problemId, q);
    setShow(false);
    setIdx((i) => (i < queue.length - 1 ? i + 1 : 0));
  };
  const dc = clr[problem.difficulty] || T.teal;
  return (
    <div className="fade-up">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 900, color: th.text }}>
          🧠 Spaced Review
        </h1>
        <span style={{ fontSize: 12, color: th.textS, fontWeight: 600 }}>
          {idx + 1}/{queue.length} due
        </span>
      </div>
      <div
        style={{
          background: dark ? `linear-gradient(135deg,${dc}08,${T.d2})` : T.l1,
          border: `1px solid ${T.violet}25`,
          borderRadius: 16,
          padding: "20px 22px",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 10,
            flexWrap: "wrap",
          }}
        >
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
          {topic && (
            <span style={{ fontSize: 12, color: th.textS }}>
              {topic.emoji} {topic.title}
            </span>
          )}
        </div>
        <h2
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: th.text,
            marginBottom: 8,
          }}
        >
          {problem.title}
        </h2>
        <p
          style={{
            fontSize: 13,
            color: th.textS,
            lineHeight: 1.7,
            whiteSpace: "pre-wrap",
            marginBottom: 14,
          }}
        >
          {problem.description}
        </p>
        {!show ? (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={() => setShow(true)}
              style={{
                flex: 1,
                padding: "11px 20px",
                background: `linear-gradient(135deg,${T.violet},#6d28d9)`,
                border: "none",
                borderRadius: 11,
                color: "#fff",
                fontWeight: 800,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "'Outfit',sans-serif",
                minWidth: 140,
              }}
            >
              Show Solution
            </button>
            <button
              onClick={() => setCurrent("problem:" + problem.id)}
              style={{
                padding: "11px 16px",
                background: th.bg2,
                border: `1px solid ${th.border}`,
                borderRadius: 11,
                color: th.text,
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "'Outfit',sans-serif",
              }}
            >
              Open in Editor →
            </button>
          </div>
        ) : (
          <div className="fade-up">
            <div
              style={{
                background: `${T.teal}0d`,
                border: `1px solid ${T.teal}25`,
                borderRadius: 11,
                padding: "12px 16px",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: T.teal,
                  marginBottom: 4,
                  fontSize: 12,
                }}
              >
                APPROACH
              </div>
              <div style={{ fontSize: 13, color: th.text, lineHeight: 1.7 }}>
                {problem.solution}
              </div>
            </div>
            <div
              style={{
                marginTop: 14,
                fontSize: 12,
                fontWeight: 700,
                color: th.textS,
                marginBottom: 8,
              }}
            >
              How well did you recall this?
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { l: "Again", q: 1, c: "#ef4444" },
                { l: "Hard", q: 3, c: "#f59e0b" },
                { l: "Good", q: 4, c: "#00d4aa" },
                { l: "Easy", q: 5, c: "#3b82f6" },
              ].map((r) => (
                <button
                  key={r.l}
                  className="review-rating-btn"
                  onClick={() => handleRate(r.q)}
                  style={{
                    background: `${r.c}12`,
                    borderColor: `${r.c}30`,
                    color: r.c,
                  }}
                >
                  {r.l}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
