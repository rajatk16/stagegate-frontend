import { Avatar } from '@/ui';
import type { OrgMembersQuery } from '@/graphql';

interface MemberInfoCellProps {
  user: OrgMembersQuery['organizationBySlug']['members']['results'][number]['user'];
}

export const MemberInfoCell = (props: MemberInfoCellProps) => (
  <td className="px-5 py-4">
    <div className="flex items-center gap-3">
      <Avatar profilePicture={props.user.profilePicture} name={props.user.name} />
      <div className="min-w-0">
        <p className="font-medium text-gray-900 dark:text-gray-200 truncate">
          {props.user.name}
        </p>
        <p className="text-sm text-gray-500 truncate">{props.user.email}</p>
      </div>
    </div>
  </td>
);
