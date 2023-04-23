import { create } from "zustand";
import { persist } from "zustand/middleware";
// import { type User } from "../types/user.types";
interface IChatIdStore {
  chatId: string;
  setChatId: (chatId: IChatIdStore["chatId"]) => void;
}

export const useChatIdStore = create<IChatIdStore>()(
  persist(
    (set) => ({
      chatId: "",
      setChatId(chatId) {
        set({ chatId });
      },
    }),
    {
      name: "theme",
    }
  )
);
