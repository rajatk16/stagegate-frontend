import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { useParams } from 'react-router';

import { EventContentLayout, EventHero, EventPageShell, EventTabs } from '@/components';
import { EVENT_BY_SLUG } from '@/graphql';

export const EventOverviewPage = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const { orgSlug, eventSlug } = useParams<{
    orgSlug: string;
    eventSlug: string;
  }>();

  const { data, loading, error } = useQuery(EVENT_BY_SLUG, {
    variables: {
      orgSlug: orgSlug!,
      eventSlug: eventSlug!,
    },
  });

  const event = data?.eventBySlug;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <EventPageShell loading={loading} error={error} orgSlug={orgSlug!} event={event}>
        {(event) => (
          <>
            <EventHero event={event} />

            <EventTabs activeTab={activeTab} onChange={setActiveTab} event={event} />

            <EventContentLayout activeTab={activeTab} event={event} />
          </>
        )}
      </EventPageShell>
    </main>
  );
};
