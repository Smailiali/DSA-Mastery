import { PROBLEM_META } from "@/data/problems";
import { LANG_MAP, STARTERS, PROBLEM_STARTERS } from "@/data/languages";

export function getStarter(problemId: string, langId: string): string {
  if ((PROBLEM_STARTERS as any)[problemId]?.[langId])
    return (PROBLEM_STARTERS as any)[problemId][langId];
  const meta = (PROBLEM_META as any)[problemId];
  if ((langId === "javascript" || langId === "typescript") && meta?.starter)
    return meta.starter;
  const fn = meta?.fn || "solution";
  const desc = meta?.tests?.[0]?.desc || "Implement your solution";
  const ex = "see Description tab";
  const tmpl = (STARTERS as any)[langId];
  if (tmpl) return tmpl(fn, desc, ex);
  return `// Implement your solution for: ${problemId}\n`;
}

// ── LINKED LIST / TREE HELPERS ──────────────────────────────────
function arrayToList(arr: unknown[]) {
  if (!arr || arr.length === 0) return null;
  function ListNode(this: any, val: unknown, next: unknown = null) {
    this.val = val;
    this.next = next;
  }
  let head: any = new (ListNode as any)(arr[0]);
  let cur = head;
  for (let i = 1; i < arr.length; i++) {
    cur.next = new (ListNode as any)(arr[i]);
    cur = cur.next;
  }
  return head;
}

function listToArray(head: any): unknown[] {
  const arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  return arr;
}

function arrayToTree(arr: (unknown | null)[]) {
  if (!arr || arr.length === 0 || arr[0] == null) return null;
  function TreeNode(this: any, val: unknown, left: unknown = null, right: unknown = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
  const root: any = new (TreeNode as any)(arr[0]);
  const q: any[] = [root];
  let i = 1;
  while (q.length && i < arr.length) {
    const node = q.shift();
    if (i < arr.length && arr[i] != null) {
      node.left = new (TreeNode as any)(arr[i]);
      q.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] != null) {
      node.right = new (TreeNode as any)(arr[i]);
      q.push(node.right);
    }
    i++;
  }
  return root;
}

// ── TEST RUNNER (JS in-browser) ─────────────────────────────────
export function runTests(problemId: string, userCode: string) {
  const meta = (PROBLEM_META as any)[problemId];
  if (!meta)
    return {
      type: "unsupported",
      message: "Interactive editor not yet available for this problem.",
    };
  if (meta.type === "conceptual") return { type: "conceptual", meta };

  const results: any[] = [];

  try {
    const fullCode = `
${arrayToList.toString()}
${arrayToTree.toString()}
${listToArray.toString()}
function ListNode(val,next=null){this.val=val;this.next=next;}
function TreeNode(val,left=null,right=null){this.val=val;this.left=left;this.right=right;}
${userCode}
`;

    const userFn = new Function(
      fullCode +
        `; return typeof ${meta.fn} !== "undefined" ? ${meta.fn} : null;`
    )();
    if (!userFn)
      throw new Error(
        `Function "${meta.fn}" not found. Make sure your function is named exactly: ${meta.fn}`
      );

    for (const test of meta.tests) {
      if (test.ops) {
        try {
          new Function(fullCode + `; return ${meta.fn};`)();
          new Function(
            fullCode + `\n${test.setup}\nreturn { ms: undefined };`
          )();
          results.push({
            desc: test.desc,
            pass: true,
            note: "Class tests: manual verification",
          });
        } catch (e: any) {
          results.push({ desc: test.desc, pass: false, error: e.message });
        }
        continue;
      }

      try {
        const args = test.args.map((a: unknown) => JSON.parse(JSON.stringify(a)));
        let actual;

        if (meta.type === "linked-list") {
          const listHead = args[0] === null ? null : arrayToList(args[0]);
          const resultHead = userFn(listHead, ...args.slice(1));
          actual = resultHead === null ? null : listToArray(resultHead);
        } else if (meta.type === "tree") {
          const treeRoot = args[0] === null ? null : arrayToTree(args[0]);
          actual = userFn(treeRoot, ...args.slice(1));
        } else if (meta.type === "in-place") {
          userFn(...args);
          actual = args[0];
        } else if (problemId === "sort-2") {
          const arr = [...args[0]];
          userFn(arr);
          actual = arr;
        } else {
          actual = userFn(...args);
        }

        const cmp = test.cmp || ((a: unknown, b: unknown) => a === b);
        const pass = cmp(actual, test.expected, args[0]);

        results.push({
          desc: test.desc,
          pass,
          actual: JSON.stringify(actual),
          expected: JSON.stringify(test.expected),
          args: test.args.map((a: unknown) => JSON.stringify(a)).join(", "),
        });
      } catch (err: any) {
        results.push({
          desc: test.desc,
          pass: false,
          error: err.message,
          args: test.args.map((a: unknown) => JSON.stringify(a)).join(", "),
        });
      }
    }
  } catch (err: any) {
    return { type: "compile-error", message: err.message };
  }

  return { type: "results", results };
}

