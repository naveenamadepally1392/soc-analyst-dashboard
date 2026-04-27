import { useEffect, useState } from "react";
import { FiMoon, FiSun, FiUser, FiLogOut } from "react-icons/fi";
import CardsPage from "../components/Cards/CardsPage";
import TimeRangePage from "../components/TimeRange/TimeRangePage";
import LogsTable from "../components/LogsTable/LogsTable";
import { mockLogs } from "../data/logs";
import EventsChart from "../components/EventsChart/EventsChart";
import { formatTimestamp } from "../utils/formatTimestamp";

interface Props {
  username: string;
  onLogout: () => void;
}

export default function DashboardPage({ username, onLogout }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" || saved === "light" ? saved : "light";
  });

  const [logs] = useState(mockLogs);
  const [now] = useState(() => Date.now());

  const [statusFilter, setStatusFilter] = useState<
    "all" | "allowed" | "blocked" | "anomaly"
    >("all");

  const [selectedRange, setSelectedRange] = useState<
    "" | "30m" | "1h" | "6h" | "12h" | "24h"
    >("");

  const handleStatusFilterChange = (
      nextStatus: "all" | "allowed" | "blocked" | "anomaly"
    ) => {
      setStatusFilter(nextStatus);
      if (nextStatus === "all") {
        setSelectedRange("");
      }
    };

  const getTimeInMs = (range: string) => {
   switch (range) {
    case "30m": return 30 * 60 * 1000;
    case "1h": return 60 * 60 * 1000;
    case "6h": return 6 * 60 * 60 * 1000;
    case "12h": return 12 * 60 * 60 * 1000;
    case "24h": return 24 * 60 * 60 * 1000;
    default: return Infinity; // No time filter when empty
  }
};

const rangeMs = getTimeInMs(selectedRange);

const filteredLogs = logs
  .filter((log) => {
    if (statusFilter !== "all" && log.status !== statusFilter) return false;

    if (log.timestamp && selectedRange) {
      const logTime = new Date(log.timestamp).getTime();
      if (now - logTime > rangeMs) return false;
    }

    return true;
  })
  .map((log) => ({ ...log, formattedTimestamp: formatTimestamp(log.timestamp) }))
  .sort((a, b) => {
    const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    return timeB - timeA; // descending order
  });

 const totals = {
    total: filteredLogs.length,
    allowed: filteredLogs.filter(l => l.status === "allowed").length,
    blocked: filteredLogs.filter(l => l.status === "blocked").length,
    anomaly: filteredLogs.filter(l => l.status === "anomaly").length,
    };
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
        <EventsChart logs={filteredLogs} />
      <LogsTable logs={filteredLogs}
  statusFilter={statusFilter}
  setStatusFilter={handleStatusFilterChange} />
    </div>
  );
}
