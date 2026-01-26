import { useQuery } from '@apollo/client/react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useSearchParams } from 'react-router';

import { CreateEventForm } from '@/components';
import { ORGANIZATION_BY_SLUG } from '@/graphql';

export const CreateEventPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const organizationSlug = params.get('org');

  const { data, loading, error } = useQuery(ORGANIZATION_BY_SLUG, {
    variables: { slug: organizationSlug ?? '' },
    skip: !organizationSlug,
  });

  useEffect(() => {
    if (!organizationSlug) {
      navigate('/dashboard');
    }
  });

  return (
    <>
      <Helmet>
        <title>StageGate - Create Event</title>
        <meta name="description" content="Create a new event on StageGate" />
      </Helmet>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-10">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create Event
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Set up a new event to start accepting proposals.
          </p>

          {loading && (
            <div className="animate-pulse space-y-6">
              <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
              <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-full mt-6" />
            </div>
          )}

          {!loading && error && !data && (
            <motion.div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm text-center">
              <AlertCircle className="w-4 h-4 inline-block mr-2" />
              {error.message}
            </motion.div>
          )}

          {!loading && !error && data && <CreateEventForm data={data} />}
        </div>
      </main>
    </>
  );
};
