import { useEffect, useState } from "react";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import Login from "./components/pages/Login.page";
import { Main } from "./components/pages/Main.page";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useUserStore } from "./store/useUserStore";
import { IUserInfo } from "./types/user.types";
import path from "path";

export function App({ children }: { children: React.ReactNode }) {
  const { setUser, userInfo } = useUserStore((state) => state);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            staleTime: 300000, // 5 minutes
          },
        },
      })
  );
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
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
          {children}
        </QueryClientProvider>
      )}
    </>
  );
}

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/chat", element: <Main /> },
]);
