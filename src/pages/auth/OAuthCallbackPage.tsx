import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Spinner } from '@/components/ui/Spinner';

/**
 * Landing page after Cognito Hosted UI redirects back with the auth code.
 * Amplify handles the token exchange automatically on page load.
 * We just wait until the auth state is resolved, then redirect home.
 */
export function OAuthCallbackPage() {
  const { isAuthenticated, isLoading, initializeAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50">
      <Spinner size="lg" className="text-brand-600" />
      <p className="text-sm text-gray-500">Signing you in…</p>
    </div>
  );
}
