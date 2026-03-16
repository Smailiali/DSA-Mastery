// ── Core data types ──────────────────────────────────────────────

export interface TopicProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  examples: { input: string; output: string }[];
  hints: string[];
  solution: string;
  code: string;
  whyInterviewers: string;
}

export interface Topic {
  id: string;
  title: string;
  emoji: string;
  summary: string;
  intuition: string;
  diagram: string;
  complexity: { common: { name: string; desc: string }[] };
  patterns: string[];
  mistakes: string[];
  realWorld: string[];
  code: string;
  problems: TopicProblem[];
}

export interface Week {
  week: number;
  title: string;
  color: string;
  topics: Topic[];
}

export interface InterviewProblem {
  id: string;
  title: string;
  pattern: string;
  difficulty: "Easy" | "Medium" | "Hard";
  combo: string;
  desc: string;
}

export interface ScheduleDay {
  day: number;
  week: number;
  focus: string;
  tasks: string[];
}

export interface PatternDrill {
  q: string;
  a: string;
  hint: string;
}

export interface MockProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  time: number;
  desc: string;
  hint: string;
  solution: string;
}

// ── Progress / SR state ──────────────────────────────────────────

export interface SREntry {
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: string;
  history: { date: string; quality: number }[];
}

export interface StreakData {
  current: number;
  best: number;
  lastDate: string | null;
  dailyGoal: number;
  todaySolves: number;
  todayDate: string;
}

export interface ProgressData {
  [topicId: string]: {
    topicDone: boolean;
    problems: { [problemId: string]: boolean };
  };
}

// ── Language types ────────────────────────────────────────────────

export interface Language {
  id: string;
  label: string;
  ext: string;
  pistonLang: string;
  pistonVer: string;
  monacoId: string;
}

// ── Theme ────────────────────────────────────────────────────────

export interface Theme {
  bg0: string;
  bg1: string;
  bg2: string;
  bg3: string;
  bg4: string;
  text: string;
  textS: string;
  border: string;
  borderM: string;
}
