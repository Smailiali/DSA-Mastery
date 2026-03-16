import React, { useRef, useEffect } from "react";
import { T } from "@/utils/tokens";
import { useTheme } from "@/hooks/useTheme";
import { SafeStorage } from "@/utils/SafeStorage";

export function ProblemNotes({ problemId, dark }: any) {
  const th = useTheme(dark);
  const key = `dsa-notes-${problemId}`;
  const [text, setText] = React.useState<string>(() => SafeStorage.get<string>(key, "") ?? "");
  const [saved, setSaved] = React.useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onChange = (v: string) => {
    setText(v);
    setSaved(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      SafeStorage.set(key, v);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 500);
  };
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  return (
    <div style={{ marginTop: 8 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, color: th.text }}>
          📝 Your Notes
        </span>
        <span
          style={{
            fontSize: 10,
            color: T.teal,
            fontWeight: 600,
            opacity: saved ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          ✓ Saved
        </span>
      </div>
      <textarea
        className="notes-textarea"
        value={text}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your approach, edge cases, mistakes..."
        style={{
          background: dark ? "#0d1117" : th.bg2,
          color: th.text,
          border: `1px solid ${th.border}`,
        }}
      />
      <div style={{ fontSize: 10, color: th.textS, marginTop: 3 }}>
        {text.length} chars · auto-saved
      </div>
    </div>
  );
}
