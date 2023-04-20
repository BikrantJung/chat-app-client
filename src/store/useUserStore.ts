import { IUserInfo } from "@/types/user.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
// import { type User } from "../types/user.types";
interface IUserStore {
  userInfo: IUserInfo | null;
  setUser: (userData: IUserInfo | null) => void;
  resetUser: () => void;
}
const initialUserData = null;

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      userInfo: initialUserData,
      setUser(userData) {
        set({ userInfo: userData });
      },
      resetUser() {
        set(() => ({
          userInfo: initialUserData,
        }));
      },
    }),
    {
      name: "userInfo",
    }
  )
);
