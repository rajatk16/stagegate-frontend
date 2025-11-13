import { useState } from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';

import { LoginForm, RegisterForm } from '@/components';

export const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <>
      <Helmet>
        <title>StageGate - Login or Register</title>
        <meta
          name="description"
          content="Login or register to your StageGate account to manage events, proposals, and reviews efficiently."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col justify-center bg-linear-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Subtle animated glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-500/10 dark:bg-brand-400/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />

        <div className="max-w-6xl mx-auto w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* ✅ Desktop View */}
          <div className="hidden md:grid md:grid-cols-2">
            {/* Login Section */}
            <div className="p-10 md:p-12 flex flex-col justify-center border-r border-gray-200 dark:border-gray-700">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                  Welcome Back 👋
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Log in to your StageGate account and continue managing proposals.
                </p>
                <LoginForm />
                <p className="text-sm text-gray-500 mt-8 text-center">
                  Forgot your password?{' '}
                  <Link
                    to="/forgot-password"
                    className="text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 hover:underline transition"
                  >
                    Reset it
                  </Link>
                </p>
              </motion.div>
            </div>

            {/* Register Section */}
            <div className="p-10 md:p-12 flex flex-col justify-center bg-gray-50/70 dark:bg-gray-900/30">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                  Create Your Account 🚀
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Join StageGate and streamline your proposal review process today.
                </p>
                <RegisterForm />
              </motion.div>
            </div>
          </div>

          {/* ✅ Mobile View with Tabs */}
          <div className="md:hidden p-6">
            <div className="flex justify-center mb-6 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('login')}
                className={`px-4 py-2 text-sm font-medium transition-all border-b-2 ${
                  activeTab === 'login'
                    ? 'text-brand-600 border-brand-600 dark:text-brand-400'
                    : 'text-gray-500 border-transparent hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`px-4 py-2 text-sm font-medium transition-all border-b-2 ${
                  activeTab === 'register'
                    ? 'text-brand-600 border-brand-600 dark:text-brand-400'
                    : 'text-gray-500 border-transparent hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                Register
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'login' ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    Welcome Back 👋
                  </h2>
                  <LoginForm />
                  <p className="text-sm text-gray-500 mt-6 text-center">
                    Forgot your password?{' '}
                    <Link
                      to="/forgot-password"
                      className="text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 hover:underline transition"
                    >
                      Reset it
                    </Link>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    Create Your Account 🚀
                  </h2>
                  <RegisterForm />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};
