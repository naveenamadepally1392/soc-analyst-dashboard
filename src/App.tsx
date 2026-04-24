import { useState } from "react";
import LoginPage from "./pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return <div>Dashboard coming next...</div>;
}

export default App;