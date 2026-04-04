import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const { user, signOut, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg
            className="h-7 w-7 text-brand-600"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="8" fill="currentColor" />
            <path
              d="M8 22V10l8 6 8-6v12"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-lg font-semibold text-gray-900">LMS Platform</span>
        </div>

        {/* User info + sign out */}
        {user && (
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-gray-600 sm:block">
              {user.name || user.email}
            </span>
            <Button variant="secondary" size="sm" isLoading={isLoading} onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
