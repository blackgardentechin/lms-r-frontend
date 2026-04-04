import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Navbar } from '@/components/layout/Navbar';
import { LoginPage } from '@/pages/auth/LoginPage';
import { OAuthCallbackPage } from '@/pages/auth/OAuthCallbackPage';
import { HomePage } from '@/pages/home/HomePage';

function AuthInitializer() {
  const { initializeAuth } = useAuth();
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  return null;
}

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: (
      <>
        <AuthInitializer />
        <Outlet />
      </>
    ),
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/auth/callback', element: <OAuthCallbackPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [{ path: '/', element: <HomePage /> }],
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
