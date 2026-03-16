import { T } from "@/utils/tokens";
import { useTheme } from "@/hooks/useTheme";
import { getLocalDateStr } from "@/utils/dateUtils";

export function CalendarHeatmap({ activityData, dark }: any) {
  const cells: any[] = [];
  const today = new Date();
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const k = getLocalDateStr(d),
      c = (activityData || {})[k] || 0;
    const lvl = c === 0 ? 0 : c <= 1 ? 1 : c <= 3 ? 2 : 3;
    const bg = dark
      ? ["rgba(255,255,255,0.04)", "#00d4aa40", "#00d4aa80", "#00d4aa"]
      : ["rgba(0,0,0,0.04)", "#00d4aa40", "#00d4aa80", "#00d4aa"];
    cells.push(
      <div
        key={k}
        className="heatmap-cell"
        title={`${k}: ${c} solves`}
        style={{ background: bg[lvl], minWidth: 12, minHeight: 12 }}
      />,
    );
  }
  return (
    <div>
      <div className="heatmap-grid">{cells}</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 6,
          fontSize: 10,
          color: dark ? "#8b8fa8" : "#6b7280",
        }}
      >
        <span>Less</span>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: (dark
                ? [
                    "rgba(255,255,255,0.04)",
                    "#00d4aa40",
                    "#00d4aa80",
                    "#00d4aa",
                  ]
                : ["rgba(0,0,0,0.04)", "#00d4aa40", "#00d4aa80", "#00d4aa"])[i],
            }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

export function StreakDisplay({ streakData, dark }: any) {
  const th = useTheme(dark);
  const s = streakData?.current || 0,
    best = streakData?.best || 0,
    td = streakData?.todaySolves || 0,
    goal = streakData?.dailyGoal || 1;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <span style={{ fontSize: 20 }}>{s > 0 ? "🔥" : "❄️"}</span>
        <div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 900,
              color: s > 0 ? T.amber : th.textS,
              lineHeight: 1,
            }}
          >
            {s}
          </div>
          <div style={{ fontSize: 9, color: th.textS }}>day streak</div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: th.textS }}>
        Best: <span style={{ fontWeight: 700, color: T.amber }}>{best}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div
          style={{
            width: 60,
            height: 5,
            borderRadius: 99,
            background: "rgba(255,255,255,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: Math.min(100, Math.round((td / goal) * 100)) + "%",
              background: td >= goal ? T.teal : T.amber,
              borderRadius: 99,
              transition: "width 0.4s",
            }}
          />
        </div>
        <span
          style={{
            fontSize: 10,
            color: td >= goal ? T.teal : th.textS,
            fontWeight: 600,
          }}
        >
          {td}/{goal}
        </span>
      </div>
    </div>
  );
}
