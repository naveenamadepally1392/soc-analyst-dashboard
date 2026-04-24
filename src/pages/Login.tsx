import { useState } from "react";

interface Props {
  onLogin: () => void;
}


export default function LoginPage({ onLogin }: Props) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter username and password');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      onLogin();
    }, 800);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>SOC Event Investigator</h2>
        <p style={{ color: "#6b7280" }}>
          Monitor and investigate security events
        </p>
        <input placeholder="Username" style={styles.input} value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" style={styles.input} value={password} onChange={e => setPassword(e.target.value)} />
        {error && (
          <div style={{ color: 'red', marginTop: 4, marginBottom: 4, fontSize: 14 }}>{error}</div>
        )}
        <button onClick={handleLogin} style={styles.button}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f7fb",
  },
  card: {
    background: "#fff",
    padding: "32px",
    borderRadius: "12px",
    width: "flexible",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },
};