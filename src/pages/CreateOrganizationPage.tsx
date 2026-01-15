import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import { useQuery } from '@apollo/client/react';

import { useAppSelector } from '@/hooks';
import { CreateOrgForm } from '@/components';
import { MY_ORGANIZATIONS, OrganizationMemberRole } from '@/graphql';

export const CreateOrganizationPage = () => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);

  const { data, loading, error } = useQuery(MY_ORGANIZATIONS, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const myOrganizations = data?.myOrganizations ?? [];
  const isOwnerOfAny = myOrganizations.some(
    (org) => org.viewerRole === OrganizationMemberRole.Owner,
  );

  useEffect(() => {
    if (isOwnerOfAny) {
      navigate('/dashboard');
    }
  }, [isOwnerOfAny, navigate]);

  return (
    <>
      <Helmet>
        <title>StageGate - Create Organization</title>
        <meta name="description" content="Create a new organization on StageGate" />
      </Helmet>

      <main className="relative min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-300/20 dark:bg-brand-400/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />

        {loading && (
          <div className="relative w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 md:p-10 animate-pulse">
            <div className="h-8 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-6 mx-auto" />
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-8 mx-auto" />

            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
                </div>
              ))}

              <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-full mt-6" />
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="relative w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 md:p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We couldn't fetch your existing organizations. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-md bg-brand-500 hover:bg-brand-600 text-white font-semibold transition cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && <CreateOrgForm />}
      </main>
    </>
  );
};
