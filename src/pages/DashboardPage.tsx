import { Link } from 'react-router';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Building2, LogIn, FolderKanban, AlertCircle, Loader2, MailCheck } from 'lucide-react';
import { useAppSelector } from '@/hooks';
import { AUTH_STATUS } from '@/graphql/queries/authStatus';
import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { auth } from '@/libs';
import { sendEmailVerification } from 'firebase/auth';

export const DashboardPage = () => {
  const { token, email } = useAppSelector((state) => state.auth);
  const { data, loading, error } = useQuery(AUTH_STATUS, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const emailVerified = data?.authStatus?.emailVerified;

  const handleSendVerfication = async () => {
    if (!auth.currentUser) return;
    setSending(true);
    setErrorMsg(null);
    setSent(false);

    try {
      await sendEmailVerification(auth.currentUser);
      setSent(true);
    } catch (error) {
      console.error(error);
      setErrorMsg('Failed to send verification email. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>StageGate - Dashboard</title>
        <meta
          name="description"
          content="View and manage your organizations, events, and proposal reviews on StageGate."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
          {!loading && !error && emailVerified === false && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>
                  Your email <span className="font-medium">{email}</span> is not verified.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSendVerfication}
                  disabled={sending || sent}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    sending || sent
                      ? 'bg-gray-400 dark:bg-gray-700 text-gray-200 cursor-not-allowed'
                      : 'bg-brand-500 hover:bg-brand-600 text-white shadow-sm hover:shadow cursor-pointer'
                  }`}
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 inline animate-spin mr-2" />
                      Sending...
                    </>
                  ) : sent ? (
                    <>
                      <MailCheck className="w-4 h-4 inline mr-2" />
                      Sent!
                    </>
                  ) : (
                    'Send Verification Email'
                  )}
                </button>
              </div>

              {errorMsg && (
                <p className="text-sm text-red-500 mt-2 sm:mt-0 w-full sm:w-auto text-center">
                  {errorMsg}
                </p>
              )}
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center justify-center text-center py-24 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-sm shadow-sm"
          >
            <FolderKanban className="w-14 h-14 text-gray-400 dark:text-gray-500 mb-5" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              You haven’t joined or created any organizations yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
              Organizations help you collaborate with your team to review and approve proposals.
              Get started by creating or joining one below.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/create-organization"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-brand-500 hover:bg-brand-600 text-white font-semibold shadow transition-all hover:shadow-md"
              >
                <Building2 className="w-4 h-4" />
                Create Organization
              </Link>

              <Link
                to="/join-organization"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-brand-500 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-gray-800 font-semibold transition-all hover:shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                Join Organization
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};
