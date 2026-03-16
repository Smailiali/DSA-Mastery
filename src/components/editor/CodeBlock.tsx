import React from "react";
import { T } from "@/utils/tokens";

function tokenize(code: string): string {
  const KW = new Set([
    "function","return","const","let","var","if","else","for","while","class",
    "new","this","of","in","break","continue","true","false","null","undefined",
    "import","export","default","from","switch","case","typeof","instanceof",
    "throw","try","catch","finally","delete","void","async","await","static",
    "extends","super","yield",
  ]);
  const BI = new Set([
    "Math","Array","Map","Set","parseInt","parseFloat","String","Number",
    "console","Object","Promise","JSON","Date","RegExp","Error","Symbol",
    "Infinity","isNaN","isFinite","Boolean","BigInt",
  ]);
  let r = "", i = 0;
  const len = code.length;
  while (i < len) {
    if (code[i] === "/" && code[i + 1] === "/") {
      let e = code.indexOf("\n", i);
      if (e === -1) e = len;
      r += `<span style="color:#6a9955">${code.slice(i, e)}</span>`;
      i = e; continue;
    }
    if (code[i] === "/" && code[i + 1] === "*") {
      let e = code.indexOf("*/", i + 2);
      if (e === -1) e = len - 2;
      r += `<span style="color:#6a9955">${code.slice(i, e + 2)}</span>`;
      i = e + 2; continue;
    }
    if (code[i] === '"') {
      let e = i + 1;
      while (e < len && code[e] !== '"') { if (code[e] === "\\") e++; e++; }
      r += `<span style="color:#ce9178">${code.slice(i, e + 1)}</span>`;
      i = e + 1; continue;
    }
    if (code[i] === "'") {
      let e = i + 1;
      while (e < len && code[e] !== "'") { if (code[e] === "\\") e++; e++; }
      r += `<span style="color:#ce9178">${code.slice(i, e + 1)}</span>`;
      i = e + 1; continue;
    }
    if (code[i] === "`") {
      let e = i + 1;
      while (e < len && code[e] !== "`") { if (code[e] === "\\") e++; e++; }
      r += `<span style="color:#ce9178">${code.slice(i, e + 1)}</span>`;
      i = e + 1; continue;
    }
    if (/[a-zA-Z_$]/.test(code[i])) {
      let e = i;
      while (e < len && /[a-zA-Z0-9_$]/.test(code[e])) e++;
      const w = code.slice(i, e);
      if (KW.has(w)) r += `<span style="color:#569cd6">${w}</span>`;
      else if (BI.has(w)) r += `<span style="color:#4ec9b0">${w}</span>`;
      else r += w;
      i = e; continue;
    }
    if (/[0-9]/.test(code[i]) && (i === 0 || !/[a-zA-Z_$]/.test(code[i - 1]))) {
      let e = i;
      while (e < len && /[0-9.]/.test(code[e])) e++;
      r += `<span style="color:#b5cea8">${code.slice(i, e)}</span>`;
      i = e; continue;
    }
    r += code[i];
    i++;
  }
  return r;
}

interface CodeBlockProps { code: string; }

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const esc = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const hl = tokenize(esc);
  return (
    <div className="code-wrap">
      <button
        onClick={copy}
        style={{
          position: "absolute", top: 8, right: 8, zIndex: 1,
          background: copied ? T.teal : "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6,
          color: copied ? "#000" : "#ccc", padding: "2px 9px",
          cursor: "pointer", fontSize: 10, fontWeight: 700,
          transition: "all 0.2s", fontFamily: "'Outfit',sans-serif",
        }}
      >
        {copied ? "✓ Copied" : "Copy"}
      </button>
      <pre dangerouslySetInnerHTML={{ __html: hl }} />
    </div>
  );
}
