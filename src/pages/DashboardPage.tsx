import { useEffect, useState } from "react";
import { FiMoon, FiSun, FiUser, FiLogOut } from "react-icons/fi";
import CardsPage from "./CardsPage";
import TimeRangePage from "./TimeRangePage";
import LogsTable from "./LogsTable";
import { mockLogs } from "../data/logs";

interface Props {
  username: string;
  onLogout: () => void;
}

export default function DashboardPage({ username, onLogout }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [logs] = useState(mockLogs);
  const now = Date.now();
  const [statusFilter, setStatusFilter] = useState<
    "all" | "allowed" | "blocked" | "anomaly"
    >("all");

    const [selectedRange, setSelectedRange] = useState<
    "30m" | "1h" | "6h" | "12h" | "24h"
    >("30m");
    const getTimeInMs = (range: string) => {
  switch (range) {
    case "30m": return 30 * 60 * 1000;
    case "1h": return 60 * 60 * 1000;
    case "6h": return 6 * 60 * 60 * 1000;
    case "12h": return 12 * 60 * 60 * 1000;
    case "24h": return 24 * 60 * 60 * 1000;
    default: return 60 * 60 * 1000;
  }
};
const rangeMs = getTimeInMs(selectedRange);
const filteredLogs = logs.filter((log) => {
  // STATUS FILTER
  if (statusFilter !== "all" && log.status !== statusFilter) return false;

  // TIME FILTER
  if (log.timestamp) {
    const logTime = new Date(log.timestamp).getTime();
    if (now - logTime > rangeMs) return false;
  }

  return true;
});
    const totals = {
    total: filteredLogs.length,
    allowed: filteredLogs.filter(l => l.status === "allowed").length,
    blocked: filteredLogs.filter(l => l.status === "blocked").length,
    anomaly: filteredLogs.filter(l => l.status === "anomaly").length,
    };

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark";
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="page">
      <header className="header">
        <div>
          <h1 className="title">SOC Event Investigator</h1>
          <p className="subtitle">Security events dashboard</p>
        </div>

        <div className="userSection">
          <button
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
            className="modeButton"
          >
            {theme === "dark" ? <FiSun size={14} /> : <FiMoon size={14} />}
          </button>

          <div className="userIcon">
            <FiUser size={14} />
          </div>
          <span className="userName">{username}</span>

          <button onClick={onLogout} className="logoutButton">
            <FiLogOut size={14} /> Logout
          </button>
        </div>
      </header>
        <TimeRangePage
        selectedRange={selectedRange}
        onRangeChange={setSelectedRange}
        />
        <CardsPage totals={totals} />
      <LogsTable logs={filteredLogs}
  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter} />
    </div>
  );
}
