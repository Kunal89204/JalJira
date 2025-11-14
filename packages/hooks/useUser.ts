"use client"
import { useStore } from "../store/store";

export const useUser = () => {
  const { isAuthenticated, logout, setUser, token, user , hasWorkspace} = useStore();
  return { isAuthenticated, logout, setUser, token, user, hasWorkspace };
};


