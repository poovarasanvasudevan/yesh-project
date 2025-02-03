
import { create } from "zustand";

export const useEnv = create((set) => ({
  appCode: '',
  env: 'dev',
  setEnv: (env) => set({ env }),
  setAppCode: (appCode) => set({ appCode }),
}));
