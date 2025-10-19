import { StateCreator } from 'zustand';

export interface AuthState {
  user: { id: string; name: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: { id: string; name: string }, token: string) => void;
  logout: () => void;
}

export const createAuthSlice: StateCreator<AuthState, [], [], AuthState> = (set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setUser: (user, token) => set({ 
    user, 
    token, 
    isAuthenticated: !!token 
  }),

  logout: () => set({ 
    user: null, 
    token: null, 
    isAuthenticated: false 
  }),
});
