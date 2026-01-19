import type { ErrorLike } from '@apollo/client';

import { TableHeader } from '@/ui';
import { OrgMemberRow } from './OrgMemberRow';
import { OrgMembersSkeleton } from './OrgMembersSkeleton';
import type { OrganizationMemberRole, OrgMembersQuery } from '@/graphql';

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
  if (props.error)
    return (
      <div className="py-10 text-center text-red-600">Failed to load organization members.</div>
    );

  return (
    <div className="mt-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <table className="w-full border-collapse">
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
};
