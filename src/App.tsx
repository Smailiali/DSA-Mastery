import { useState, useEffect, useCallback, useMemo } from "react";

import { LangContext } from "@/context/LangContext";
import { useTheme } from "@/hooks/useTheme";
import { SafeStorage } from "@/utils/SafeStorage";
import { getLocalDateStr, daysBetween } from "@/utils/dateUtils";
import { sm2, getReviewQueue } from "@/utils/sm2";
import { T } from "@/utils/tokens";

import { CURRICULUM, WEEK4_EXTRA_TOPICS } from "@/data/curriculum";
import { INTERVIEW_PROBLEMS, PATTERN_DRILLS, MOCK_PROBLEMS, MIXED_PATTERNS } from "@/data/drills";
import { STUDY_SCHEDULE } from "@/data/schedule";

import { StyleTag } from "@/components/layout/StyleTag";
import { Toast } from "@/components/layout/Toast";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { Onboard } from "@/components/layout/Onboard";
import { HomeView } from "@/components/home/HomeView";
import { StreakDisplay, CalendarHeatmap } from "@/components/home/CalendarHeatmap";
import { SCard } from "@/components/shared/ProgressRing";
import { ReviewSession } from "@/components/review/ReviewSession";
import { TopicView } from "@/components/topic/TopicView";
import { ProblemPage } from "@/components/topic/ProblemPage";
import { InterviewMasteryView } from "@/components/topic/InterviewMasteryView";
import { PatternDrillsView, MockInterviewView } from "@/components/review/PatternDrillsView";
import { MixedPatternsView } from "@/components/review/MixedPatternsView";
import { ScheduleView } from "@/components/stats/ScheduleView";
import { StatsDashboard } from "@/components/stats/StatsDashboard";

