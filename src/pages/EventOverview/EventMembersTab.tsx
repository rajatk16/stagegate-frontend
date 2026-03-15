import { useQuery } from '@apollo/client/react';

import { EVENT_MEMBERS } from '@/graphql';
import { EventMembersTable } from './EventMembersTable';

interface EventMembersTabProps {
  orgSlug: string;
  eventSlug: string;
}

export const EventMembersTab = (props: EventMembersTabProps) => {
  const { data, loading, error, fetchMore } = useQuery(EVENT_MEMBERS, {
    variables: {
      orgSlug: props.orgSlug,
      eventSlug: props.eventSlug,
      pagination: {
        limit: 20,
        cursor: null,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const nextCursor = data?.eventBySlug?.members?.pagination?.cursor;

  const loadMore = async () => {
    if (!nextCursor || loading) return;

    await fetchMore({
      variables: {
        orgSlug: props.orgSlug,
        eventSlug: props.eventSlug,
        pagination: {
          cursor: nextCursor,
          limit: 20,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          eventBySlug: {
            ...fetchMoreResult.eventBySlug,
            members: {
              ...fetchMoreResult.eventBySlug.members,
              results: [
                ...(prev.eventBySlug.members.results ?? []),
                ...(fetchMoreResult.eventBySlug.members.results ?? []),
              ],
            },
          },
        };
      },
    });
  };

  return (
    <EventMembersTable
      loadMore={loadMore}
      data={data}
      error={error}
      loading={loading}
      hasMore={Boolean(nextCursor)}
    />
  );
};
