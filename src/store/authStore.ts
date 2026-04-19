import { create } from 'zustand';
import {
  signOut,
  fetchAuthSession,
  signInWithRedirect,
  signIn,
  confirmSignIn,
  updateUserAttributes,
} from 'aws-amplify/auth';
import type { AuthState, AuthUser } from '@/types/auth';

interface AuthStore extends AuthState {
  pendingEmail: string | null;
  initializeAuth: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<{ needsProfile: boolean }>;
  completeProfile: (name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

async function buildUser(forceRefresh = false): Promise<AuthUser> {
  const session = await fetchAuthSession({ forceRefresh });
  const idToken = session.tokens?.idToken;
  if (!idToken) throw new Error('No session');

  const payload = idToken.payload;
  return {
    sub: payload.sub as string,
    email: (payload.email as string) ?? '',
    name: (payload.name as string) ?? '',
    role: (payload['custom:role'] as AuthUser['role']) ?? null,
  };
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  pendingEmail: null,

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
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Google sign in failed';
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  signInWithEmail: async (email: string) => {
    set({ isLoading: true, error: null, pendingEmail: email });
    try {
      await signIn({
        username: email,
        options: { authFlowType: 'USER_AUTH', preferredChallenge: 'EMAIL_OTP' },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send OTP';
      set({ error: message, pendingEmail: null });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  verifyOtp: async (otp: string) => {
    set({ isLoading: true, error: null });
    try {
      await confirmSignIn({ challengeResponse: otp });
      const user = await buildUser();
      set({ user, isAuthenticated: true });
      return { needsProfile: !user.name };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid OTP';
      set({ error: message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  completeProfile: async (name: string) => {
    set({ isLoading: true, error: null });
    try {
      await updateUserAttributes({ userAttributes: { name } });
      // Token may not reflect name immediately — set it directly
      set((state) => ({
        user: state.user ? { ...state.user, name } : null,
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save profile';
      set({ error: message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      await signOut();
      set({ user: null, isAuthenticated: false, pendingEmail: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign out failed';
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
