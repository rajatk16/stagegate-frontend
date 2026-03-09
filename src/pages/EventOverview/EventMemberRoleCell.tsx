import { EventMemberRole } from '@/graphql';
import { Badge } from '@/ui';
import { EVENT_ROLE_STYLES, labelize } from '@/utils';

interface EventMemberRoleCellProps {
  role: EventMemberRole;
}

export const EventMemberRoleCell = (props: EventMemberRoleCellProps) => (
  <td className="px-5 py-4 text-center">
    <Badge label={labelize(props.role)} className={EVENT_ROLE_STYLES[props.role]} />
  </td>
);
