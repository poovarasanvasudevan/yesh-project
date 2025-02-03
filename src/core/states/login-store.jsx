import { create } from "zustand";

export const useLoginStore = create((set) => ({
  isLoggedIn: false,
  openLoginDialog: false,
  loggedInAttributes: undefined,
  userRoles: [],
  loSupportedApps: [],
  accessibleEnv: [],
  appCodes: [],
  setIsLoggedIn: (isLoggedIn, loggedInAttributes) =>
    set({ isLoggedIn, loggedInAttributes }),
  setLogout: () => set({ isLoggedIn: false, loggedInAttributes: undefined }),
  setOpenLoginDialog: (openLoginDialog) => set({ openLoginDialog }),
  setUserRoles: (userRoles) => set({ userRoles }),
  setLoSupportedApps: (loSupportedApps) => set({ loSupportedApps }),
  setAccessibleEnv: (accessibleEnv) => set({ accessibleEnv }),
  setAppCodes: (appCodes) => set({ appCodes }),
}));
