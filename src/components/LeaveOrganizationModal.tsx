import { Modal } from '@/ui';

interface LeaveOrganizationModalProps {
  open: boolean;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const LeaveOrganizationModal = (props: LeaveOrganizationModalProps) =>
  props.open ? (
    <Modal
      loading={props.loading}
      onCancel={props.onCancel}
      title="Leave Organization"
      onConfirm={props.onConfirm}
      confirmText="Leave Organization"
      confirmClassName="bg-red-600 text-white"
      description="You will immediately lose access to this organization and its data."
    />
  ) : null;
