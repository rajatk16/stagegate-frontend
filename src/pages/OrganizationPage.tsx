import { useQuery } from '@apollo/client/react';
import { Building2, Calendar, Settings, Users } from 'lucide-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router';

import { OrgEventsTab, OrgMembersTab, OrgSettingsTab } from '@/components';
import { ORGANIZATION_BY_SLUG, OrganizationMemberRole } from '@/graphql';
import { useAppSelector } from '@/hooks';

export type Tab = 'overview' | 'events' | 'members' | 'settings';

export const OrganizationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { token } = useAppSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState<Tab>('events');

  const { data, loading, error } = useQuery(ORGANIZATION_BY_SLUG, {
    variables: { slug: slug ?? '' },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return (
    <>
      <Helmet>
        <title>Organization - StageGate</title>
      </Helmet>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {loading && (
            <div className="animate-pulse space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700" />
                <div className="space-y-2">
                  <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              </div>

              <div className="flex gap-6 border-b border-gray-200 dark:border-gray-700">
                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>

              <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
          )}

          {!loading && error && (
            <div className="p-6 flex-col items-center justify-center py-24 text-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Unable to load organization
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You may not have access to this organization.
              </p>

              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-md bg-brand-500 hover:bg-brand-600 text-white font-semibold"
              >
                Back to Dashboard
              </Link>
            </div>
          )}

          {!loading && !error && data?.organizationBySlug && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
              <section>
                <div className="flex items-center gap-4 mb-6">
                  {data.organizationBySlug?.logo ? (
                    <img
                      src={data.organizationBySlug.logo}
                      alt={data.organizationBySlug.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ) : (
                    <Building2 className="w-16 h-16 text-gray-600 dark:text-gray-400" />
                  )}

                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {data.organizationBySlug.name}
                    </h1>
                  </div>
                </div>

                <div className="flex gap-6 border-b border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    disabled={activeTab === 'events'}
                    onClick={() => setActiveTab('events')}
                    className={`pb-3 font-medium ${
                      activeTab === 'events'
                        ? 'border-b-2 border-brand-500 text-brand-600 cursor-not-allowed'
                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer'
                    }`}
                  >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Events
                  </button>

                  <button
                    type="button"
                    disabled={activeTab === 'members'}
                    onClick={() => setActiveTab('members')}
                    className={`pb-3 font-medium ${
                      activeTab === 'members'
                        ? 'border-b-2 border-brand-500 text-brand-600 cursor-not-allowed'
                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer'
                    }`}
                  >
                    <Users className="w-4 h-4 inline mr-2" />
                    Members
                  </button>

                  {(data.organizationBySlug.viewerRole === OrganizationMemberRole.Admin ||
                    data.organizationBySlug.viewerRole === OrganizationMemberRole.Owner) && (
                    <button
                      type="button"
                      disabled={activeTab === 'settings'}
                      onClick={() => setActiveTab('settings')}
                      className={`pb-3 font-medium ${
                        activeTab === 'settings'
                          ? 'border-b-2 border-brand-500 text-brand-600 cursor-not-allowed'
                          : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer'
                      }`}
                    >
                      <Settings className="w-4 h-4 inline mr-2" />
                      Settings
                    </button>
                  )}
                </div>

                {activeTab === 'events' && (
                  <OrgEventsTab
                    organizationId={data.organizationBySlug.id}
                    viewerOrgRole={data.organizationBySlug.viewerRole}
                  />
                )}

                {activeTab === 'members' && <OrgMembersTab slug={slug ?? ''} />}

                {activeTab === 'settings' && (
                  <OrgSettingsTab organization={data.organizationBySlug} />
                )}
              </section>

              <aside className="space-y-6">
                {data.organizationBySlug.description && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl border p-5">
                    <h3 className="font-semibold mb-2 text-white">About</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {data.organizationBySlug.description}
                    </p>
                  </div>
                )}

                {data.organizationBySlug.website && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl border p-5">
                    <a
                      href={
                        data.organizationBySlug.website.startsWith('http')
                          ? data.organizationBySlug.website
                          : 'https://' + data.organizationBySlug.website
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-600 hover:underline font-medium"
                    >
                      Visit Website →
                    </a>
                  </div>
                )}
              </aside>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
