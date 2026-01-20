import { useQuery } from '@apollo/client/react';

import { useAppSelector } from '@/hooks';
import { ORGANIZATION_BY_SLUG } from '@/graphql';
import { OrgSettingsError } from './OrgSettingsError';
import { GeneralOrgSettings } from './GeneralOrgSettings';
import { OrgSettingsSkeleton } from './OrgSettingsSkeleton';

interface OrgSettingsTabProps {
  slug: string;
}

export const OrgSettingsTab = (props: OrgSettingsTabProps) => {
  const { token } = useAppSelector((state) => state.auth);

  const { data, loading, error } = useQuery(ORGANIZATION_BY_SLUG, {
    variables: { slug: props.slug },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  if (loading) return <OrgSettingsSkeleton />;

  if ((!loading && error) || !data || !data.organizationBySlug) {
    return <OrgSettingsError />;
  } else {
    return (
      <div className="mt-6 space-y-6">
        <GeneralOrgSettings org={data.organizationBySlug} />
      </div>
    );
  }
};
