import { useTheme } from "@/hooks/useTheme";
import { Icon } from "@/components/shared/Icon";
import { LangPill } from "@/components/editor/LangPill";
import { DarkToggle } from "@/components/shared/ProgressRing";

interface TopNavProps {
  dark: boolean;
  setCurrent: (id: string) => void;
  toggleDark: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activeTopic?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activeProblem?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  curriculum: any[];
  onMenuClick: () => void;
}

export function TopNav({
  dark,
  setCurrent,
  toggleDark,
  activeTopic,
  activeProblem,
  curriculum,
  onMenuClick,
}: TopNavProps) {
  const th = useTheme(dark);
  const wk = activeTopic
    ? curriculum.find((w) => w.topics.some((t: any) => t.id === activeTopic.id))
    : null;
  return (
    <div
      className="topnav"
      style={{ borderBottom: `1px solid ${th.border}`, background: th.bg0 }}
    >
      <button
        className="hamburger"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Icon name="menu" size={20} />
      </button>
      <button
        className="nav-btn"
        onClick={() => setCurrent("home")}
        style={{ color: th.textS }}
      >
        <Icon name="home" size={16} />
      </button>
      {activeTopic && wk && (
        <>
          <span style={{ color: th.border, fontSize: 12 }}>›</span>
          <button
            className="nav-btn"
            style={{ color: wk.color, fontSize: 12 }}
            onClick={() => setCurrent(activeTopic.id)}
          >
            {activeTopic.title}
          </button>
        </>
      )}
      {activeProblem && (
        <>
          <span style={{ color: th.border, fontSize: 12 }}>›</span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: th.text,
              maxWidth: 160,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {activeProblem.title}
          </span>
        </>
      )}
      <div style={{ flex: 1 }} />
      <button
        className="nav-btn"
        onClick={() => setCurrent("stats-dashboard")}
        style={{
          color: th.textS,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Icon name="chart" size={14} />
        <span style={{ fontSize: 12 }}>Stats</span>
      </button>
      <LangPill dark={dark} />
      <DarkToggle dark={dark} toggle={toggleDark} />
    </div>
  );
}
