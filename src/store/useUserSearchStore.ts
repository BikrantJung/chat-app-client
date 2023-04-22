import { create } from "zustand";
import { persist } from "zustand/middleware";
interface IUserSearchStore {
  query: string;
  setQuery: (query: IUserSearchStore["query"]) => void;
}

export const useUserSearchStore = create<IUserSearchStore>()(
  persist(
    (set) => ({
      query: "",
      setQuery(query) {
        set({ query });
      },
    }),
    {
      name: "theme",
    }
  )
);
