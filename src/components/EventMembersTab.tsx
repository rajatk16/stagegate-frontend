import { EVENT_MEMBERS } from '@/graphql';
import { useQuery } from '@apollo/client/react';
import { EventMembersTable } from './EventMembersTable';

interface EventMembersTabProps {
  orgSlug: string;
  eventSlug: string;
}

export const EventMembersTab = (props: EventMembersTabProps) => {
  const { data, loading, error } = useQuery(EVENT_MEMBERS, {
    variables: {
      orgSlug: props.orgSlug,
      eventSlug: props.eventSlug,
    },
  });

  return <EventMembersTable data={data} loading={loading} error={error} />;
};
