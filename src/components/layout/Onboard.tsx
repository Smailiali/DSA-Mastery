import React from "react";
import { T } from "@/utils/tokens";

interface OnboardProps {
  onClose: () => void;
}

export function Onboard({ onClose }: OnboardProps) {
  const [step, setStep] = React.useState(0);
  const steps = [
    {
      icon: "⚡",
      title: "Welcome to DSA Mastery",
      body: "Your 30-day intensive to dominate technical interviews. 22 topics, 65 problems with editorials, built-in code editor, spaced repetition, and mock interviews.",
      cta: "Get Started →",
    },
    {
      icon: "📚",
      title: "How Each Topic Works",
      body: "Each topic has 3 tabs: Learn (intuition + diagrams), Code (reference), and Practice (problems with a built-in editor and test runner).",
      cta: "Got it →",
    },
    {
      icon: "💻",
      title: "Built-in Code Editor",
      body: "Write your solution in any of 12 languages, hit Run Tests (⌘+Enter), and get instant pass/fail feedback. Switch languages anytime — code translations are automatic.",
      cta: "Start Coding →",
    },
  ];
  const s = steps[step];
  return (
    <div className="overlay">
      <div className="onboard-card">
        <div style={{ fontSize: 46, textAlign: "center", marginBottom: 14 }}>
          {s.icon}
        </div>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 900,
            textAlign: "center",
            marginBottom: 10,
            color: T.dt,
            letterSpacing: "-0.4px",
          }}
        >
          {s.title}
        </h2>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.8,
            color: T.ds,
            textAlign: "center",
            marginBottom: 22,
          }}
        >
          {s.body}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 5,
            marginBottom: 20,
          }}
        >
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === step ? 22 : 7,
                height: 7,
                borderRadius: 99,
                background: i === step ? T.teal : "rgba(255,255,255,0.2)",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
        <button
          onClick={() =>
            step < steps.length - 1 ? setStep(step + 1) : onClose()
          }
          style={{
            width: "100%",
            padding: "12px",
            background: `linear-gradient(135deg,${T.teal},#00b894)`,
            border: "none",
            borderRadius: 11,
            color: "#000",
            fontWeight: 800,
            fontSize: 14,
            cursor: "pointer",
            fontFamily: "'Outfit',sans-serif",
          }}
        >
          {s.cta}
        </button>
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            style={{
              width: "100%",
              marginTop: 7,
              padding: "9px",
              background: "none",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 11,
              color: T.ds,
              cursor: "pointer",
              fontFamily: "'Outfit',sans-serif",
              fontSize: 13,
            }}
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
