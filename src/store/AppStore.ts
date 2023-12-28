import { create } from "zustand";

export interface AppStore {
  isNavOpen: boolean;
  toggleNav: () => void;
  setNavOpen: (isOpen: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isNavOpen: false,
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
  setNavOpen: (isOpen) => set(() => ({ isNavOpen: isOpen })),
}));
