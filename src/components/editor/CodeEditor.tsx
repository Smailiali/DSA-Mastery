import React from "react";
import { T } from "@/utils/tokens";
import { useTheme } from "@/hooks/useTheme";
import { LANG_MAP, LANGUAGES } from "@/data/languages";
import { LangIcon } from "@/components/shared/LangIcon";
import { executeCode, getStarter } from "@/utils/codeExecution";

// ── Internal imports (same folder / project) ──────────────────
import { LangPill } from "@/components/editor/LangPill";
import { TranslatedCode } from "@/components/editor/TranslatedCode";
import { TestResults } from "@/components/editor/TestResults";
import { ConceptualQuestion } from "@/components/editor/TestResults";
import { useLang } from "@/hooks/useLang";
import { SafeStorage } from "@/utils/SafeStorage";
import { PROBLEM_META } from "@/data/problems";
import { Icon } from "@/components/shared/Icon";


// ── Types ──────────────────────────────────────────────────────

interface LangPickerProps {
  value: string;
  onChange: (id: string) => void;
  dark: boolean;
}

interface CodeEditorProps {
  problem: {
    id: string;
    solution?: string;
    code?: string;
  };
  dark: boolean;
  onRun?: (result: any) => void;
}

// ── LangPicker ─────────────────────────────────────────────────

