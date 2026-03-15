import type { ProposalFormat } from '@/graphql';
import { Badge } from '@/ui';
import { labelize } from '@/utils';

interface ProposalFormatBadgeProps {
  format: ProposalFormat;
}

export const ProposalFormatBadge = (props: ProposalFormatBadgeProps) => (
  <Badge
    label={labelize(props.format)}
    className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-200"
  />
);
