import { useState } from "react";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={(user) => {
          setUsername(user);
          setIsLoggedIn(true);
        }}
      />
    );
  }

  return (
    <DashboardPage
      username={username}
      onLogout={() => setIsLoggedIn(false)}
    />
  );
}

export default App;
