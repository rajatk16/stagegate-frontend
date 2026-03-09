import { auth } from '@/libs';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router';

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'verifying' | 'ready' | 'success' | 'error'>(
    'verifying',
  );
  const [error, setError] = useState<string | null>(null);

  const passwordChecks = {
    length: (v: string) => v.length >= 8,
    upper: (v: string) => /[A-Z]/.test(v),
    lower: (v: string) => /[a-z]/.test(v),
    number: (v: string) => /\d/.test(v),
    special: (v: string) => /[^A-Za-z0-9]/.test(v),
  };

  const isPasswordStrong = Object.values(passwordChecks).every((check) => check(newPassword));

  useEffect(() => {
    const verifyCode = async () => {
      if (!oobCode) {
        setError('Invalid password reset link.');
        setStatus('error');
        setLoading(false);
        return;
      }

      try {
        const email = await verifyPasswordResetCode(auth, oobCode);
        setEmail(email);
        setStatus('ready');
      } catch (error) {
        console.error(error);
        setError('Invalid or expiredpassword reset link.');
        setStatus('error');
      } finally {
        setLoading(false);
      }
    };

    verifyCode();
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isPasswordStrong) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      await confirmPasswordReset(auth, oobCode!, newPassword);
      setStatus('success');
    } catch (error) {
      console.error(error);
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>StageGate - Reset Password</title>
        <meta name="description" content="Reset your password here." />
      </Helmet>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
          Verifying link...
        </div>
      ) : (
        <>
          <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
              {status === 'error' && (
                <div className="text-center text-red-600 dark:text-red-400">
                  <h1 className="text-xl font-semibold mb-2">Link Invalid</h1>
                  <p className="text-sm mb-4">{error}</p>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    Request a new link →
                  </Link>
                </div>
              )}

              {status === 'ready' && (
                <>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                    Set a New Password
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-white mb-6 text-center">
                    Resetting password for <span className="font-semibold">{email}</span>
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-2 rounded-md">
                        {error}
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        autoComplete="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700 dark:text-white"
                      />

                      <ul className="mt-2 space-y-1 text-sm">
                        <li
                          className={
                            passwordChecks.length(newPassword)
                              ? 'text-green-600'
                              : 'text-gray-500'
                          }
                        >
                          {passwordChecks.length(newPassword) ? '✓' : '•'} At least 8 characters
                        </li>
                        <li
                          className={
                            passwordChecks.upper(newPassword)
                              ? 'text-green-600'
                              : 'text-gray-500'
                          }
                        >
                          {passwordChecks.upper(newPassword) ? '✓' : '•'} One uppercase letter
                        </li>
                        <li
                          className={
                            passwordChecks.lower(newPassword)
                              ? 'text-green-600'
                              : 'text-gray-500'
                          }
                        >
                          {passwordChecks.lower(newPassword) ? '✓' : '•'} One lowercase letter
                        </li>
                        <li
                          className={
                            passwordChecks.number(newPassword)
                              ? 'text-green-600'
                              : 'text-gray-500'
                          }
                        >
                          {passwordChecks.number(newPassword) ? '✓' : '•'} One number
                        </li>
                        <li
                          className={
                            passwordChecks.special(newPassword)
                              ? 'text-green-600'
                              : 'text-gray-500'
                          }
                        >
                          {passwordChecks.special(newPassword) ? '✓' : '•'} One special
                          character
                        </li>
                      </ul>
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700 dark:text-white"
                      />
                      {confirmPassword.length > 0 && confirmPassword === newPassword ? (
                        <p className="mt-1 text-sm text-green-600">✓ Passwords match!</p>
                      ) : (
                        <p className="mt-1 text-sm text-red-500">Passwords do not match.</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-3 rounded-lg text-white font-semibold transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-500 hover:bg-brand-600 cursor-pointer'}`}
                    >
                      {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                  </form>
                </>
              )}

              {status === 'success' && (
                <div className="text-center">
                  <h1 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">
                    🎉 Password Updated Successfully
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    You can now login with your new password.
                  </p>
                  <Link
                    to="/auth"
                    className="text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    Go to Login →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
