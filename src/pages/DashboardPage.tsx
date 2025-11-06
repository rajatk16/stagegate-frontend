import { Building2, LogIn } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router';

export const DashboardPage = () => {
  return (
    <>
      <Helmet>
        <title>StageGate - Dashboard</title>
        <meta name="description" content="Dashboard for StageGate" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your organizations, events, and reviews.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-sm transition-all hover:border-gray-400 dark:hover:border-gray-600">
            <Building2 className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              You haven't joined or created any organizations yet.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/create-organization"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-brand-500 hover:bg-brand-600 text-white font-medium transition"
              >
                <Building2 className="w-4 h-4" />
                Create Organization
              </Link>

              <Link
                to="/join-organization"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-brand-500 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-gray-800 font-medium transition"
              >
                <LogIn className="w-4 h-4" />
                Join Organization
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