// ── HARNESS HELPERS ─────────────────────────────────────────────
function camel_to_snake(s: string) {
  return s
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "");
}

function jsLit(v: unknown): string {
  return JSON.stringify(v);
}

function pyLit(v: unknown): string {
  if (v === null) return "None";
  if (v === true) return "True";
  if (v === false) return "False";
  if (typeof v === "string") return JSON.stringify(v);
  if (Array.isArray(v)) return `[${v.map(pyLit).join(",")}]`;
  return String(v);
}

function javaLit(v: unknown): string {
  if (typeof v === "boolean") return String(v);
  if (typeof v === "number") return String(v);
  if (typeof v === "string")
    return `"${v.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  if (Array.isArray(v)) {
    if (!v.length) return "new int[]{}";
    if (typeof v[0] === "number") return `new int[]{${v.join(",")}}`;
    if (typeof v[0] === "string")
      return `new String[]{${v.map((x) => `"${x}"`).join(",")}}`;
    if (Array.isArray(v[0]))
      return `new int[][]{${v.map((sub: any) => `new int[]{${sub.join(",")}}`).join(",")}}`;
  }
  return `"${String(v)}"`;
}

function cppLit(v: unknown): string {
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return `"${(v as string).replace(/"/g, '\\"')}"`;
  if (Array.isArray(v)) {
    if (!v.length) return "{}";
    return `{${v.map(cppLit).join(",")}}`;
  }
  return String(v);
}

function goLit(v: unknown): string {
  if (typeof v === "boolean") return String(v);
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return `"${(v as string).replace(/"/g, '\\"')}"`;
  if (Array.isArray(v)) {
    if (!v.length) return "[]int{}";
    if (typeof v[0] === "number") return `[]int{${v.join(",")}}`;
    if (typeof v[0] === "boolean") return `[]bool{${v.join(",")}}`;
    if (typeof v[0] === "string")
      return `[]string{${v.map((x) => `"${x}"`).join(",")}}`;
  }
  return `"${String(v)}"`;
}

function rustLit(v: unknown): string {
  if (typeof v === "boolean") return String(v);
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return `"${(v as string).replace(/"/g, '\\"')}".to_string()`;
  if (Array.isArray(v)) {
    if (!v.length) return "vec![]";
    return `vec![${v.map(rustLit).join(",")}]`;
  }
  return String(v);
}

function csLit(v: unknown): string {
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return `"${(v as string).replace(/"/g, '\\"')}"`;
  if (Array.isArray(v)) {
    if (!v.length) return "new int[]{}";
    if (typeof v[0] === "number") return `new int[]{${v.join(",")}}`;
    if (typeof v[0] === "boolean") return `new bool[]{${v.join(",")}}`;
  }
  return `"${String(v)}"`;
}

function ktLit(v: unknown): string {
  if (typeof v === "boolean") return String(v);
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return `"${(v as string).replace(/"/g, '\\"')}"`;
  if (Array.isArray(v)) {
    if (!v.length) return "intArrayOf()";
    if (typeof v[0] === "number") return `intArrayOf(${v.join(",")})`;
    if (typeof v[0] === "boolean") return `booleanArrayOf(${v.join(",")})`;
  }
  return `"${String(v)}"`;
}

function rbLit(v: unknown): string {
  if (v === null) return "nil";
  if (typeof v === "boolean") return String(v);
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return JSON.stringify(v);
  if (Array.isArray(v)) return `[${v.map(rbLit).join(",")}]`;
  return String(v);
}

function swiftLit(v: unknown): string {
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return JSON.stringify(v);
  if (Array.isArray(v)) {
    if (!v.length) return "[]";
    return `[${v.map(swiftLit).join(",")}]`;
  }
  return String(v);
}

function phpLit(v: unknown): string {
  if (v === null) return "null";
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return JSON.stringify(v);
  if (Array.isArray(v)) return `[${v.map(phpLit).join(",")}]`;
  return String(v);
}

