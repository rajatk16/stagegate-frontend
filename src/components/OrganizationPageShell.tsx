import type { OrganizationBySlugQuery } from '@/graphql';
import type { ErrorLike } from '@apollo/client';
import { OrganizationNotFound } from './OrganizationNotFound';
import { OrganizationOverviewSkeleton } from './OrganizationOverviewSkeleton';

interface OrganizationPageShellProps {
  loading: boolean;
  error: ErrorLike | undefined;
  organization?: OrganizationBySlugQuery['organizationBySlug'];
  children: (organization: OrganizationBySlugQuery['organizationBySlug']) => React.ReactNode;
}

export const OrganizationPageShell = (props: OrganizationPageShellProps) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      {props.loading && <OrganizationOverviewSkeleton />}
      {!props.loading && props.error && <OrganizationNotFound />}
      {!props.loading && !props.error && props.organization && (
        <>{props.children(props.organization)}</>
      )}
    </div>
  );
};
