import { useEffect, useState } from "react";
import { FiMoon, FiSun, FiUser, FiLogOut } from "react-icons/fi";
import CardsPage from "./CradsPage";
import TimeRangePage from "./TimeRangePage";
import LogsTable from "./LogsTable";
import { mockLogs } from "../data/logs";

interface Props {
  username: string;
  onLogout: () => void;
}

export default function DashboardPage({ username, onLogout }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
    const [selectedRange, setSelectedRange] = useState<
    "30m" | "1h" | "6h" | "12h" | "24h"
    >("1h");
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
        <CardsPage logs={mockLogs} />
      <LogsTable logs={mockLogs} />
    </div>
  );
}
