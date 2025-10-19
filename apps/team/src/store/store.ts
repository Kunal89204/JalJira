import { create } from "zustand";
import { AuthState, createAuthSlice } from "./slice/authSlice";

type StoreState = AuthState;

export const useStore = create<StoreState>()((...a) => ({
  ...createAuthSlice(...a),
}));
