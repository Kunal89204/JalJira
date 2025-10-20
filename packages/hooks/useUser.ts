"use client"
import { useStore } from "../store/store";

export const useUser = () => {
  const { isAuthenticated, logout, setUser, token, user } = useStore();
  return { isAuthenticated, logout, setUser, token, user };
};


