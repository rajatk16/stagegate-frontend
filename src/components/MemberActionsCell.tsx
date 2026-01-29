import { ActionMenu } from '@/ui';

interface MemberActionsCellProps {
  disabled: boolean;
  canLeaveOrganization: boolean;
  onLeaveOrganization: () => void;
  onRemoveMember: () => void;
  canRemoveMember: boolean;
}

export const MemberActionsCell = (props: MemberActionsCellProps) => (
  <td className="px-5 py-4 text-center">
    <ActionMenu
      disabled={props.disabled}
      options={[
        ...(props.canRemoveMember
          ? [{ label: 'Remove member', danger: true, onClick: props.onRemoveMember }]
          : []),
        ...(props.canLeaveOrganization
          ? [{ label: 'Leave organization', danger: true, onClick: props.onLeaveOrganization }]
          : []),
      ]}
    />
  </td>
);
