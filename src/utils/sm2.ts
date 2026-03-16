export function sm2(
  quality: number,
  prevEF: number,
  prevInterval: number,
  prevReps: number
) {
  const ef = Math.max(
    1.3,
    prevEF + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );
  if (quality < 3) return { easeFactor: ef, interval: 1, repetitions: 0 };
  const reps = prevReps + 1;
  return {
    easeFactor: ef,
    interval:
      reps === 1 ? 1 : reps === 2 ? 6 : Math.round(prevInterval * ef),
    repetitions: reps,
  };
}

export function getReviewQueue(srData: Record<string, any>) {
  const today = getLocalDateStr();
  return Object.entries(srData || {})
    .filter(([, e]) => !e.nextReview || e.nextReview <= today)
    .map(([pid, e]) => ({ problemId: pid, ...e }))
    .sort((a, b) => (a.nextReview || "").localeCompare(b.nextReview || ""));
}

function getLocalDateStr(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
