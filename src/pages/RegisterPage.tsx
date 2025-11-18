import { motion } from 'framer-motion';

import { AuthLayout } from '@/layouts';
import { RegisterForm } from '@/components';
import { Link } from 'react-router';

export const RegisterPage = () => (
  <AuthLayout
    title="StageGate - Create Account"
    description="Create your StageGate account to manage your proposals and reviews."
  >
    <div className="w-full p-10 md:p-12 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 text-center">
          Create Your Account 🚀
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
          Join StageGate and streamline your proposal review process today.
        </p>
        <RegisterForm />
        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 hover:underline transition"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  </AuthLayout>
);
