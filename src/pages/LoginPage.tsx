import { motion } from 'framer-motion';

import { AuthLayout } from '@/layouts';
import { LoginForm } from '@/components';
import { Link } from 'react-router';

export const LoginPage = () => (
  <AuthLayout
    title="StageGate - Login"
    description="Login to your StageGate account to manage your proposals and reviews."
  >
    <div className="w-full p-10 md:p-12 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 text-center">
          Welcome Back 👋
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
          Log in to your StageGate account and continue managing proposals and reviews.
        </p>
        <LoginForm />
        <p className="textsm text-gray-500 mt-8 text-center">
          Forgot your password?{' '}
          <Link
            to="/forgot-password"
            className="text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 hover:underline transition"
          >
            Reset it
          </Link>
        </p>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 hover:underline transition"
          >
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  </AuthLayout>
);
