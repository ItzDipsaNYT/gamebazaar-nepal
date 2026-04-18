import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SessionToken, UserInfo } from "../lib/types";
import { UserRole } from "../lib/types";

interface AuthStore {
  token: SessionToken | null;
  user: UserInfo | null;
  isAuthenticated: boolean;
  isStaff: boolean;
  login: (token: SessionToken, user: UserInfo) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isStaff: false,
      login: (token, user) =>
        set({
          token,
          user,
          isAuthenticated: true,
          isStaff: user.role === UserRole.staff,
        }),
      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isStaff: false,
        }),
    }),
    {
      name: "gamebazaar-auth",
    },
  ),
);
