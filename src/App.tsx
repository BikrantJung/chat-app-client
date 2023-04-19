import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import Login from "./components/pages/Login.page";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let currentTheme = localStorage.getItem("theme");
    if (!currentTheme) {
      localStorage.setItem("theme", "dark");
      return;
    }
    document.documentElement.classList.add(currentTheme);
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <div>
          <Login />
        </div>
      )}
    </>
  );
}

export default App;
