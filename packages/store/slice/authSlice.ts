import { StateCreator } from "zustand";
import { SupabaseUser } from "../../../packages/types/SupabaseUser";

export interface AuthState {
  user: SupabaseUser | null;
  token: string | null;
  isAuthenticated: boolean;
  hasWorkspace: boolean;

  setUser: (
    user: SupabaseUser | null, 
    token: string | null, 
    hasWorkspace: boolean
  ) => void;

  logout: () => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  hasWorkspace: false,

  setUser: (user, token, hasWorkspace) =>
    set({
      user,
      token,
      isAuthenticated: Boolean(token),
      hasWorkspace,
    }),

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      hasWorkspace: false,
    });

    if (typeof window !== "undefined") {
      window.location.href = "/auth/sign-in";
    }
  },
});
