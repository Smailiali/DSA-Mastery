import React from "react";
import { T } from "@/utils/tokens";
import { useTheme } from "@/hooks/useTheme";

// ── Internal imports ───────────────────────────────────────────
import { ProgressRing } from "@/components/shared/ProgressRing";
import { SCard } from "@/components/shared/ProgressRing";
import { CodeBlock } from "@/components/editor/CodeBlock";

// ── Types ──────────────────────────────────────────────────────

interface TestResult {
  pass: boolean;
  desc?: string;
  args?: string;
  error?: string;
  expected?: any;
  actual?: any;
}

interface TestResultsData {
  type?: "compile-error" | "offline" | "unsupported" | "conceptual" | string;
  message?: string;
  results?: TestResult[];
  stderr?: string;
}

interface TestResultsProps {
  results: TestResultsData | null;
  dark: boolean;
  allPass: boolean;
}

interface ConceptualMeta {
  type: "conceptual";
  question: string;
  snippet?: string;
  choices: string[];
  answer: string;
  explanation?: string;
}

interface ConceptualQuestionProps {
  meta: ConceptualMeta;
  dark: boolean;
}

// ── TestResults ────────────────────────────────────────────────

export function TestResults({ results, dark, allPass }: TestResultsProps) {
  const th = useTheme(dark);
  if (!results) return null;

  if (results.type === "compile-error")
    return (
      <div className="test-fail" style={{ fontSize: 13, lineHeight: 1.7 }}>
        <strong style={{ color: T.red }}>⚠ Error</strong>
        <pre
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 11.5,
            marginTop: 8,
            whiteSpace: "pre-wrap",
            opacity: 0.9,
            color: "#f87171",
          }}
        >
          {results.message}
        </pre>
      </div>
    );

  if (results.type === "offline")
    return (
      <div
        style={{
          background: `${T.amber}0d`,
          border: `1px solid ${T.amber}28`,
          borderRadius: 11,
          padding: "14px 16px",
          fontSize: 13,
          color: th.text,
          lineHeight: 1.7,
        }}
      >
        <div style={{ fontWeight: 800, color: T.amber, marginBottom: 6 }}>
          📡 Execution service unreachable
        </div>
        {results.message}
        <div style={{ marginTop: 10, fontSize: 12, color: th.textS }}>
          <strong>Tip:</strong> Switch to <strong>JavaScript</strong> or{" "}
          <strong>TypeScript</strong> — those run instantly in-browser, no
          internet needed.
        </div>
      </div>
    );

  if (results.type === "unsupported")
    return (
      <div
        style={{
          background: `${T.amber}0d`,
          border: `1px solid ${T.amber}25`,
          borderRadius: 10,
          padding: "12px 14px",
          fontSize: 13,
          color: th.text,
          lineHeight: 1.6,
        }}
      >
        ⚡ {results.message}
      </div>
    );

  if (results.type === "conceptual" || !results.results) return null;

  const passed = results.results.filter((r) => r.pass).length;
  const total = results.results.length;

  return (
    <div className="fade-up">
      {/* Summary */}
      <div
        style={{
          background: allPass ? `${T.teal}15` : `${T.red}10`,
          border: `1px solid ${allPass ? T.teal + "30" : T.red + "30"}`,
          borderRadius: 12,
          padding: "12px 16px",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 24 }}>{allPass ? "🎉" : "💪"}</span>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontWeight: 800,
              fontSize: 15,
              color: allPass ? T.teal : T.red,
            }}
          >
            {allPass
              ? "All tests passed!"
              : passed === 0
                ? "No tests passed yet — keep going!"
                : `${passed}/${total} tests passed`}
          </div>
          <div style={{ fontSize: 12, color: th.textS, marginTop: 2 }}>
            {allPass
              ? "Great work! Mark it solved and move on."
              : passed > 0
                ? "Getting close! Check edge cases."
                : "Check the Hints tab for step-by-step guidance."}
          </div>
        </div>
        <ProgressRing
          pct={Math.round((passed / total) * 100)}
          size={44}
          stroke={4}
          color={allPass ? T.teal : T.red}
        >
          <span
            style={{
              fontSize: 9,
              fontWeight: 900,
              color: allPass ? T.teal : T.red,
            }}
          >
            {Math.round((passed / total) * 100)}%
          </span>
        </ProgressRing>
      </div>

      {/* Individual tests */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {results.results.map((r, i) => (
          <div key={i} className={r.pass ? "test-pass" : "test-fail"}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: r.pass ? 0 : 6,
              }}
            >
              <span
                className={r.pass ? "test-icon-pass" : "test-icon-fail"}
                style={{ flexShrink: 0 }}
              >
                {r.pass ? "✓" : "✗"}
              </span>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  color: th.text,
                  flex: 1,
                }}
              >
                {r.desc}
              </span>
              {r.args && (
                <span
                  style={{
                    fontSize: 11,
                    color: th.textS,
                    fontFamily: "'JetBrains Mono',monospace",
                    maxWidth: 180,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  ({r.args})
                </span>
              )}
            </div>
            {!r.pass && (
              <div
                style={{
                  marginLeft: 24,
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono',monospace",
                }}
              >
                {r.error ? (
                  <span style={{ color: T.red }}>Error: {r.error}</span>
                ) : (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 6,
                      marginTop: 2,
                    }}
                  >
                    <div
                      style={{
                        background: `${T.teal}08`,
                        border: `1px solid ${T.teal}18`,
                        borderRadius: 7,
                        padding: "6px 10px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 9,
                          fontWeight: 800,
                          color: T.teal,
                          marginBottom: 2,
                        }}
                      >
                        EXPECTED
                      </div>
                      <div style={{ color: th.text, wordBreak: "break-all" }}>
                        {r.expected}
                      </div>
                    </div>
                    <div
                      style={{
                        background: `${T.red}08`,
                        border: `1px solid ${T.red}18`,
                        borderRadius: 7,
                        padding: "6px 10px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 9,
                          fontWeight: 800,
                          color: T.red,
                          marginBottom: 2,
                        }}
                      >
                        YOUR OUTPUT
                      </div>
                      <div style={{ color: th.text, wordBreak: "break-all" }}>
                        {r.actual ?? "undefined"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {results.stderr && (
        <details style={{ marginTop: 8 }}>
          <summary
            style={{
              cursor: "pointer",
              fontSize: 11,
              color: th.textS,
              padding: "4px 0",
            }}
          >
            Show compiler output / stderr
          </summary>
          <pre
            style={{
              fontSize: 11,
              color: T.amber,
              fontFamily: "'JetBrains Mono',monospace",
              marginTop: 6,
              whiteSpace: "pre-wrap",
              padding: "8px 10px",
              background: "rgba(0,0,0,0.25)",
              borderRadius: 8,
            }}
          >
            {results.stderr}
          </pre>
        </details>
      )}
    </div>
  );
}

// ── ConceptualQuestion ─────────────────────────────────────────

export function ConceptualQuestion({ meta, dark }: ConceptualQuestionProps) {
  const th = useTheme(dark);
  const [selected, setSelected] = React.useState<string | null>(null);
  const [revealed, setReveal] = React.useState<boolean>(false);
  const correct = selected === meta.answer;
  return (
    <div>
      <SCard title="❓ Question" dark={dark}>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.7,
            color: th.text,
            marginBottom: 12,
          }}
        >
          {meta.question}
        </p>
        {meta.snippet && <CodeBlock code={meta.snippet} />}
      </SCard>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 7,
          marginBottom: 12,
        }}
      >
        {meta.choices.map((c) => (
          <button
            key={c}
            onClick={() => {
              setSelected(c);
              setReveal(true);
            }}
            style={{
              textAlign: "left",
              padding: "11px 16px",
              borderRadius: 10,
              cursor: "pointer",
              fontFamily: "'Outfit',sans-serif",
              fontSize: 14,
              fontWeight: 600,
              transition: "all 0.15s",
              background: !revealed
                ? th.bg2
                : c === meta.answer
                  ? `${T.teal}20`
                  : selected === c
                    ? `${T.red}15`
                    : th.bg2,
              border: `2px solid ${!revealed ? th.border : c === meta.answer ? T.teal : selected === c ? T.red : th.border}`,
              color: !revealed
                ? th.text
                : c === meta.answer
                  ? T.teal
                  : selected === c
                    ? T.red
                    : th.textS,
            }}
          >
            {!revealed || (c !== meta.answer && selected !== c)
              ? c
              : c === meta.answer
                ? "✓ " + c
                : "✗ " + c}
          </button>
        ))}
      </div>
      {revealed && (
        <div
          className="fade-up"
          style={{
            background: correct ? `${T.teal}10` : `${T.red}08`,
            border: `1px solid ${correct ? T.teal + "30" : T.red + "25"}`,
            borderRadius: 12,
            padding: "14px 16px",
            fontSize: 13,
            lineHeight: 1.7,
            color: th.text,
          }}
        >
          <div
            style={{
              fontWeight: 800,
              color: correct ? T.teal : T.red,
              marginBottom: 6,
            }}
          >
            {correct ? "✅ Correct!" : "❌ Not quite"} — The answer is{" "}
            {meta.answer}
          </div>
          {meta.explanation}
        </div>
      )}
    </div>
  );
}
