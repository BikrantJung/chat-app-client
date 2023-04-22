import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter } from "react-router-dom";
import Login from "./components/pages/Login.page";
import { Main } from "./components/pages/Main.page";
import { useThemeStore } from "./store/useThemeStore";
import ChatBox from "./components/section/ChatBox";

export function App({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore((state) => state);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            staleTime: 300000, // 5 minutes
            retry: false,
          },
        },
      })
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.documentElement.className = "";
    document.documentElement.className = theme;
    setLoading(false);
  }, [theme]);
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
  {
    path: "/chat",
    element: <Main />,
    children: [
      {
        path: "/chat/:chatId",
        element: <ChatBox />,
      },
    ],
  },
]);
