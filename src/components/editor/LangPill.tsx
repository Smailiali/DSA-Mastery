import React from "react";
import { T } from "@/utils/tokens";
import { useTheme } from "@/hooks/useTheme";
import { useLang } from "@/hooks/useLang";
import { LANGUAGES, LANG_MAP } from "@/data/languages";
import { LangIcon } from "@/components/shared/LangIcon";

interface LangPillProps { dark: boolean; }

export function LangPill({ dark }: LangPillProps) {
  const { langId, setLangId } = useLang();
  const th = useTheme(dark);
  const [open, setOpen] = React.useState(false);
  const sel = (LANG_MAP as any)[langId] || (LANGUAGES as any[])[0];
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 5,
          padding: "4px 10px",
          background: dark ? "rgba(255,255,255,0.07)" : th.bg3,
          border: `1px solid ${open ? T.teal + "60" : th.border}`,
          borderRadius: 8, cursor: "pointer",
          fontFamily: "'Outfit',sans-serif", fontSize: 12.5, fontWeight: 700,
          color: th.text, transition: "all 0.15s",
          boxShadow: open ? `0 0 0 2px ${T.teal}20` : "none",
        }}
      >
        <LangIcon id={sel.id} size={16} />
        <span>{sel.label}</span>
        <span style={{ opacity: 0.4, fontSize: 9, marginLeft: 1 }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div
          className="fade-in"
          style={{
            position: "fixed", top: "auto", right: 16, zIndex: 300,
            background: dark ? T.d3 : "#fff",
            border: `1px solid ${th.border}`, borderRadius: 13,
            boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
            padding: 6, width: "min(280px, calc(100vw - 32px))",
            maxHeight: "60vh", overflowY: "auto",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginTop: 4,
          }}
        >
          {(LANGUAGES as any[]).map((l) => (
            <button
              key={l.id}
              onClick={() => { setLangId(l.id); setOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "7px 10px",
                background: l.id === langId ? `${T.teal}20` : "transparent",
                border: `1px solid ${l.id === langId ? T.teal + "40" : "transparent"}`,
                borderRadius: 8, cursor: "pointer",
                fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 600,
                color: l.id === langId ? T.teal : th.text,
                transition: "all 0.12s", textAlign: "left",
              }}
            >
              <LangIcon id={l.id} size={16} />
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function LangPillMini() {
  const { langId } = useLang();
  const lang = (LANG_MAP as any)[langId];
  if (!lang) return null;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 8px", borderRadius: 99,
      background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
      fontSize: 11, fontWeight: 600, color: "#c9d1d9", verticalAlign: "middle",
    }}>
      <LangIcon id={langId} size={13} /> {lang.label}
    </span>
  );
}
