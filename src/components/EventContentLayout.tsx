import type { EventBySlugQuery } from '@/graphql';
import { Globe } from 'lucide-react';

export const EventContentLayout = ({
  activeTab,
  event,
}: {
  activeTab: string;
  event: EventBySlugQuery['eventBySlug'];
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
    <section>
      {activeTab === 'overview' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border p-6">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">About this event</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {event.description || 'No description provided.'}
          </p>
        </div>
      )}
      {activeTab === 'members' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border p-6 text-gray-500">
          Members coming soon.
        </div>
      )}
      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border p-6 text-gray-500">
          Event settings coming soon.
        </div>
      )}
    </section>

    <aside className="space-y-6">
      {(event.startDate || event.endDate) && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border p-5">
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Dates</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {event.startDate && new Date(event.startDate).toLocaleDateString()}{' '}
            {event.endDate && <> – {new Date(event.endDate).toLocaleDateString()}</>}
          </p>
        </div>
      )}
      {event.website && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border p-5">
          <a
            href={event.website.startsWith('http') ? event.website : `https://${event.website}`}
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
