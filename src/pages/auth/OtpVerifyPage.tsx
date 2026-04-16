import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function OtpVerifyPage() {
  const { verifyOtp, pendingEmail, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOtpError('');
    if (otp.trim().length !== 6) {
      setOtpError('Enter the 6-digit code');
      return;
    }
    try {
      const { needsProfile } = await verifyOtp(otp.trim());
      navigate(needsProfile ? '/login/complete-profile' : '/', { replace: true });
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Check your email</h1>
          <p className="mt-1 text-sm text-gray-500">
            We sent a 6-digit code to{' '}
            <span className="font-medium text-gray-700">{pendingEmail ?? 'your email'}</span>
          </p>
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
              inputMode="numeric"
              placeholder="000000"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              error={otpError}
              disabled={isLoading}
              className="text-center text-2xl tracking-widest"
            />
            <Button type="submit" fullWidth isLoading={isLoading}>
              Verify
            </Button>
          </form>

          <button
            className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700"
            onClick={() => navigate('/login')}
          >
            Use a different email
          </button>
        </div>
      </div>
    </div>
  );
}