export function LangPicker({ value, onChange, dark }: LangPickerProps) {
  const th = useTheme(dark);
  const [open, setOpen] = React.useState<boolean>(false);
  const sel = LANG_MAP[value] || LANGUAGES[0];
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 12px",
          background: dark ? "rgba(255,255,255,0.08)" : th.bg3,
          border: `1px solid ${open ? T.teal + "60" : th.border}`,
          borderRadius: 9,
          cursor: "pointer",
          fontFamily: "'Outfit',sans-serif",
          fontSize: 13,
          fontWeight: 700,
          color: th.text,
          transition: "all 0.15s",
          boxShadow: open ? `0 0 0 2px ${T.teal}25` : "none",
        }}
      >
        <LangIcon id={sel.id} size={18} />
        <span>{sel.label}</span>
        <span style={{ opacity: 0.4, fontSize: 10, marginLeft: 2 }}>
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div
          className="fade-in"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            zIndex: 200,
            background: dark ? T.d3 : "#fff",
            border: `1px solid ${th.border}`,
            borderRadius: 13,
            boxShadow: "0 16px 48px rgba(0,0,0,0.3)",
            padding: 8,
            minWidth: 220,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 3,
          }}
        >
          {LANGUAGES.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                onChange(l.id);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 10px",
                background: l.id === value ? `${T.teal}20` : "transparent",
                border: `1px solid ${l.id === value ? T.teal + "40" : "transparent"}`,
                borderRadius: 8,
                cursor: "pointer",
                fontFamily: "'Outfit',sans-serif",
                fontSize: 12.5,
                fontWeight: 600,
                color: l.id === value ? T.teal : th.text,
                transition: "all 0.12s",
                textAlign: "left",
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

// ── CodeEditor ─────────────────────────────────────────────────

export function CodeEditor({ problem, dark }: CodeEditorProps) {
  const meta = PROBLEM_META[problem.id];
  const th = useTheme(dark);
  const { langId } = useLang();
  const draftKey = `dsa-draft-${problem.id}`;
  const [codes, setCodes] = React.useState<Record<string, string>>(() => SafeStorage.get<Record<string, string>>(draftKey, {}) ?? {});
  const [results, setResults] = React.useState<any>(null);
  const [running, setRunning] = React.useState<boolean>(false);
  const [resTab, setResTab] = React.useState<string>("results");
  const runGuard = React.useRef<boolean>(false);
  const codesRef = React.useRef<Record<string, string>>(codes);
  codesRef.current = codes;

  React.useEffect(() => {
    setResults(null);
  }, [langId]);

  // Debounced draft persistence
  React.useEffect(() => {
    const t = setTimeout(
      () => SafeStorage.set(draftKey, codesRef.current),
      400,
    );
    return () => clearTimeout(t);
  }, [codes, draftKey]);

  if (meta?.type === "conceptual")
    return <ConceptualQuestion meta={meta} dark={dark} />;

  const lang = LANG_MAP[langId];
  const code = codes[langId] ?? getStarter(problem.id, langId);
  const setCode = (v: string) => setCodes((c) => ({ ...c, [langId]: v }));

  const isLocalLang = langId === "javascript" || langId === "typescript";

  const handleRun = async () => {
    if (runGuard.current) return;
    runGuard.current = true;
    setRunning(true);
    setResults(null);
    try {
      const r = await executeCode(problem.id, langId, code);
      setResults(r);
      setResTab("results");
    } catch (e: any) {
      setResults({ type: "compile-error", message: e.message });
    }
    setRunning(false);
    runGuard.current = false;
  };

  const handleReset = () => {
    setCodes((c) => ({ ...c, [langId]: getStarter(problem.id, langId) }));
    setResults(null);
  };

  const passed = results?.results?.filter((r: any) => r.pass).length ?? 0;
  const total = results?.results?.length ?? 0;
  const allPass = total > 0 && passed === total;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* ── Toolbar ── */}
      <div
        className="editor-toolbar"
        style={{
          flexWrap: "wrap",
          gap: 8,
          background: dark ? "#0a0f14" : "#eef0f5",
          borderColor: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        }}
      >
        <LangPill dark={dark} />

        {!isLocalLang && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: T.amber,
              padding: "3px 8px",
              background: `${T.amber}12`,
              border: `1px solid ${T.amber}25`,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            ⚡ Piston API
          </span>
        )}
        {isLocalLang && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: T.teal,
              padding: "3px 8px",
              background: `${T.teal}10`,
              border: `1px solid ${T.teal}22`,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            ⚡ In-browser
          </span>
        )}

        <div style={{ flex: 1 }} />

        <button
          onClick={handleReset}
          style={{
            background: "none",
            border: `1px solid ${th.border}`,
            borderRadius: 7,
            color: th.textS,
            padding: "4px 11px",
            cursor: "pointer",
            fontSize: 12,
            fontFamily: "'Outfit',sans-serif",
          }}
        >
          Reset
        </button>

        <button
          onClick={handleRun}
          disabled={running}
          style={{
            background: `linear-gradient(135deg,${T.teal},#00b894)`,
            border: "none",
            borderRadius: 8,
            color: "#000",
            padding: "5px 18px",
            cursor: running ? "wait" : "pointer",
            fontWeight: 800,
            fontSize: 13,
            fontFamily: "'Outfit',sans-serif",
            opacity: running ? 0.75 : 1,
            display: "flex",
            alignItems: "center",
            gap: 6,
            minWidth: 110,
            justifyContent: "center",
          }}
        >
          {running ? (
            <>
              <span
                style={{
                  display: "inline-block",
                  animation: "spin 0.8s linear infinite",
                  fontSize: 15,
                }}
              >
                ⟳
              </span>{" "}
              Running…
            </>
          ) : (
            <>
              <Icon name="play" size={12} color="#000" /> Run Tests{" "}
              <span style={{ fontSize: 9, opacity: 0.5, marginLeft: 2 }}>
                ⌘↵
              </span>
            </>
          )}
        </button>
      </div>

      {/* ── Textarea ── */}
      <textarea
        className="editor-textarea"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            const s = e.currentTarget.selectionStart,
              en = e.currentTarget.selectionEnd;
            const ind = lang?.indent === 4 ? "    " : "  ";
            const next = code.substring(0, s) + ind + code.substring(en);
            setCode(next);
            setTimeout(() => {
              e.currentTarget.selectionStart = e.currentTarget.selectionEnd = s + ind.length;
            }, 0);
          }
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            e.preventDefault();
            handleRun();
          }
        }}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        style={{
          marginTop: -1,
          height: 300,
          borderRadius: "0 0 12px 12px",
          background: dark ? "#0d1117" : "#f8f9fc",
          color: dark ? "#c9d1d9" : "#24292e",
          borderColor: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        }}
      />

      {/* ── Running spinner ── */}
      {running && (
        <div
          className="fade-in"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "16px 20px",
            background: `${T.teal}0a`,
            border: `1px solid ${T.teal}22`,
            borderRadius: 12,
            color: th.text,
            fontSize: 13,
          }}
        >
          <span
            style={{
              fontSize: 22,
              display: "inline-block",
              animation: "spin 0.8s linear infinite",
            }}
          >
            ⟳
          </span>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 2 }}>
              Running your {lang?.label} code…
            </div>
            <div style={{ fontSize: 11, color: th.textS }}>
              {isLocalLang
                ? "Executing in-browser."
                : "Compiling & running remotely."}
            </div>
          </div>
        </div>
      )}

      {/* ── Results & Solution ── */}
      {results && !running && (
        <div className="fade-up">
          <div
            style={{
              display: "flex",
              gap: 6,
              marginBottom: 10,
              flexWrap: "wrap",
            }}
          >
            {[
              ["results", `📊 Results${total ? ` (${passed}/${total})` : ""}`],
              ["solution", "📖 Solution"],
            ].map(([id, label]) => (
              <button
                key={id}
                className="tab-pill"
                onClick={() => setResTab(id)}
                style={{
                  background:
                    resTab === id ? T.violet : "rgba(255,255,255,0.07)",
                  color: resTab === id ? "#fff" : th.text,
                  fontSize: 12,
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {resTab === "results" && (
            <TestResults results={results} dark={dark} allPass={allPass} />
          )}
          {resTab === "solution" && (
            <div className="fade-up">
              <div
                style={{
                  background: `${T.violet}10`,
                  border: `1px solid ${T.violet}25`,
                  borderRadius: 10,
                  padding: "10px 14px",
                  fontSize: 13,
                  lineHeight: 1.6,
                  marginBottom: 8,
                  color: th.text,
                }}
              >
                <span style={{ fontWeight: 700, color: T.violet }}>
                  💡 Approach:{" "}
                </span>
                {problem.solution}
              </div>
              <TranslatedCode
                jsCode={problem.code || ""}
                cacheKey={problem.id + "::solution"}
              />
            </div>
          )}
        </div>
      )}

      {/* ── Spoiler ── */}
      {!results && !running && (
        <details style={{ marginTop: 4 }}>
          <summary
            style={{
              cursor: "pointer",
              fontSize: 12,
              color: th.textS,
              userSelect: "none",
              padding: "6px 0",
            }}
          >
            Show solution (spoiler)
          </summary>
          <div className="fade-up" style={{ marginTop: 8 }}>
            <div
              style={{
                background: `${T.violet}10`,
                border: `1px solid ${T.violet}25`,
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 13,
                marginBottom: 8,
                color: th.text,
                lineHeight: 1.6,
              }}
            >
              <span style={{ fontWeight: 700, color: T.violet }}>
                💡 Approach:{" "}
              </span>
              {problem.solution}
            </div>
            <TranslatedCode
              jsCode={problem.code || ""}
              cacheKey={problem.id + "::solution"}
            />
          </div>
        </details>
      )}
    </div>
  );
}
