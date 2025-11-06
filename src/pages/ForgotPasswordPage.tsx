import { Header } from '@/components';
import { auth } from '@/libs';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage('Password reset email sent. Check your inbox.');
    } catch (error) {
      console.error(error);
      setError('Failed to send password reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>StageGate - Forgot Password</title>
        <meta name="description" content="Forgot your password? Reset it here." />
      </Helmet>

      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
            Reset Your Password
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {message && (
              <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm p-2 rounded-md">
                {message}
              </div>
            )}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-2 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="new-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700 dark:text-white disabled:opacity-70"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-500 hover:bg-brand-600 cursor-pointer'}`}
            >
              {loading ? 'Sending Reset Link...' : 'Reset password'}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link
              to="/auth"
              className="text-sm text-brand-600 dark:text-brand-400 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
