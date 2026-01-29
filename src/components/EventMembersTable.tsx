import type { EventMembersQuery } from '@/graphql';
import { TableHeader } from '@/ui';
import type { ErrorLike } from '@apollo/client';
import { EventMemberRow } from './EventMemberRow';
import { MembersSkeleton } from './MembersSkeleton';

interface EventMembersTableProps {
  loading: boolean;
  error: ErrorLike | undefined;
  data: EventMembersQuery | undefined;
}

export const EventMembersTable = (props: EventMembersTableProps) => {
  if (props.error) {
    return (
      <div className="mt-6 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6 text-center">
        <p className="font-medium text-red-700 dark:text-red-400">
          Failed to load event members
        </p>
        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
          Please refresh the page and try again.
        </p>
      </div>
    );
  } else {
    return (
      <div className="mt-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-x-auto">
        <table className="w-full border-collapse min-w-[640px] sm:min-w-0">
          <TableHeader labels={['Member', 'Role']} />

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {props.loading ? (
              <MembersSkeleton />
            ) : (
              props.data?.eventBySlug.members.results.map((m) => (
                <EventMemberRow key={m.user.id} member={m} />
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
};
