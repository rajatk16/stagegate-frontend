import { useState } from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client/react';
import { sendEmailVerification } from 'firebase/auth';
import {
  Building2,
  LogIn,
  FolderKanban,
  AlertCircle,
  Loader2,
  MailCheck,
  ArrowRight,
  Globe,
} from 'lucide-react';

import { auth } from '@/libs';
import { useAppSelector } from '@/hooks';
import { AUTH_STATUS, MY_ORGANIZATIONS } from '@/graphql';

export const DashboardPage = () => {
  const { token, email, uid } = useAppSelector((state) => state.auth);
  const {
    data: authStatusData,
    loading: authStatusLoading,
    error: authStatusError,
  } = useQuery(AUTH_STATUS, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const { data: myOrgsData, loading: myOrgsLoading } = useQuery(MY_ORGANIZATIONS, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const emailVerified = authStatusData?.authStatus?.emailVerified;

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

  const organizations = myOrgsData?.myOrganizations ?? [];
  const hasOrganizations = organizations.length > 0;
  const isOwnerOfAny = organizations.some((org) => org.owner.id === uid);

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
          {!authStatusLoading && !authStatusError && emailVerified === false && (
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
          {myOrgsLoading && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700 shadow-sm">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-6 p-5 animate-pulse"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700" />
                    <div className="space-y-2 min-w-0">
                      <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
                      <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!myOrgsLoading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
            >
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Organizations
              </h1>
              <div className="flex gap-3">
                {hasOrganizations && (
                  <Link
                    to="/join-organization"
                    className="px-4 py-2 rounded-md text-sm font-medium border border-brand-500 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Join Organization
                  </Link>
                )}
                {isOwnerOfAny && (
                  <Link
                    to="/create-organization"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-brand-500 hover:bg-brand-600 text-white font-medium shadow transition-all hover:shadow-md"
                  >
                    <Building2 className="w-4 h-4" />
                    Create Organization
                  </Link>
                )}
              </div>
            </motion.div>
          )}

          {!myOrgsLoading && hasOrganizations && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700 shadow-sm overflow-hidden"
            >
              {organizations.map((org, idx) => (
                <motion.div
                  key={org.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between gap-6 p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                      {org.logo ? (
                        <img
                          src={org.logo}
                          alt={org.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Building2 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-semibold text-gray-800 dark:text-gray-200 truncate">
                          {org.name}
                        </p>
                        {org.owner.id === uid && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-brand-100 text-brand-700 dark:bg-brand-800 dark:text-brand-200 border border-brand-200 dark:border-brand-700">
                            Owner
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {org.website && (
                      <a
                        href={
                          org.website.startsWith('http')
                            ? org.website
                            : `https://${org.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:underline"
                      >
                        <Globe className="w-4 h-4" />
                        <span className="sr-only">Visit {org.name} website</span>
                      </a>
                    )}

                    <Link
                      to={`/organizations/${org.slug}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-md bg-brand-500 hover:bg-brand-600 text-white font-medium transition-all shadow-sm hover:shadow"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span className="sr-only">Open {org.name} organization</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!myOrgsLoading && !hasOrganizations && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center text-center py-24 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-sm shadow-sm"
            >
              <FolderKanban className="w-14 h-14 text-gray-400 dark:text-gray-500 mb-5" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                You haven’t joined or created any organizations yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                Organizations help you collaborate with your team to review and approve
                proposals. Get started by creating or joining one below.
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
          )}
        </div>
      </div>
    </>
  );
};