export default function App() {
  const [dark, setDark] = useState(true);
  const [current, setCurrent] = useState("home");
  const [langId, setLangId] = useState("javascript");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toast, setToast] = useState<{ message: string; icon: string } | null>(null);
  const [showOnboard, setShowOnboard] = useState(
    () => !SafeStorage.get("dsa-onboarded", false)
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [progress, setProgress] = useState<any>(
    () => SafeStorage.get("dsa-v5-progress", {})
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [srData, setSrData] = useState<any>(
    () => SafeStorage.get("dsa-sr-data", {})
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [streakData, setStreakData] = useState<any>(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const saved: any = SafeStorage.get("dsa-streak", {
      current: 0, best: 0, lastDate: null, dailyGoal: 1,
      todaySolves: 0, todayDate: null,
    });
    const today = getLocalDateStr();
    if (saved.todayDate !== today) {
      const gap = saved.lastDate ? daysBetween(saved.lastDate, today) : 999;
      return {
        ...saved,
        current: gap === 1 && saved.todaySolves >= saved.dailyGoal
          ? saved.current : gap === 0 ? saved.current : 0,
        todaySolves: 0,
        todayDate: today,
      };
    }
    return saved;
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activityData, setActivityData] = useState<any>(
    () => SafeStorage.get("dsa-activity", {})
  );

  const fullCurriculum = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => (CURRICULUM as any[]).map((wk: any) =>
      wk.week === 4
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? { ...wk, topics: [...wk.topics, ...(WEEK4_EXTRA_TOPICS as any[])] }
        : wk
    ),
    []
  );

  useEffect(() => SafeStorage.set("dsa-v5-progress", progress), [progress]);
  useEffect(() => SafeStorage.set("dsa-sr-data", srData), [srData]);
  useEffect(() => SafeStorage.set("dsa-streak", streakData), [streakData]);
  useEffect(() => SafeStorage.set("dsa-activity", activityData), [activityData]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        (document.querySelector("input[placeholder='Search topics…']") as HTMLElement)?.focus();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const showToast = (msg: string, icon = "✅") => setToast({ message: msg, icon });

  const trackSolve = (pid: string) => {
    const today = getLocalDateStr();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setActivityData((a: any) => ({ ...a, [today]: (a[today] || 0) + 1 }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setStreakData((s: any) => {
      const newSolves = s.todaySolves + 1;
      const goalMet = newSolves >= s.dailyGoal;
      const gap = s.lastDate ? daysBetween(s.lastDate, today) : 999;
      let ns = s.current;
      if (goalMet && s.todaySolves < s.dailyGoal)
        ns = gap <= 1 || s.lastDate === today ? s.current + 1 : 1;
      return {
        ...s, todaySolves: newSolves, todayDate: today, lastDate: today,
        current: ns, best: Math.max(s.best, ns),
      };
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSrData((sr: any) => {
      if (sr[pid]) return sr;
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return {
        ...sr,
        [pid]: {
          easeFactor: 2.5, interval: 1, repetitions: 0,
          nextReview: getLocalDateStr(d),
          history: [{ date: today, quality: 4 }],
        },
      };
    });
  };

  const handleSrRate = (pid: string, quality: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSrData((sr: any) => {
      const entry = sr[pid] || { easeFactor: 2.5, interval: 1, repetitions: 0 };
      const result = sm2(quality, entry.easeFactor, entry.interval, entry.repetitions);
      const nd = new Date();
      nd.setDate(nd.getDate() + result.interval);
      return {
        ...sr,
        [pid]: {
          ...result,
          nextReview: getLocalDateStr(nd),
          history: [
            { date: getLocalDateStr(), quality },
            ...(entry.history || []),
          ].slice(0, 50),
        },
      };
    });
    showToast("Review recorded!", "🧠");
  };

  const toggleTopic = useCallback((tid: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setProgress((p: any) => {
      const nd = !p[tid]?.topicDone;
      if (nd) showToast("Topic marked complete! 🔥");
      return { ...p, [tid]: { ...p[tid], topicDone: nd } };
    });
  }, []);

  const toggleProblem = useCallback((tid: string, pid: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setProgress((p: any) => {
      const nd = !p[tid]?.problems?.[pid];
      if (nd) {
        showToast("Problem solved! 💪", "⚡");
        setTimeout(() => trackSolve(pid), 0);
      }
      return {
        ...p,
        [tid]: { ...p[tid], problems: { ...p[tid]?.problems, [pid]: nd } },
      };
    });
  }, []);

  const allTopics = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => fullCurriculum.flatMap((w: any) => w.topics),
    [fullCurriculum]
  );
  const allProblems = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => allTopics.flatMap((t: any) => t.problems),
    [allTopics]
  );

  const isProblemRoute = current.startsWith("problem:");
  const problemId = isProblemRoute ? current.slice(8) : null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeProblem = problemId ? allProblems.find((p: any) => p.id === problemId) : null;
  const problemTopic = activeProblem
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? allTopics.find((t: any) => t.problems.some((p: any) => p.id === activeProblem.id))
    : null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeTopic = !isProblemRoute ? allTopics.find((t: any) => t.id === current) : null;
  const weekInfo = activeTopic
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? fullCurriculum.find((wk: any) => wk.topics.some((t: any) => t.id === current))
    : problemTopic
      ? fullCurriculum.find((wk: any) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          wk.topics.some((t: any) => t.id === problemTopic.id)
        )
      : null;

  const th = useTheme(dark);

  const SPECIAL = new Set([
    "home", "interview-mastery", "pattern-drills", "mock-interview",
    "study-schedule", "mixed-patterns", "stats-dashboard", "spaced-review",
  ]);

  const navigate = (v: string) => {
    setCurrent(v);
    setSearch("");
    setSidebarOpen(false);
    (document.querySelector(".content-scroll") as HTMLElement)?.scrollTo(0, 0);
  };

  const reviewCount = getReviewQueue(srData).length;

  return (
    <LangContext.Provider value={{ langId, setLangId }}>
      <>
        <StyleTag />
        <div
          className="app-shell"
          style={{ background: th.bg0, color: th.text, fontFamily: "'Outfit',system-ui,sans-serif" }}
        >
          {showOnboard && (
            <Onboard onClose={() => { setShowOnboard(false); SafeStorage.set("dsa-onboarded", true); }} />
          )}
          {toast && <Toast {...toast} onDone={() => setToast(null)} />}

          <div className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

          <Sidebar
            dark={dark} curriculum={fullCurriculum} current={current}
            setCurrent={navigate} search={search} setSearch={setSearch}
            progress={progress} isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)} collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
          />

          <div className="main-col">
            <TopNav
              dark={dark} setCurrent={navigate} toggleDark={() => setDark(!dark)}
              activeTopic={activeTopic || problemTopic} activeProblem={activeProblem}
              curriculum={fullCurriculum} onMenuClick={() => setSidebarOpen((o) => !o)}
            />

            <div className="content-scroll">
              {current === "home" && (
                <div>
                  <HomeView dark={dark} curriculum={fullCurriculum} progress={progress} setCurrent={navigate} />
                  <div style={{ marginTop: 18, display: "flex", gap: 14, flexWrap: "wrap" }}>
                    <SCard title="🔥 Streak" dark={dark} style={{ flex: 1, minWidth: 200 }}>
                      <StreakDisplay streakData={streakData} dark={dark} />
                    </SCard>
                    <SCard title="📅 Activity" dark={dark} style={{ flex: 1, minWidth: 200 }}>
                      <CalendarHeatmap activityData={activityData} dark={dark} />
                    </SCard>
                  </div>
                  {reviewCount > 0 && (
                    <button
                      onClick={() => navigate("spaced-review")}
                      className="card-hover"
                      style={{
                        width: "100%", textAlign: "left", padding: "14px 18px",
                        borderRadius: 14, marginTop: 14,
                        background: dark ? `linear-gradient(135deg,${T.violet}12,${T.d2})` : T.l1,
                        border: `1px solid ${T.violet}25`, cursor: "pointer",
                        fontFamily: "'Outfit',sans-serif", display: "flex",
                        alignItems: "center", gap: 12, color: th.text,
                      }}
                    >
                      <span style={{ fontSize: 22 }}>🧠</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: 14 }}>Spaced Review</div>
                        <div style={{ fontSize: 12, color: th.textS }}>
                          {reviewCount} problem{reviewCount !== 1 ? "s" : ""} due
                        </div>
                      </div>
                      <span style={{ background: T.violet, color: "#fff", borderRadius: 99, padding: "3px 10px", fontSize: 12, fontWeight: 800 }}>
                        {reviewCount}
                      </span>
                    </button>
                  )}
                </div>
              )}
              {current === "interview-mastery" && (
                <InterviewMasteryView dark={dark} problems={INTERVIEW_PROBLEMS} setCurrent={navigate} allProblems={allProblems} />
              )}
              {current === "pattern-drills" && <PatternDrillsView dark={dark} drills={PATTERN_DRILLS} />}
              {current === "mock-interview" && <MockInterviewView dark={dark} mockProblems={MOCK_PROBLEMS} />}
              {current === "mixed-patterns" && <MixedPatternsView dark={dark} patterns={MIXED_PATTERNS} />}
              {current === "study-schedule" && (
                <ScheduleView dark={dark} schedule={STUDY_SCHEDULE} setCurrent={navigate} curriculum={fullCurriculum} />
              )}
              {current === "stats-dashboard" && (
                <StatsDashboard dark={dark} curriculum={fullCurriculum} progress={progress} streakData={streakData} activityData={activityData} srData={srData} />
              )}
              {current === "spaced-review" && (
                <ReviewSession dark={dark} srData={srData} onRate={handleSrRate} allTopics={allTopics} allProblems={allProblems} setCurrent={navigate} />
              )}

              {activeTopic && !SPECIAL.has(current) && !isProblemRoute && (
                <TopicView
                  key={current} topic={activeTopic} dark={dark}
                  progress={progress[activeTopic.id] || {}}
                  onToggleTopic={() => toggleTopic(activeTopic.id)}
                  onToggleProblem={toggleProblem}
                  weekColor={weekInfo?.color || T.teal}
                  weekNum={weekInfo?.week || 1}
                  setCurrent={navigate}
                />
              )}

              {isProblemRoute && activeProblem && problemTopic && (
                <ProblemPage
                  key={current} problem={activeProblem} topic={problemTopic}
                  dark={dark} done={!!progress[problemTopic.id]?.problems?.[activeProblem.id]}
                  onToggle={() => toggleProblem(problemTopic.id, activeProblem.id)}
                  onBack={navigate} weekColor={weekInfo?.color || T.teal}
                />
              )}
            </div>
          </div>
        </div>
      </>
    </LangContext.Provider>
  );
}
