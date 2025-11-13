import { Link } from 'react-router';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Building2, LogIn, FolderKanban } from 'lucide-react';

export const DashboardPage = () => {
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
        <div className="max-w-6xl mx-auto px-6 py-10">
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
