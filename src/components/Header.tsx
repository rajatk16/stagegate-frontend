import { Link, useNavigate } from 'react-router';

import { logout } from '@/utils';
import { useAppSelector } from '@/hooks';

export const Header = () => {
  const { uid } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-brand-600">
          StageGate
        </Link>
        <div className="flex gap-3">
          {uid ? (
            <button
              onClick={() => logout(navigate)}
              className="px-4 py-2 text-sm font-medium rounded-md bg-brand-500 text-white hover:bg-brand-600 transition cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="px-4 py-2 text-sm font-medium rounded-md bg-brand-500 text-white hover:bg-brand-600 transition"
            >
              Login/Register
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
