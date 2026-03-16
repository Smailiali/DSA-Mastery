import React from "react";
import { T } from "@/utils/tokens";
import { useTheme } from "@/hooks/useTheme";
import { EDITORIALS } from "@/data/editorials";

export function EditorialPanel({ problemId, dark }: any) {
  const ed = EDITORIALS[problemId];
  const th = useTheme(dark);
  const [open, setOpen] = React.useState(false);
  if (!ed) return null;
  return (
    <div style={{ marginTop: 12 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "12px 16px",
          borderRadius: 12,
          cursor: "pointer",
          background: dark
            ? `linear-gradient(135deg,${T.violet}0d,${T.d2})`
            : T.l1,
          border: `1px solid ${T.violet}25`,
          fontFamily: "'Outfit',sans-serif",
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: th.text,
        }}
      >
        <span style={{ fontSize: 16 }}>📝</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 14 }}>
            Editorial: {ed.approach}
          </div>
          <div style={{ fontSize: 12, color: th.textS }}>{ed.complexity}</div>
        </div>
        <span
          style={{
            fontSize: 16,
            color: th.textS,
            transition: "transform 0.2s",
            transform: open ? "rotate(90deg)" : "rotate(0)",
          }}
        >
          {" "}
          ›
        </span>
      </button>
      {open && (
        <div
          className="fade-up"
          style={{
            background: th.bg2,
            border: `1px solid ${T.violet}20`,
            borderRadius: "0 0 12px 12px",
            borderTop: "none",
            padding: "16px 18px",
            marginTop: -1,
          }}
        >
          <div
            style={{
              fontSize: 13.5,
              lineHeight: 1.9,
              color: th.text,
              whiteSpace: "pre-wrap",
              marginBottom: 14,
            }}
          >
            {ed.walkthrough}
          </div>
          <div
            style={{
              background: `${T.teal}0a`,
              border: `1px solid ${T.teal}20`,
              borderRadius: 10,
              padding: "10px 14px",
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: T.teal,
                marginBottom: 4,
              }}
            >
              💡 KEY INSIGHT
            </div>
            <div style={{ fontSize: 13, color: th.text, lineHeight: 1.7 }}>
              {ed.keyInsight}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
