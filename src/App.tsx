import { useEffect, useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./components/pages/Login.page";
import { Main } from "./components/pages/Main.page";

export function App({ children }: { children: React.ReactNode }) {
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
  return <>{loading ? "" : children}</>;
}

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/chat", element: <Main /> },
]);
