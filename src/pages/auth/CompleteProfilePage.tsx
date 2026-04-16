import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function CompleteProfilePage() {
  const { completeProfile, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNameError('');
    if (!name.trim()) {
      setNameError('Full name is required');
      return;
    }
    try {
      await completeProfile(name.trim());
      navigate('/', { replace: true });
    } catch {
      // error shown from store
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-100">
            <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Complete your profile</h1>
          <p className="mt-1 text-sm text-gray-500">Tell us your name to get started.</p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
              disabled={isLoading}
            />
            <Button type="submit" fullWidth isLoading={isLoading}>
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
