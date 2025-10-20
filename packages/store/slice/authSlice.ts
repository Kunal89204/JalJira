import { StateCreator } from "zustand";
import {SupabaseUser} from "../../../packages/types/SupabaseUser"
export interface AuthState {
  user: SupabaseUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: SupabaseUser, token: string) => void;
  logout: () => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setUser: (user, token) =>
    set({
      user,
      token,
      isAuthenticated: !!token,
    }),

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });

    // Redirect to login
    if (typeof window !== "undefined") {
      window.location.href = "/auth/sign-in";
    }
  },
});
