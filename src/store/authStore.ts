import { create } from 'zustand';
import {
  signOut,
  fetchAuthSession,
  signInWithRedirect,
} from 'aws-amplify/auth';
import type { AuthState, AuthUser } from '@/types/auth';

interface AuthStore extends AuthState {
  initializeAuth: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

async function buildUser(): Promise<AuthUser> {
  const session = await fetchAuthSession();
  const idToken = session.tokens?.idToken;
  if (!idToken) throw new Error('No session');

  const payload = idToken.payload;
  return {
    sub: payload.sub as string,
    email: (payload.email as string) ?? '',
    name: (payload.name as string) ?? (payload.email as string) ?? '',
    role: (payload['custom:role'] as AuthUser['role']) ?? null,
  };
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  initializeAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await buildUser();
      set({ user, isAuthenticated: true });
    } catch {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  signInWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      await signInWithRedirect({ provider: 'Google' });
      // Page will redirect — no further state update needed here
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Google sign in failed';
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      await signOut();
      set({ user: null, isAuthenticated: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign out failed';
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
