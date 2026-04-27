import { useState } from "react";
import "./LoginPage.css";

interface Props {
  onLogin: (username: string) => void;
}

export default function LoginPage({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter username and password");
      return;
    }

    setError("");
    onLogin(username);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">SOC Event Investigator</h2>
        <p className="login-subtitle">
          Monitor and investigate security events
        </p>

        <input
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="login-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="login-error">{error}</div>}

        <button
          className="login-button"
          onClick={handleLogin}>
            Login
        </button>
      </div>
    </div>
  );
}
