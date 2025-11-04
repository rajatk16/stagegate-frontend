import { useAppSelector } from '@/hooks';
import type { JSX } from 'react';
import { Navigate } from 'react-router';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { uid, loading } = useAppSelector((state) => state.auth);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!uid) return <Navigate to="/auth" />;

  return children;
};
