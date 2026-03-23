import { create } from 'zustand';

interface AuthState {
  isLoggedOut: boolean;
  setLoggedOut: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedOut: false, // Если true — даже не пытаемся вызвать useMe
  setLoggedOut: (val) => set({ isLoggedOut: val }),
}));