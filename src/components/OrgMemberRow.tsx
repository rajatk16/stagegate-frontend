import { OrganizationMemberRole, type OrgMembersQuery } from '@/graphql';
import { MemberActionsCell } from './MemberActionsCell';
import { MemberInfoCell } from './MemberInfoCell';
import { OrgMemberRoleCell } from './OrgMemberRoleCell';

interface OrgMemberRowProps {
  uid: string | null;
  activeUserId: string | null;
  onLeaveOrganization: () => void;
  onRemoveMember: (userId: string) => void;
  viewerRole: OrganizationMemberRole | null | undefined;
  onRoleChange: (userId: string, role: OrganizationMemberRole) => void;
  member: OrgMembersQuery['organizationBySlug']['members']['results'][number];
}

export const OrgMemberRow = (props: OrgMemberRowProps) => {
  const isSelf = props.member.user.id === props.uid;
  const isOwner = props.member.role === OrganizationMemberRole.Owner;

  const canManageRoles =
    props.viewerRole === OrganizationMemberRole.Owner ||
    props.viewerRole === OrganizationMemberRole.Admin;
  const canChangeRole = canManageRoles && !isSelf && !isOwner;
  const canRemoveMember = canManageRoles && !isSelf && !isOwner;
  const canLeaveOrganization = isSelf && props.member.role !== OrganizationMemberRole.Owner;

  const isRowDisabled = props.activeUserId === props.member.user.id;

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
      <MemberInfoCell user={props.member.user} />
      <OrgMemberRoleCell
        disabled={isRowDisabled}
        role={props.member.role}
        canChangeRole={canChangeRole}
        onRoleChange={(r) => props.onRoleChange(props.member.user.id, r)}
      />
      <MemberActionsCell
        disabled={isRowDisabled}
        canRemoveMember={canRemoveMember}
        canLeaveOrganization={canLeaveOrganization}
        onLeaveOrganization={props.onLeaveOrganization}
        onRemoveMember={() => props.onRemoveMember(props.member.user.id)}
      />
    </tr>
  );
};
