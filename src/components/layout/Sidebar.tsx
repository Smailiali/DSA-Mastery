import React from "react";
import { T } from "@/utils/tokens";
import { useTheme } from "@/hooks/useTheme";
import { Icon } from "@/components/shared/Icon";
import { ProgressRing, SidebarBar } from "@/components/shared/ProgressRing";

interface SidebarProps {
  dark: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  curriculum: any[];
  current: string;
  setCurrent: (id: string) => void;
  search: string;
  setSearch: (s: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress: Record<string, any>;
  isOpen: boolean;
  onClose?: () => void;
  collapsed: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({
  dark,
  curriculum,
  current,
  setCurrent,
  search,
  setSearch,
  progress,
  isOpen,
  onClose,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const th = useTheme(dark);
  const [weekCollapsed, setWeekCollapsed] = React.useState<Record<string, boolean>>({});
  const allTopics = curriculum.flatMap((w) => w.topics);
  const doneTopics = allTopics.filter((t) => progress[t.id]?.topicDone).length;
  const globalPct = allTopics.length
    ? Math.round((doneTopics / allTopics.length) * 100)
    : 0;

  const filtered = curriculum
    .map((wk) => ({
      ...wk,
      topics: wk.topics.filter(
        (t: any) => !search || t.title.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((w) => w.topics.length > 0);

  const TOOLS = [
    { id: "spaced-review", label: "Spaced Review", icon: "brain" },
    { id: "interview-mastery", label: "Interview Mastery", icon: "trophy" },
    { id: "pattern-drills", label: "Pattern Drills", icon: "target" },
    { id: "mock-interview", label: "Mock Interview", icon: "clock" },
    { id: "mixed-patterns", label: "Mixed Patterns", icon: "shuffle" },
    { id: "study-schedule", label: "Study Schedule", icon: "calendar" },
    { id: "stats-dashboard", label: "Progress Stats", icon: "chart" },
  ];

  const handleNav = (id: string) => {
    setCurrent(id);
    onClose && onClose();
  };
  const c = collapsed; // shorthand

  return (
    <div
      className={`sidebar ${isOpen ? "open" : ""} ${c ? "collapsed" : ""}`}
      style={{ background: th.bg1, borderRight: `1px solid ${th.border}` }}
    >
      {/* Brand */}
      <div
        style={{
          padding: c ? "8px 6px" : "14px 14px 10px",
          borderBottom: `1px solid ${th.border}`,
          display: "flex",
          flexDirection: "column",
          alignItems: c ? "center" : "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: c ? 0 : 9,
            marginBottom: c ? 4 : 10,
            cursor: "pointer",
            justifyContent: c ? "center" : "flex-start",
          }}
          onClick={() => handleNav("home")}
        >
          <div
            style={{
              width: c ? 36 : 32,
              height: c ? 36 : 32,
              borderRadius: 9,
              background: `linear-gradient(135deg,${T.teal},#00b894)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: `0 0 14px ${T.teal}40`,
            }}
          >
            <Icon name="bolt" size={c ? 18 : 16} color="#fff" />
          </div>
          {!c && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                  letterSpacing: "-0.2px",
                  color: th.text,
                }}
              >
                DSA Mastery
              </div>
              <div style={{ fontSize: 10, color: th.textS }}>
                30-Day Interview Prep
              </div>
            </div>
          )}
          {!c && (
            <ProgressRing pct={globalPct} size={32} stroke={3} color={T.teal}>
              <span style={{ fontSize: 7, fontWeight: 900, color: T.teal }}>
                {globalPct}%
              </span>
            </ProgressRing>
          )}
          {!c && onToggleCollapse && (
            <button
              className="sidebar-collapse-btn"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCollapse();
              }}
              title="Collapse"
              style={{ color: th.textS, marginLeft: 4 }}
            >
              <Icon name="chevLeft" size={14} />
            </button>
          )}
        </div>
        {c && onToggleCollapse && (
          <button
            className="sidebar-collapse-btn"
            onClick={onToggleCollapse}
            title="Expand"
            style={{ color: th.textS, width: "100%" }}
          >
            <Icon name="chevRight" size={14} />
          </button>
        )}
        {!c && (
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                opacity: 0.4,
              }}
            >
              <Icon name="search" size={13} />
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search topics…"
              style={{
                width: "100%",
                padding: "6px 8px 6px 26px",
                background: th.bg3,
                border: `1px solid ${th.border}`,
                borderRadius: 8,
                fontSize: 12,
                color: th.text,
                outline: "none",
                fontFamily: "'Outfit',sans-serif",
                boxSizing: "border-box",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  position: "absolute",
                  right: 6,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: th.textS,
                  fontSize: 11,
                  padding: 0,
                }}
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>

      <div className="sidebar-inner">
        {c ? (
          /* ── COLLAPSED: icons only ── */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              paddingTop: 4,
            }}
          >
            {allTopics.map((t) => {
              const active = current === t.id;
              const tdone = progress[t.id]?.topicDone;
              const wk = curriculum.find((w) =>
                w.topics.some((tp: any) => tp.id === t.id),
              );
              return (
                <button
                  key={t.id}
                  onClick={() => handleNav(t.id)}
                  title={t.title}
                  style={{
                    width: 40,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: active
                      ? `${wk?.color || T.teal}18`
                      : "transparent",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: 14,
                    position: "relative",
                    transition: "all 0.12s",
                  }}
                >
                  {t.emoji}
                  {tdone && (
                    <span
                      style={{
                        position: "absolute",
                        top: 2,
                        right: 4,
                        width: 6,
                        height: 6,
                        borderRadius: 99,
                        background: T.teal,
                      }}
                    />
                  )}
                </button>
              );
            })}
            <div
              style={{
                height: 1,
                width: "80%",
                background: th.border,
                margin: "6px 0",
              }}
            />
            {TOOLS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                title={item.label}
                style={{
                  width: 40,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    current === item.id ? `${T.amber}18` : "transparent",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  transition: "all 0.12s",
                }}
              >
                <Icon
                  name={item.icon}
                  size={16}
                  color={current === item.id ? T.amber : th.textS}
                />
              </button>
            ))}
          </div>
        ) : (
          /* ── EXPANDED: full sidebar ── */
          <>
            {filtered.map((wk) => {
              const done = wk.topics.filter(
                (t: any) => progress[t.id]?.topicDone,
              ).length;
              const open = !weekCollapsed[wk.week];
              return (
                <div key={wk.week} style={{ marginBottom: 3 }}>
                  <button
                    onClick={() =>
                      setWeekCollapsed((p) => ({
                        ...p,
                        [wk.week]: !p[wk.week],
                      }))
                    }
                    style={{
                      width: "100%",
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "8px 10px",
                      borderRadius: 9,
                      color: th.text,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontFamily: "'Outfit',sans-serif",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 9,
                          fontWeight: 800,
                          color: wk.color,
                          letterSpacing: ".07em",
                          textTransform: "uppercase",
                          marginBottom: 1,
                        }}
                      >
                        Week {wk.week} · {wk.title}
                      </div>
                      <SidebarBar
                        done={done}
                        total={wk.topics.length}
                        color={wk.color}
                      />
                    </div>
                    <span
                      style={{
                        opacity: 0.4,
                        fontSize: 9,
                        marginLeft: 7,
                        transform: open ? "rotate(180deg)" : "",
                        transition: "transform 0.2s",
                        marginTop: -8,
                      }}
                    >
                      ▼
                    </span>
                  </button>
                  {open &&
                    wk.topics.map((t: any) => {
                      const active =
                        current === t.id || current === `topic:${t.id}`;
                      const tdone = progress[t.id]?.topicDone;
                      return (
                        <button
                          key={t.id}
                          className="s-item"
                          onClick={() => handleNav(t.id)}
                          style={{
                            background: active
                              ? `${wk.color}18`
                              : "transparent",
                            borderLeft: `3px solid ${active ? wk.color : "transparent"}`,
                            color: active ? th.text : th.textS,
                            fontWeight: active ? 600 : 400,
                          }}
                        >
                          <span style={{ fontSize: 12, flexShrink: 0 }}>
                            {t.emoji}
                          </span>
                          <span style={{ flex: 1, fontSize: 12.5 }}>
                            {t.title}
                          </span>
                          {tdone ? (
                            <span
                              style={{
                                color: T.teal,
                                fontSize: 10,
                                fontWeight: 800,
                                flexShrink: 0,
                              }}
                            >
                              ✓
                            </span>
                          ) : active ? (
                            <span
                              style={{
                                width: 5,
                                height: 5,
                                borderRadius: 99,
                                background: wk.color,
                                flexShrink: 0,
                              }}
                            />
                          ) : null}
                        </button>
                      );
                    })}
                </div>
              );
            })}

            <div
              style={{
                marginTop: 7,
                paddingTop: 8,
                borderTop: `1px solid ${th.border}`,
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  color: th.textS,
                  letterSpacing: ".07em",
                  textTransform: "uppercase",
                  padding: "3px 10px 7px",
                }}
              >
                Tools
              </div>
              {TOOLS.map((item) => {
                const active = current === item.id;
                return (
                  <button
                    key={item.id}
                    className="s-item"
                    onClick={() => handleNav(item.id)}
                    style={{
                      background: active ? `${T.amber}18` : "transparent",
                      borderLeft: `3px solid ${active ? T.amber : "transparent"}`,
                      color: active ? th.text : th.textS,
                      fontWeight: active ? 600 : 400,
                      marginBottom: 1,
                    }}
                  >
                    <Icon name={item.icon} size={14} />
                    <span style={{ flex: 1, fontSize: 12.5 }}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {!c && (
        <div
          style={{
            padding: "8px 12px",
            borderTop: `1px solid ${th.border}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span className="streak-badge">🔥 Keep going!</span>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 11, color: th.textS }}>
            {doneTopics}/{allTopics.length}
          </span>
        </div>
      )}
    </div>
  );
}
