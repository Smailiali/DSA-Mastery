import React from "react";
import { T } from "@/utils/tokens";
import { useTheme } from "@/hooks/useTheme";

interface HintAccordionProps {
  hints: string[];
  dark: boolean;
}

export function HintAccordion({ hints, dark }: HintAccordionProps) {
  const [open, setOpen] = React.useState<number[]>([]);
  const th = useTheme(dark);
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: T.amber, marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}>
        💡 Progressive Hints{" "}
        <span style={{ opacity: 0.5, fontWeight: 400 }}>— reveal one at a time</span>
      </div>
      {hints.map((h, i) => (
        <div key={i} style={{ marginBottom: 4 }}>
          <button
            className="hint-btn"
            onClick={() => setOpen((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i])}
            style={{
              background: open.includes(i) ? `${T.amber}12` : th.bg3,
              border: `1px solid ${open.includes(i) ? T.amber + "40" : th.border}`,
              color: th.text,
              borderRadius: open.includes(i) ? "8px 8px 0 0" : 8,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{
                width: 18, height: 18, borderRadius: 99,
                background: open.includes(i) ? T.amber : "rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, fontWeight: 900,
                color: open.includes(i) ? "#000" : th.textS, flexShrink: 0,
              }}>
                {i + 1}
              </span>
              Hint {i + 1}
            </span>
            <span style={{ opacity: 0.4, fontSize: 10 }}>{open.includes(i) ? "▼" : "▶"}</span>
          </button>
          {open.includes(i) && (
            <div style={{
              background: `${T.amber}0d`, border: `1px solid ${T.amber}30`,
              borderTop: "none", borderRadius: "0 0 8px 8px",
              padding: "9px 13px", fontSize: 13, lineHeight: 1.7, color: th.text,
            }}>
              {h}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
