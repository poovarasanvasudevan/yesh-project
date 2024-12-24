import { create } from "zustand";

export const useLoginStore = create((set) => ({
  isLoggedIn: false,
  openLoginDialog: false,
  loggedInAttributes: undefined,
  setIsLoggedIn: (isLoggedIn, loggedInAttributes) =>
    set({ isLoggedIn, loggedInAttributes }),
  setLogout: () => set({ isLoggedIn: false, loggedInAttributes: undefined }),
  setOpenLoginDialog: (openLoginDialog) => set({ openLoginDialog }),
}));
