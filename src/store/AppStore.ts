import type { AltVServer } from "@/lib/altv/types";
import type { Server } from "@prisma/client";
import { create } from "zustand";

export interface AppStore {
  isNavOpen: boolean;
  toggleNav: () => void;
  setNavOpen: (isOpen: boolean) => void;

  servers: Server[];
  setServers: (servers: Server[]) => void;

  serverInfos: Record<string, AltVServer>;
  setServerInfos: (serverInfos: Record<string, AltVServer>) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isNavOpen: false,
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
  setNavOpen: (isOpen) => set(() => ({ isNavOpen: isOpen })),

  servers: [],
  setServers: (servers) => set(() => ({ servers })),

  serverInfos: {},
  setServerInfos: (serverInfos) => set(() => ({ serverInfos })),
}));
