import { OrganizationMemberRole } from '@/graphql';
import { Badge, DropDown } from '@/ui';
import { labelize, ORG_MEMBER_ROLE_STYLES } from '@/utils';

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
      <Badge label={labelize(props.role)} className={ORG_MEMBER_ROLE_STYLES[props.role]} />
    )}
  </td>
);
