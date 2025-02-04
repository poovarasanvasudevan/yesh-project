
import { create } from "zustand";

export const useEnv = create((set) => ({
  appCode: 'ALL',
  env: 'prod',
  setEnv: (env) => set({ env }),
  setAppCode: (appCode) => set({ appCode }),
}));
