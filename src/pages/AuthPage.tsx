import { Helmet } from 'react-helmet';
import { Link } from 'react-router';

import { Header, LoginForm, RegisterForm } from '@/components';

export const AuthPage = () => {
  return (
    <>
      <Helmet>
        <title>StageGate - Login/Register</title>
        <meta name="description" content="Login or register to your StageGate account." />
      </Helmet>

      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center px-4">
        <div className="max-w-6xl mx-auto w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg grid md:grid-cols-2 overflow-hidden">
          <div className="p-10 flex flex-col justify-center boder-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome Back!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Log in to your StageGate account.
            </p>
            <LoginForm />

            <p className="text-sm text-gray-500 mt-6 text-center">
              Forgot your password?{' '}
              <Link
                to="/forgot-password"
                className="text-brand-500 hover:text-brand-600 hover:underline transition"
              >
                Reset it
              </Link>
            </p>
          </div>

          <div className="p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Create Your Account
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Join StageGate and streamline your proposal reviews today.
            </p>
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
};
