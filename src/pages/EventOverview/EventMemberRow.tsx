import type { EventMembersQuery } from '@/graphql';
import { MemberInfoCell } from '../../components/MemberInfoCell';
import { EventMemberRoleCell } from './EventMemberRoleCell';

interface EventMemberRowProps {
  member: EventMembersQuery['eventBySlug']['members']['results'][number];
}

export const EventMemberRow = (props: EventMemberRowProps) => {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
      <MemberInfoCell user={props.member.user} />
      <EventMemberRoleCell role={props.member.role} />
    </tr>
  );
};
