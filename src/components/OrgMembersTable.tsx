import type { ErrorLike } from '@apollo/client';

import type { OrganizationMemberRole, OrgMembersQuery } from '@/graphql';
import { TableHeader } from '@/ui';
import { OrgMemberRow } from './OrgMemberRow';
import { OrgMembersSkeleton } from './OrgMembersSkeleton';

interface OrgMembersTableProps {
  loading: boolean;
  uid: string | null;
  activeUserId: string | null;
  error: ErrorLike | undefined;
  onLeaveOrganization: () => void;
  data: OrgMembersQuery | undefined;
  onRemoveMember: (userId: string) => void;
  onRoleChange: (userId: string, role: OrganizationMemberRole) => void;
  setActiveUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const OrgMembersTable = (props: OrgMembersTableProps) => {
  if (props.error) {
    return (
      <div className="mt-6 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6 text-center">
        <p className="font-medium text-red-700 dark:text-red-400">
          Failed to load organization members
        </p>
        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
          Please refresh the page and try again.
        </p>
      </div>
    );
  } else {
    return (
      <div className="mt-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-x-auto">
        <table className="w-full border-collapse min-w-[640px] sm:min-w-0">
          <TableHeader labels={['Member', 'Role', 'Actions']} />

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {props.loading ? (
              <OrgMembersSkeleton />
            ) : (
              props.data?.organizationBySlug.members.results.map((m) => (
                <OrgMemberRow
                  member={m}
                  key={m.user.id}
                  viewerRole={props.data?.organizationBySlug.viewerRole}
                  {...props}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
};
