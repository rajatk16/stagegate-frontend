import { EventFormat, type EventBySlugQuery } from '@/graphql';
import { Globe, MapPin } from 'lucide-react';

export const EventOverviewTab = ({ event }: { event: EventBySlugQuery['eventBySlug'] }) => {
  const hasLocation = event.location && Object.values(event.location).some(Boolean);
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl border p-6">
        <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">About this event</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {event.description || 'No description provided.'}
        </p>
      </div>

      <div className="space-y-6 mt-5">
        {(event.format === EventFormat.InPerson || event.format === EventFormat.Hybrid) &&
          hasLocation && (
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
      </div>
    </>
  );
};
