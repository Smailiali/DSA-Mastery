const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Outfit:wght@400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; overflow: hidden; }
  body { font-family: 'Outfit', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }

  .app-shell { display:flex; height:100vh; overflow:hidden; position:relative; }
  .main-col { flex:1; display:flex; flex-direction:column; min-width:0; overflow:hidden; }
  .content-scroll { flex:1; overflow-y:auto; padding:24px 32px 48px; scroll-behavior:smooth; }

  .sidebar { width:260px; flex-shrink:0; height:100vh; display:flex; flex-direction:column; overflow:hidden; transition:width 0.25s cubic-bezier(.4,0,.2,1),transform 0.28s cubic-bezier(.4,0,.2,1); z-index:200; }
  .sidebar-inner { flex:1; overflow-y:auto; padding:6px 8px 12px; }

  .sidebar.collapsed { width:56px; }
  .sidebar.collapsed .sidebar-inner { padding:6px 4px; }
  .sidebar-collapse-btn { background:none; border:none; cursor:pointer; padding:4px 8px; border-radius:6px; color:inherit; font-size:14px; transition:all 0.15s; display:flex; align-items:center; justify-content:center; }
  .sidebar-collapse-btn:hover { background:rgba(128,128,128,0.1); }

  @media (max-width:768px) {
    .sidebar { position:fixed; left:0; top:0; bottom:0; transform:translateX(-100%); box-shadow:4px 0 32px rgba(0,0,0,0.5); }
    .sidebar.open { transform:translateX(0); }
    .sidebar-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:199; backdrop-filter:blur(2px); }
    .sidebar-overlay.open { display:block; }
    .content-scroll { padding:16px 16px 40px; }
    .hamburger { display:flex !important; }
  }
  @media (min-width:769px) { .hamburger{display:none !important;} .sidebar-overlay{display:none !important;} }

  ::-webkit-scrollbar { width:5px; height:5px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(128,128,128,0.25); border-radius:99px; }
  ::-webkit-scrollbar-thumb:hover { background:rgba(128,128,128,0.4); }

  @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  .fade-up { animation:fadeUp 0.35s cubic-bezier(.4,0,.2,1) both; }
  .fade-in { animation:fadeIn 0.2s ease both; }

  .s-item { width:100%; text-align:left; background:none; border:none; border-left:3px solid transparent; cursor:pointer; padding:7px 12px; font-family:'Outfit',sans-serif; font-size:12.5px; border-radius:0 8px 8px 0; display:flex; align-items:center; gap:8px; transition:all 0.15s; color:inherit; }
  .s-item:hover { background:rgba(128,128,128,0.08); }
  .s-item:active { transform:scale(0.98); }

  .tab-pill { padding:7px 18px; border-radius:99px; border:none; cursor:pointer; font-weight:600; font-size:13px; font-family:'Outfit',sans-serif; transition:all 0.2s cubic-bezier(.4,0,.2,1); display:inline-flex; align-items:center; gap:6px; }
  .tab-pill:active { transform:scale(0.95); }

  .editor-wrap { position:relative; display:flex; flex-direction:column; }
  .editor-textarea { width:100%; resize:vertical; outline:none; background:#0d1117; color:#c9d1d9; border:1px solid rgba(255,255,255,0.1); border-radius:0 0 12px 12px; padding:16px; font-size:13px; line-height:1.75; font-family:'JetBrains Mono','Fira Code',monospace; tab-size:2; min-height:220px; transition:border-color 0.2s,box-shadow 0.2s; }
  .editor-textarea:focus { border-color:rgba(0,212,170,0.4); box-shadow:0 0 0 3px rgba(0,212,170,0.08); }
  .editor-toolbar { background:#0a0f14; border:1px solid rgba(255,255,255,0.1); border-bottom:none; border-radius:12px 12px 0 0; padding:8px 14px; display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
  @media (max-width:600px) { .editor-textarea{font-size:12px;padding:12px;min-height:180px;} }

  .code-wrap pre { background:#0d1117; color:#c9d1d9; padding:18px 16px; border-radius:12px; font-size:12.5px; line-height:1.75; overflow-x:auto; font-family:'JetBrains Mono',monospace; border:1px solid rgba(255,255,255,0.08); tab-size:2; }
  @media (max-width:600px) { .code-wrap pre{font-size:11.5px;padding:12px;} }

  .section-card { border-radius:16px; padding:18px 20px; margin-bottom:14px; transition:border-color 0.2s; }
  .card-hover { transition:transform 0.2s cubic-bezier(.4,0,.2,1),box-shadow 0.2s; cursor:pointer; }
  .card-hover:hover { transform:translateY(-2px); box-shadow:0 4px 20px rgba(0,0,0,0.12); }
  .card-hover:active { transform:translateY(0) scale(0.99); }

  .test-pass { background:#00d4aa10; border:1px solid #00d4aa30; border-radius:11px; padding:11px 14px; }
  .test-fail { background:#ef444410; border:1px solid #ef444430; border-radius:11px; padding:11px 14px; }
  .test-icon-pass { color:#00d4aa; font-weight:900; }
  .test-icon-fail { color:#ef4444; font-weight:900; }

  .nav-btn { background:none; border:none; cursor:pointer; padding:5px 10px; border-radius:8px; font-family:'Outfit',sans-serif; font-size:13px; font-weight:600; transition:all 0.15s; color:inherit; display:flex; align-items:center; gap:5px; }
  .nav-btn:hover { background:rgba(128,128,128,0.1); }
  .nav-btn:active { transform:scale(0.95); }
  .hamburger { background:none; border:none; cursor:pointer; padding:6px; border-radius:8px; color:inherit; display:none; align-items:center; justify-content:center; font-size:20px; transition:background 0.15s; }
  .hamburger:hover { background:rgba(128,128,128,0.1); }

  .topnav { height:52px; flex-shrink:0; display:flex; align-items:center; padding:0 20px; gap:8px; }
  .bc { display:flex; align-items:center; gap:5px; font-size:12px; opacity:0.5; flex-wrap:wrap; }
  .bc span { cursor:pointer; transition:opacity 0.15s; } .bc span:hover { opacity:1; }

  .toast { position:fixed; bottom:24px; right:24px; background:#1a1d24; border:1px solid rgba(0,212,170,0.3); border-radius:14px; padding:11px 18px; font-size:13px; color:#e4e6ef; box-shadow:0 8px 32px rgba(0,0,0,0.4); animation:fadeUp 0.3s cubic-bezier(.4,0,.2,1); z-index:999; display:flex; align-items:center; gap:10px; backdrop-filter:blur(12px); }
  @media (max-width:480px) { .toast{bottom:12px;right:12px;left:12px;} }

  .overlay { position:fixed; inset:0; background:rgba(0,0,0,0.7); backdrop-filter:blur(8px); z-index:1000; display:flex; align-items:center; justify-content:center; animation:fadeIn 0.2s ease; }
  .onboard-card { background:#0c0e13; border:1px solid rgba(0,212,170,0.25); border-radius:24px; padding:36px 40px; max-width:500px; width:92%; animation:fadeUp 0.3s ease; }

  .ring-track { fill:none; }
  .ring-fill { fill:none; transition:stroke-dashoffset 0.8s cubic-bezier(.4,0,.2,1); }

  .hint-btn { width:100%; text-align:left; border:none; background:none; cursor:pointer; padding:8px 12px; border-radius:8px; font-family:'Outfit',sans-serif; font-size:13px; display:flex; justify-content:space-between; align-items:center; transition:background 0.15s; }
  .hint-btn:hover { background:rgba(128,128,128,0.06); }
  .streak-badge { display:inline-flex; align-items:center; gap:5px; background:linear-gradient(135deg,#f59e0b22,#ef444422); border:1px solid #f59e0b30; border-radius:99px; padding:3px 10px; font-size:12px; font-weight:700; color:#f59e0b; }

  .problem-split { display:grid; grid-template-columns:1fr 1fr; gap:16px; align-items:start; }
  @media (max-width:900px) { .problem-split{grid-template-columns:1fr;} }

  .week-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }
  .tool-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
  .stat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
  .diff-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  @media (max-width:700px) { .week-grid{grid-template-columns:1fr;} .tool-grid{grid-template-columns:repeat(2,1fr);} .stat-grid{grid-template-columns:repeat(2,1fr);} .diff-grid{grid-template-columns:1fr;} }
  @media (max-width:380px) { .tool-grid{grid-template-columns:1fr;} .stat-grid{grid-template-columns:1fr 1fr;} }

  .heatmap-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}
  .heatmap-cell{aspect-ratio:1;border-radius:3px;transition:transform .15s}
  .heatmap-cell:hover{transform:scale(1.3);z-index:1}
  .notes-textarea{width:100%;resize:vertical;outline:none;border-radius:10px;padding:12px;font-size:13px;line-height:1.7;font-family:'Outfit',sans-serif;min-height:120px;box-sizing:border-box;transition:border-color 0.2s,box-shadow 0.2s}
  .notes-textarea:focus{border-color:rgba(0,212,170,0.4);box-shadow:0 0 0 3px rgba(0,212,170,0.06)}
  .review-rating-btn{flex:1;padding:10px;border-radius:10px;cursor:pointer;font-weight:700;font-size:13px;font-family:'Outfit',sans-serif;transition:all .15s;border:2px solid}
  .review-rating-btn:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,0.15)}
  .review-rating-btn:active{transform:translateY(0)}
  button{cursor:pointer} button:active{transform:scale(0.97)}
  :focus-visible{outline:2px solid #00d4aa;outline-offset:2px;}

  /* ── MOBILE FIXES ── */
  @media (max-width:600px) {
    .topnav { padding:0 12px; gap:4px; height:46px; }
    .topnav .nav-btn { padding:4px 6px; font-size:12px; }
    .tab-pill { padding:5px 12px; font-size:12px; }
    .editor-toolbar { padding:6px 10px; gap:6px; }
    .review-rating-btn { padding:8px; font-size:12px; }
  }
  @media (max-width:480px) {
    .content-scroll { padding:12px 12px 32px; }
    .stat-grid { gap:8px; }
    .week-grid { gap:8px; }
  }
  .problem-row{cursor:pointer;transition:background 0.12s;} .problem-row:hover{filter:brightness(1.07);}
`;

export function StyleTag() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}
