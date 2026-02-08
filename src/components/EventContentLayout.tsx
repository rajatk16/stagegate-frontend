import { Calendar, Globe, MapPin } from 'lucide-react';

import type { EventBySlugQuery } from '@/graphql';
import { EventMembersTab } from './EventMembersTab';
import { EventSettingsTab } from './EventSettingsTab';

export const EventContentLayout = ({
  activeTab,
  event,
}: {
  activeTab: string;
  event: EventBySlugQuery['eventBySlug'];
}) => {
  const hasDates = event.startDate || event.endDate;
  const hasLocation = event.location && Object.values(event.location).some(Boolean);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
      <section>
        {activeTab === 'overview' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border p-6">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
              About this event
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {event.description || 'No description provided.'}
            </p>
          </div>
        )}
        {activeTab === 'members' && (
          <EventMembersTab eventSlug={event.slug} orgSlug={event.organization.slug} />
        )}
        {activeTab === 'settings' && <EventSettingsTab event={event} />}
      </section>

      <aside className="space-y-6">
        {hasDates && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border p-5">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <h4 className="font-semibold text-gray-900 dark:text-white">Dates</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {event.startDate && new Date(event.startDate).toLocaleDateString()}
              {event.endDate && (
                <>
                  <span className="mx-1 text-gray-400">-</span>
                  {new Date(event.endDate).toLocaleDateString()}
                </>
              )}
            </p>
          </div>
        )}

        {hasLocation && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border p-5">
            <div className="flex items-center gap-2 mb-2 text-gray-900 dark:text-white">
              <MapPin className="w-4 h-4 text-gray-500" />
              <h4 className="font-semibold text-gray-900 dark:text-white">Location</h4>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-0.5">
              {event.location?.name && <p>{event.location.name}</p>}
              {event.location?.address && <p>{event.location.address}</p>}
              {(event.location?.city || event.location?.country) && (
                <p>
                  {[event.location?.city, event.location?.country].filter(Boolean).join(', ')}
                </p>
              )}
            </div>
          </div>
        )}
        {event.website && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border p-5">
            <a
              href={
                event.website.startsWith('http') ? event.website : `https://${event.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-600 hover:underline font-medium"
            >
              <Globe className="w-4 h-4" />
              Visit Website
            </a>
          </div>
        )}
      </aside>
    </div>
  );
};
