import { useState } from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet';
import { sendPasswordResetEmail } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Loader2, Mail } from 'lucide-react';

import { auth } from '@/libs';
import { InputField } from '@/components';

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

    if (!email.trim()) {
      setError('Please enter your email address.');
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage('Password reset link sent. Please check your inbox and spam folders.');
    } catch (error) {
      console.error(error);
      setError("We couldn't send the reset link. Please check your email and try again.");
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

      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 flex items-center justify-center bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 rounded-full mb-4">
              <Mail className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Reset Your Password
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-xs">
              Enter your registered email address, and we'll send you a link to reset your
              password.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {message && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm p-3 rounded-lg border border-green-200 dark:border-green-800"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{message}</span>
                </motion.div>
              )}

              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg border border-red-200 dark:border-red-800"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <InputField
              required
              id="email"
              type="email"
              value={email}
              label="Email Address"
              autoComplete="new-email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className={`w-full flex items-center justify-center gap-2 py-3 font-semibold rounded-lg text-white transition-all ${loading ? 'bg-brand-400 cursor-not-allowed' : 'bg-brand-500 hover:bg-brand-600 hover:shadow-md cursor-pointer'}`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </motion.button>
          </form>

          <div className="text-center mt-6 text-sm">
            <Link
              to="/auth"
              className="text-brand-600 dark:text-brand-400 font-medium hover:underline"
            >
              ← Back to Login
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};
