import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';

import {
  OrganizationContentLayout,
  OrganizationHeader,
  OrganizationPageShell,
  OrganizationTabs,
} from '@/components';
import { ORGANIZATION_BY_SLUG } from '@/graphql';

export const OrganizationPage = () => {
  const [activeTab, setActiveTab] = useState<string>('events');
  const { slug } = useParams<{ slug: string }>();

  const { data, loading, error } = useQuery(ORGANIZATION_BY_SLUG, {
    variables: { slug: slug! },
  });

  const organization = data?.organizationBySlug;

  return (
    <>
      <Helmet>
        <title>
          {organization?.name ? `${organization.name} - StageGate` : 'Organization - StageGate'}
        </title>
      </Helmet>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <OrganizationPageShell loading={loading} error={error} organization={organization}>
          {(organization) => (
            <>
              <OrganizationHeader organization={organization} />

              <OrganizationTabs
                activeTab={activeTab}
                onChange={setActiveTab}
                organization={organization}
              />

              <OrganizationContentLayout activeTab={activeTab} organization={organization} />
            </>
          )}
        </OrganizationPageShell>
      </main>
    </>
  );
};