// ── HARNESS BUILDERS ───────────────────────────────────────────
function buildJSHarness(problemId: string, meta: any, userCode: string, tests: any[]) {
  const fn = meta.fn;
  const cases = tests
    .map((t) => {
      const d = t.desc.replace(/`/g, "'");
      const callExpr =
        problemId === "sort-2"
          ? `(()=>{ const _a = ${jsLit(t.args[0])}.slice(); ${fn}(_a); return JSON.stringify(_a); })()`
          : `JSON.stringify(${fn}(${t.args.map(jsLit).join(",")}))`;
      const exp = jsLit(t.expected);
      const cmpNeedsSet = t.cmp && t.cmp.toString().includes("SET_EQ");
      const passCond = cmpNeedsSet
        ? `(_act === _exp || _setEq(JSON.parse(_act), ${exp}))`
        : `_act === _exp`;
      return `try {
  const _act = ${callExpr};
  const _exp = JSON.stringify(${exp});
  console.log(${passCond} ? "PASS ${d}" : "FAIL ${d}|||" + _exp + "|||" + _act);
} catch(e) { console.log("FAIL ${d}|||${exp}|||ERROR: " + e.message); }`;
    })
    .join("\n");

  return `${userCode}

function _setEq(a,b){
  const s = x => JSON.stringify([...x].map(v=>Array.isArray(v)?[...v].sort((i,j)=>i-j):v).sort());
  return s(a)===s(b);
}
${cases}`;
}

function buildPyHarness(meta: any, userCode: string, tests: any[]) {
  const fn = camel_to_snake(meta.fn);
  const cases = tests
    .map((t) => {
      const d = t.desc.replace(/"/g, "'");
      const args = t.args.map(pyLit).join(", ");
      const exp = pyLit(t.expected);
      return `
try:
    _act = ${fn}(${args})
    _exp = ${exp}
    _ok  = str(_act) == str(_exp) or _act == _exp
    print("PASS ${d}" if _ok else f"FAIL ${d}|||{_exp}|||{_act}")
except Exception as e:
    print(f"FAIL ${d}|||${exp}|||ERROR: {e}")`;
    })
    .join("\n");

  return `${userCode}\n\nif __name__ == "__main__":${cases}`;
}

function buildJavaHarness(meta: any, userCode: string, tests: any[]) {
  const fn = meta.fn;
  const calls = tests
    .map((t) => {
      const d = t.desc.replace(/"/g, "'");
      const args = t.args.map(javaLit).join(", ");
      const exp = javaLit(t.expected);
      return `    try {
        String _act = fmt(sol.${fn}(${args}));
        String _exp = fmt(${exp});
        System.out.println(_act.equals(_exp) ? "PASS ${d}" : "FAIL ${d}|||" + _exp + "|||" + _act);
    } catch(Exception e){ System.out.println("FAIL ${d}|||?|||ERROR: "+e.getMessage()); }`;
    })
    .join("\n");

  return `import java.util.*;
class Solution {
    ${userCode}
    static String fmt(Object o){
        if(o instanceof int[]) return Arrays.toString((int[])o);
        if(o instanceof boolean) return Boolean.toString((boolean)o);
        return String.valueOf(o);
    }
    public static void main(String[] a){
        Solution sol=new Solution();
${calls}
    }
}`;
}

function buildCppHarness(meta: any, userCode: string, tests: any[]) {
  const fn = meta.fn;
  const cases = tests
    .map((t) => {
      const d = t.desc.replace(/"/g, "'");
      return `    // test: ${d}
    { bool _ok = false;
      try { auto _r = sol.${fn}(${t.args.map(cppLit).join(",")}); auto _e = ${cppLit(t.expected)}; _ok = (_r == _e); } catch(...) {}
      std::cout << (_ok ? "PASS ${d}" : "FAIL ${d}|||expected|||got") << std::endl; }`;
    })
    .join("\n");

  return `#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    ${userCode}
};
int main(){
    Solution sol;
${cases}
    return 0;
}`;
}

function buildGoHarness(meta: any, userCode: string, tests: any[]) {
  const fn = meta.fn[0].toUpperCase() + meta.fn.slice(1);
  const cases = tests
    .map((t) => {
      const d = t.desc.replace(/"/g, "'");
      return `    { _a := ${fn}(${t.args.map(goLit).join(",")})
      _e := ${goLit(t.expected)}
      if fmt.Sprintf("%v",_a)==fmt.Sprintf("%v",_e) { fmt.Println("PASS ${d}") } else { fmt.Printf("FAIL ${d}|||%v|||%v\\n",_e,_a) } }`;
    })
    .join("\n");

  return `package main
import "fmt"
${userCode}
func main(){
${cases}
}`;
}

function buildRustHarness(meta: any, userCode: string, tests: any[]) {
  const fn = camel_to_snake(meta.fn);
  const cases = tests
    .map((t) => {
      const d = t.desc.replace(/"/g, "'");
      return `    { let _a = ${fn}(${t.args.map(rustLit).join(",")});
      let _e = ${rustLit(t.expected)};
      if format!("{:?}",_a)==format!("{:?}",_e) { println!("PASS ${d}"); } else { println!("FAIL ${d}|||{:?}|||{:?}",_e,_a); } }`;
    })
    .join("\n");

  return `${userCode}
fn main(){
${cases}
}`;
}

function buildCsharpHarness(meta: any, userCode: string, tests: any[]) {
  const fn = meta.fn[0].toUpperCase() + meta.fn.slice(1);
  const cases = tests
    .map((t) => {
      const d = t.desc.replace(/"/g, "'");
      return `    try { string _a=Fmt(sol.${fn}(${t.args.map(csLit).join(",")})),_e=Fmt(${csLit(t.expected)});
      Console.WriteLine(_a==_e?"PASS ${d}":"FAIL ${d}|||"+_e+"|||"+_a);
    } catch(Exception e){ Console.WriteLine("FAIL ${d}|||?|||ERROR: "+e.Message); }`;
    })
    .join("\n");

  return `using System;
using System.Linq;
class Solution {
    ${userCode}
    string Fmt(object o){ if(o is int[] a) return "["+string.Join(",",a)+"]"; if(o is bool b) return b.ToString().ToLower(); return o?.ToString()??"null"; }
    static void Main(){ var s=new Solution();
${cases}
    }
}`;
}

function buildKotlinHarness(meta: any, userCode: string, tests: any[]) {
  const fn = meta.fn;
  const cases = tests
    .map((t) => {
      const d = t.desc.replace(/"/g, "'");
      return `    try { val _a = ${fn}(${t.args.map(ktLit).join(",")}).toString(); val _e = ${ktLit(t.expected)}.toString()
      println(if(_a==_e) "PASS ${d}" else "FAIL ${d}|||$_e|||$_a")
    } catch(e:Exception){ println("FAIL ${d}|||?|||ERROR: \${e.message}") }`;
    })
    .join("\n");

  return `${userCode}
fun main(){
${cases}
}`;
}

function buildRubyHarness(meta: any, userCode: string, tests: any[]) {
  const fn = camel_to_snake(meta.fn);
  const cases = tests
    .map((t) => {
      const d = t.desc.replace(/"/g, "'");
      return `begin
  _a = ${fn}(${t.args.map(rbLit).join(",")})
  _e = ${rbLit(t.expected)}
  puts _a == _e ? "PASS ${d}" : "FAIL ${d}|||#{_e}|||#{_a}"
rescue => e; puts "FAIL ${d}|||?|||ERROR: #{e.message}" end`;
    })
    .join("\n");

  return `${userCode}\n${cases}`;
}

function buildSwiftHarness(meta: any, userCode: string, tests: any[]) {
  const fn = meta.fn;
  const cases = tests
    .map((t) => {
      const d = t.desc.replace(/"/g, "'");
      return `    do {
      let _a = "\(${fn}(${t.args.map(swiftLit).join(",")}))"
      let _e = "\(${swiftLit(t.expected)})"
      print(_a == _e ? "PASS ${d}" : "FAIL ${d}|||\(_e)|||\(_a)")
    }`;
    })
    .join("\n");

  return `${userCode}
${cases}`;
}

function buildPhpHarness(meta: any, userCode: string, tests: any[]) {
  const fn = meta.fn;
  const cases = tests
    .map((t) => {
      const d = t.desc.replace(/"/g, "'");
      return `try {
  $act = ${fn}(${t.args.map(phpLit).join(",")});
  $exp = ${phpLit(t.expected)};
  $ok  = ($act == $exp);
  echo ($ok ? "PASS ${d}" : "FAIL ${d}|||" . json_encode($exp) . "|||" . json_encode($act)) . "\\n";
} catch(\\Exception $e) { echo "FAIL ${d}|||?|||ERROR: " . $e->getMessage() . "\\n"; }`;
    })
    .join("\n");

  const code = userCode.replace(/^<\?php\s*/i, "");
  return `<?php\n${code}\n\n${cases}`;
}

export function buildHarness(problemId: string, langId: string, userCode: string): string | null {
  const meta = (PROBLEM_META as any)[problemId];
  if (!meta || !meta.tests) return null;
  const tests = meta.tests.filter((t: any) => !t.ops);
  if (!tests.length) return null;

  if (langId === "javascript" || langId === "typescript")
    return buildJSHarness(problemId, meta, userCode, tests);
  if (langId === "python") return buildPyHarness(meta, userCode, tests);
  if (langId === "java") return buildJavaHarness(meta, userCode, tests);
  if (langId === "cpp") return buildCppHarness(meta, userCode, tests);
  if (langId === "go") return buildGoHarness(meta, userCode, tests);
  if (langId === "rust") return buildRustHarness(meta, userCode, tests);
  if (langId === "csharp") return buildCsharpHarness(meta, userCode, tests);
  if (langId === "kotlin") return buildKotlinHarness(meta, userCode, tests);
  if (langId === "ruby") return buildRubyHarness(meta, userCode, tests);
  if (langId === "swift") return buildSwiftHarness(meta, userCode, tests);
  if (langId === "php") return buildPhpHarness(meta, userCode, tests);
  return null;
}

// ── OUTPUT PARSER ──────────────────────────────────────────────
export function parseTestOutput(stdout: string, tests: any[]) {
  const rows = tests.filter((t) => !t.ops);
  const lines = (stdout || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return rows.map((t, i) => {
    const line = lines[i] || "";
    const d = t.desc;
    if (line.startsWith("PASS "))
      return {
        desc: d,
        pass: true,
        args: t.args.map((a: unknown) => JSON.stringify(a)).join(", "),
      };
    const parts = line.startsWith("FAIL ")
      ? line.slice(5).split("|||")
      : ["", "", line || "(no output)"];
    return {
      desc: d,
      pass: false,
      expected: parts[1] ?? JSON.stringify(t.expected),
      actual: parts[2] ?? "(no output)",
      args: t.args.map((a: unknown) => JSON.stringify(a)).join(", "),
    };
  });
}

// ── PISTON EXECUTOR ───────────────────────────────────────────
export async function pistonRun(langId: string, code: string) {
  const lang = (LANG_MAP as any)[langId];
  const res = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language: lang.pistonLang,
      version: lang.pistonVer,
      files: [{ name: `sol.${lang.ext}`, content: code }],
      stdin: "",
      args: [],
      compile_timeout: 12000,
      run_timeout: 8000,
    }),
  });
  if (!res.ok) throw new Error(`Piston API returned ${res.status}`);
  const data = await res.json();
  return {
    stdout: data.run?.stdout || "",
    stderr: (data.compile?.stderr || "") + (data.run?.stderr || ""),
    code: data.run?.code ?? 0,
  };
}

// ── MAIN EXECUTE FUNCTION ──────────────────────────────────────
export async function executeCode(problemId: string, langId: string, userCode: string) {
  const meta = (PROBLEM_META as any)[problemId];
  if (!meta)
    return { type: "unsupported", message: "No test cases for this problem." };
  if (meta.type === "conceptual") return { type: "conceptual" };

  if (langId === "javascript" || langId === "typescript") {
    return new Promise((resolve) => {
      setTimeout(() => {
        const r = runTests(problemId, userCode) as any;
        resolve({ type: "results", results: r.results || [], raw: r });
      }, 60);
    });
  }

  const harness = buildHarness(problemId, langId, userCode);
  if (!harness)
    return {
      type: "unsupported",
      message: `Test harness not yet available for ${(LANG_MAP as any)[langId]?.label || langId}. Write your solution and run it for output.`,
    };

  try {
    const { stdout, stderr } = await pistonRun(langId, harness);
    if (!stdout && stderr)
      return { type: "compile-error", message: stderr.slice(0, 900) };
    const tests = meta.tests.filter((t: any) => !t.ops);
    return {
      type: "results",
      results: parseTestOutput(stdout, tests),
      stderr: stderr || null,
    };
  } catch (err: any) {
    const msg = err.message || "";
    if (
      msg.includes("fetch") ||
      msg.includes("Failed") ||
      msg.includes("network") ||
      msg.includes("NetworkError")
    ) {
      return {
        type: "offline",
        message:
          "Could not reach the Piston execution API. Check your internet connection and try again. JavaScript and TypeScript always work offline.",
      };
    }
    return { type: "compile-error", message: msg };
  }
}
