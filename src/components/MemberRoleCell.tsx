import { DropDown } from '@/ui';
import { OrganizationMemberRole } from '@/graphql';

interface MemberRoleCellProps {
  loading: boolean;
  canChangeRole: boolean;
  role: OrganizationMemberRole;
  onRoleChange: (role: OrganizationMemberRole) => void;
}

const ROLE_OPTIONS = [
  {
    value: OrganizationMemberRole.Owner,
    label: 'Owner',
    disabled: true,
  },
  {
    value: OrganizationMemberRole.Admin,
    label: 'Admin',
  },
  {
    value: OrganizationMemberRole.Member,
    label: 'Member',
  },
];

export const MemberRoleCell = (props: MemberRoleCellProps) => (
  <td className="px-5 py-4 text-center">
    {props.canChangeRole ? (
      <DropDown
        value={props.role}
        disabled={props.loading}
        onChange={props.onRoleChange}
        options={ROLE_OPTIONS.filter((o) => o.value !== OrganizationMemberRole.Owner)}
      />
    ) : (
      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
        {props.role}
      </span>
    )}
  </td>
);
