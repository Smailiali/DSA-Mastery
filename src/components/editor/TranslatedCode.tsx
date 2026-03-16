import React from "react";
import { T } from "@/utils/tokens";
import { LANG_MAP } from "@/data/languages";
import { useLang } from "@/hooks/useLang";
import { CodeBlock } from "./CodeBlock";

const _translationCache = new Map<string, string>();

interface TranslatedCodeProps {
  jsCode: string;
  cacheKey: string;
}

export function TranslatedCode({ jsCode, cacheKey }: TranslatedCodeProps) {
  const { langId } = useLang();
  const isLocal = langId === "javascript" || langId === "typescript";
  const fullKey = `${cacheKey}::${langId}`;

  const [translated, setTranslated] = React.useState<string | null>(
    () => _translationCache.get(fullKey) || null
  );
  const [loading, setLoading] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const attemptedRef = React.useRef(new Set<string>());

  React.useEffect(() => {
    if (isLocal) { setTranslated(null); setFailed(false); return; }
    const cached = _translationCache.get(fullKey);
    if (cached) { setTranslated(cached); setFailed(false); return; }
    if (attemptedRef.current.has(fullKey)) { setFailed(true); return; }

    let cancelled = false;
    setLoading(true); setTranslated(null); setFailed(false);

    const lang = (LANG_MAP as any)[langId];
    const timeout = setTimeout(() => {
      if (!cancelled) { setLoading(false); setFailed(true); attemptedRef.current.add(fullKey); }
    }, 15000);

    fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2048,
        messages: [{
          role: "user",
          content: `Translate this JavaScript code to idiomatic ${lang.label}. Use proper types, naming conventions, and standard library. Keep all comments. Output ONLY the code, no markdown fences, no explanation.\n\n${jsCode}`,
        }],
      }),
    })
      .then((r) => { if (!r.ok) throw new Error("API error"); return r.json(); })
      .then((data) => {
        clearTimeout(timeout);
        if (cancelled) return;
        const text = (data?.content?.[0]?.text || "")
          .trim().replace(/^```[\w]*\n?/, "").replace(/\n?```$/, "").trim();
        if (text && text.length > 10) {
          _translationCache.set(fullKey, text);
          setTranslated(text); setFailed(false);
        } else { setFailed(true); attemptedRef.current.add(fullKey); }
        setLoading(false);
      })
      .catch(() => {
        clearTimeout(timeout);
        if (!cancelled) { setLoading(false); setFailed(true); attemptedRef.current.add(fullKey); }
      });

    return () => { cancelled = true; clearTimeout(timeout); };
  }, [langId, fullKey, isLocal, jsCode]);

  if (isLocal) return <CodeBlock code={jsCode} />;

  if (loading)
    return (
      <div style={{ borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", background: "rgba(0,212,170,0.06)", borderBottom: "1px solid rgba(0,212,170,0.12)", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ display: "inline-block", animation: "spin 1s linear infinite", fontSize: 14 }}>⟳</span>
          <span style={{ fontSize: 12, color: T.teal, fontWeight: 600 }}>Translating to {(LANG_MAP as any)[langId]?.label}…</span>
        </div>
        <div style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "16px" }}>
          {[80, 60, 75, 50, 70, 55].map((w, i) => (
            <div key={i} style={{ height: 12, width: `${w}%`, borderRadius: 4, marginBottom: i < 5 ? 10 : 0, background: "linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.04) 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", animationDelay: `${i * 0.08}s` }} />
          ))}
          <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
        </div>
      </div>
    );

  if (failed && !translated)
    return (
      <div>
        <div style={{ fontSize: 12, color: "#8b8fa8", padding: "8px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px 8px 0 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>Showing JavaScript · translation to {(LANG_MAP as any)[langId]?.label} unavailable</span>
          <button
            onClick={() => { attemptedRef.current.delete(fullKey); setFailed(false); setLoading(true); }}
            style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, padding: "2px 10px", cursor: "pointer", color: "#8b8fa8", fontSize: 11, fontFamily: "'Outfit',sans-serif" }}
          >
            Retry
          </button>
        </div>
        <CodeBlock code={jsCode} />
      </div>
    );

  return <CodeBlock code={translated || jsCode} />;
}
