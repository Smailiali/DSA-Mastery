<div align="center">

# ⚡ DSA Mastery

**A structured, self-paced platform to master Data Structures & Algorithms for technical interviews.**

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## Overview

DSA Mastery is a full-featured interview preparation platform built for developers who want a structured, distraction-free environment to study algorithms and data structures. It covers a complete **4-week curriculum** from Big-O fundamentals through advanced graphs, dynamic programming, and system design — with built-in spaced repetition, a live code editor, mock interviews, and detailed progress tracking.

No accounts. No subscriptions. Everything runs in the browser and persists locally.

---

## Features

| Feature | Description |
|---|---|
| 📚 **4-Week Curriculum** | Structured weekly topics from Arrays to Tries, with problems sorted by difficulty |
| 🧠 **Spaced Repetition** | SM-2 algorithm schedules problem reviews at optimal intervals |
| 💻 **Live Code Editor** | Write and run JavaScript/TypeScript directly in the browser — no setup required |
| 🌐 **12 Languages** | View reference solutions in Python, Java, C++, Go, Rust, and more |
| 🎯 **Pattern Drills** | Rapid-fire flashcards to recognize algorithm patterns instantly |
| 🏆 **Interview Mastery** | Curated top-25 problems with a 6-step interview framework |
| ⏱️ **Mock Interview Mode** | Timed sessions with debrief checklists and session history |
| 📊 **Stats Dashboard** | Visual progress tracking, streak calendar, and weak-topic detection |
| 📅 **Study Schedule** | 30-day daily plan with topic links and review sessions |
| 🌙 **Dark / Light Mode** | Full theme support with a single toggle |
| 📝 **Problem Notes** | Auto-saved personal notes on every problem |
| 🔥 **Streak Tracking** | Daily goal system with activity heatmap |

---

## Tech Stack

- **Framework** — React 18 + TypeScript
- **Build Tool** — Vite 5
- **Styling** — Tailwind CSS v4 + CSS-in-JS design tokens
- **State** — React useState / useContext (no external state library)
- **Persistence** — localStorage via a typed `SafeStorage` wrapper
- **Spaced Repetition** — SuperMemo 2 (SM-2) algorithm
- **Code Execution** — In-browser JS/TS runner + [Piston API](https://github.com/engineer-man/piston) for other languages
- **Code Translation** — Anthropic API (optional, for multi-language solution display)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Smailiali/DSA-Mastery.git
cd DSA-Mastery

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── editor/          # CodeEditor, CodeBlock, LangPill, TestResults, TranslatedCode
│   ├── home/            # HomeView, CalendarHeatmap, StreakDisplay
│   ├── layout/          # Sidebar, TopNav, Toast, Onboard, StyleTag
│   ├── review/          # ReviewSession, PatternDrillsView, MockInterviewView, MixedPatternsView
│   ├── shared/          # ProgressRing, SCard, Icon, LangIcon, HintAccordion
│   ├── stats/           # StatsDashboard, ScheduleView
│   └── topic/           # TopicView, ProblemPage, EditorialPanel, ProblemNotes, InterviewMasteryView
├── context/
│   └── LangContext.tsx  # Global language selection context
├── data/
│   ├── curriculum.ts    # 4-week curriculum with all topics and problems
│   ├── deep-dive.ts     # Textbook-level topic explanations
│   ├── drills.ts        # Interview problems, pattern drills, mock problems
│   ├── editorials.ts    # Editorial walkthroughs per problem
│   ├── languages.ts     # Language configs, starters, and templates
│   ├── problems.ts      # Test cases and metadata for all problems
│   └── schedule.ts      # 30-day study schedule
├── hooks/
│   ├── useActiveTimer.ts
│   ├── useLang.ts
│   └── useTheme.ts
├── types/
│   └── index.ts         # Shared TypeScript interfaces
└── utils/
    ├── SafeStorage.ts   # Typed localStorage wrapper
    ├── codeExecution.ts # In-browser runner + Piston API integration
    ├── dateUtils.ts     # Date helpers
    ├── sm2.ts           # SuperMemo 2 spaced repetition algorithm
    └── tokens.ts        # Design token constants
```

---

## Curriculum Overview

| Week | Focus | Topics |
|------|-------|--------|
| **Week 1** | Foundations | Big-O, Arrays, Two Pointers, Sliding Window, Hash Maps |
| **Week 2** | Core Structures | Recursion, Stacks, Queues, Binary Search, Sorting, Linked Lists |
| **Week 3** | Advanced Structures | Trees, Heaps, Graphs, Backtracking, Greedy, Dynamic Programming |
| **Week 4** | Mastery | Tries, Advanced Graphs, System Design DS, Advanced DP, String Algorithms |

---

## Language Support

JavaScript · TypeScript · Python · Java · C++ · Go · Rust · C# · Kotlin · Ruby · Swift · PHP

JavaScript and TypeScript run directly in the browser. All other languages are executed via the [Piston API](https://github.com/engineer-man/piston) — no local setup required.

---

## License

MIT — feel free to use this project for personal learning, forks, or contributions.
