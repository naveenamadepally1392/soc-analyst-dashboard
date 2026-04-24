import { useEffect, useState } from "react";
import { FiMoon, FiSun, FiUser, FiLogOut } from "react-icons/fi";

interface Props {
  username: string;
  onLogout: () => void;
}

export default function DashboardPage({ username, onLogout }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

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
       <div>
        Time range selector comes here
      </div>
      <div>
        Dashboart components comes here.....
      </div>
      <div>
        Table with events and filters come here....
      </div>
    </div>
  );
}
