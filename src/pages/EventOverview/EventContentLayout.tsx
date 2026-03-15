import { type EventBySlugQuery } from '@/graphql';
import { EventMembersTab } from './EventMembersTab';
import { EventOverviewTab } from './EventOverviewTab';
import { EventProposalsTab } from './EventProposalsTab';
import { EventSettingsTab } from './EventSettingsTab';

export const EventContentLayout = ({
  activeTab,
  event,
}: {
  activeTab: string;
  event: EventBySlugQuery['eventBySlug'];
}) => {
  return (
    <div className="grid gap-8">
      <section>
        {activeTab === 'overview' && <EventOverviewTab event={event} />}
        {activeTab === 'proposals' && <EventProposalsTab event={event} />}
        {activeTab === 'members' && (
          <EventMembersTab eventSlug={event.slug} orgSlug={event.organization.slug} />
        )}
        {activeTab === 'settings' && <EventSettingsTab event={event} />}
      </section>
    </div>
  );
};
