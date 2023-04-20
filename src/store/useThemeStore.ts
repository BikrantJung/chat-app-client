import { IUserInfo } from "@/types/user.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
// import { type User } from "../types/user.types";
interface IThemeStore {
  theme: "light" | "dark";
  setTheme: (theme: IThemeStore["theme"]) => void;
}
const initialTheme = "light";

export const useThemeStore = create<IThemeStore>()(
  persist(
    (set) => ({
      theme: initialTheme,
      setTheme(theme) {
        console.log("Accessing set theme");
        set({ theme });
      },
    }),
    {
      name: "theme",
    }
  )
);
