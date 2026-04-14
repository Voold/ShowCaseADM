import { create } from 'zustand';

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

interface AuthState {
  status: AuthStatus;
  setStatus: (status: AuthStatus) => void;
  isLoggedOut: boolean;
  setLoggedOut: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  status: 'idle',
  setStatus: (status) => set({ status }),
  isLoggedOut: false, // Если true — даже не пытаемся вызвать useMe
  setLoggedOut: (val) => set({ isLoggedOut: val }),
}));