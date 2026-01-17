import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Building2, ExternalLink, Search } from 'lucide-react';
import { useLazyQuery, useMutation } from '@apollo/client/react';

import { useAppSelector } from '@/hooks';
import { OrganizationsSkeleton } from '@/components';
import { SEARCH_ORGANIZATIONS, JOIN_ORGANIZATION } from '@/graphql';

export const JoinOrganizationPage = () => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);

  const [query, setQuery] = useState('');
  const [searchOrgs, { data, loading, error }] = useLazyQuery(SEARCH_ORGANIZATIONS, {
    fetchPolicy: 'cache-and-network',
  });

  const [joinOrganization, { loading: joining }] = useMutation(JOIN_ORGANIZATION, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  useEffect(() => {
    if (!query.trim()) return;

    const id = setTimeout(() => {
      searchOrgs({
        variables: { query, excludeMyOrganizations: true, limit: 10 },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    }, 300);

    return () => clearTimeout(id);
  }, [query, searchOrgs, token]);

  const organizations = data?.searchOrganizations ?? [];

  const handleJoinOrganization = async (organizationId: string) => {
    try {
      const { data } = await joinOrganization({
        variables: {
          input: {
            organizationId,
          },
        },
      });

      const slug = data?.joinOrganization?.organization?.slug;

      if (slug) {
        navigate(`/organizations/${slug}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>StageGate - Join Organization</title>
        <meta name="description" content="Search and join public organizations on StageGate" />
      </Helmet>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Join an Organization
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Search for a public organization to join.
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search organizations by name"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700 shadow-sm">
            {loading && <OrganizationsSkeleton />}

            {!loading && error && (
              <div className="p-6 text-center text-red-600 dark:text-red-400">
                Failed to load organizations. Please try again.
              </div>
            )}

            {!loading && !error && query && organizations.length === 0 && (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No organizations found.
              </div>
            )}

            {!loading && !error && query && organizations.length !== 0 && (
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
                          rel="noopener norefferer"
                          className="text-brand-600 hover:underline"
                        >
                          <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          <span className="sr-only">Visit {org.name} website</span>
                        </a>
                      )}

                      <button
                        type="button"
                        disabled={joining}
                        onClick={() => handleJoinOrganization(org.id)}
                        className={`
                          px-4 py-2 rounded-md text-sm font-semibold transition
                          ${
                            joining
                              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                              : 'bg-brand-500 hover:bg-brand-600 text-white cursor-pointer'
                          }
                        `}
                      >
                        {joining ? 'Joining...' : 'Join'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
