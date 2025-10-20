"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthState, createAuthSlice } from "./slice/authSlice";

type StoreState = AuthState;

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
