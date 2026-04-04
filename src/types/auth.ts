export type UserRole = 'student' | 'trainer' | null;

export interface AuthUser {
  sub: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
