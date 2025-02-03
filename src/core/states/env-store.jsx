
import { create } from "zustand";

export const useEnv = create((set) => ({
  appCode: 'ALL',
  env: 'dev',
  setEnv: (env) => set({ env }),
  setAppCode: (appCode) => set({ appCode }),
}));
