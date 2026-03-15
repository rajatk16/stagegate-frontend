import type { ProposalStatus } from '@/graphql';
import { Badge } from '@/ui';
import { labelize, PROPOSAL_STATUS_STYLES } from '@/utils';

interface ProposalStatusBadgeProps {
  status: ProposalStatus;
}

export const ProposalStatusBadge = (props: ProposalStatusBadgeProps) => {
  return (
    <Badge label={labelize(props.status)} className={PROPOSAL_STATUS_STYLES[props.status]} />
  );
};
