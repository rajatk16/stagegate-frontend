import { Link, useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import { LayoutDashboard, LogOut, Menu, User } from 'lucide-react';

import { logout } from '@/utils';
import { useAppSelector } from '@/hooks';

export const Header = () => {
  const navigate = useNavigate();
  const { uid, email } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.user);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDropdownOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleLogout = useCallback(async () => {
    await logout(navigate);
  }, [navigate]);

  const avatarLetter =
    user?.name?.charAt(0).toUpperCase() || email?.charAt(0).toUpperCase() || 'U';

  return (
    <header className="w-full sticky top-0 z-50 bg-white/80 dark:bg-gray-900 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-brand-600 hover:text-brand-700 dark:hover:text-brand-400 transition-colors"
        >
          StageGate
        </Link>

        <div className="flex items-center relative">
          {!uid ? (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-6 py-2 text-sm font-semibold rounded-full bg-brand-600 text-white shadow-sm hover:bg-brand-700 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all duration-200"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-6 py-2 text-sm font-semibold rounded-full border-2 border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all duration-200"
              >
                Register
              </Link>
            </div>
          ) : (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={isDropdownOpen}
                className="flex items-center gap-2 select-none rounded-lg px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center text-white font-semibold">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    avatarLetter
                  )}
                </div>
                <Menu
                  className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
                  >
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      <User className="w-4 h-4" /> Profile
                    </Link>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-1" />

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
