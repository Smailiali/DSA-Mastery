import React from "react";
import { T } from "@/utils/tokens";
import { useTheme } from "@/hooks/useTheme";

interface ProgressRingProps {
  pct: number;
  size?: number;
  stroke?: number;
  color?: string;
  children?: React.ReactNode;
}

export function ProgressRing({ pct, size = 56, stroke = 4, color = T.teal, children }: ProgressRingProps) {
  const r = (size - stroke) / 2,
    circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle className="ring-track" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} stroke="rgba(255,255,255,0.1)" />
        <circle className="ring-fill" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} stroke={color} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {children || (
          <span style={{ fontSize: size * 0.22, fontWeight: 800, color }}>{pct}%</span>
        )}
      </div>
    </div>
  );
}

interface MiniBarProps { done: number; total: number; color: string; label: string; }
export function MiniBar({ done, total, color, label }: MiniBarProps) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4, color: T.ds }}>
        <span style={{ fontWeight: 600, color: T.dt }}>{label}</span>
        <span>{done}/{total} · {pct}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: pct + "%", background: color, borderRadius: 99, transition: "width 0.6s cubic-bezier(.4,0,.2,1)" }} />
      </div>
    </div>
  );
}

interface SidebarBarProps { done: number; total: number; color: string; }
export function SidebarBar({ done, total, color }: SidebarBarProps) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div style={{ marginTop: 3 }}>
      <div style={{ fontSize: 10, color: T.ds, marginBottom: 2 }}>{pct}% · {done}/{total}</div>
      <div style={{ height: 3, borderRadius: 99, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: pct + "%", background: color, borderRadius: 99, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}

interface DarkToggleProps { dark: boolean; toggle: () => void; }
export function DarkToggle({ dark, toggle }: DarkToggleProps) {
  return (
    <button
      onClick={toggle}
      style={{
        background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
        border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
        borderRadius: 99, padding: "5px 12px", cursor: "pointer",
        fontSize: 13, color: "inherit", transition: "all 0.2s",
        fontFamily: "'Outfit',sans-serif", fontWeight: 600,
        display: "flex", alignItems: "center", gap: 5,
      }}
    >
      {dark ? "☀️" : "🌙"}{" "}
      <span style={{ fontSize: 12, opacity: 0.7 }}>{dark ? "Light" : "Dark"}</span>
    </button>
  );
}

interface SCardProps {
  title?: React.ReactNode;
  dark: boolean;
  accent?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export function SCard({ title, dark, accent, children, style = {} }: SCardProps) {
  const th = useTheme(dark);
  return (
    <div
      className="section-card"
      style={{
        background: th.bg2,
        border: `1px solid ${accent ? accent + "25" : th.border}`,
        borderLeft: accent ? `3px solid ${accent}` : undefined,
        ...style,
      }}
    >
      {title && <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, color: th.text }}>{title}</div>}
      {children}
    </div>
  );
}
