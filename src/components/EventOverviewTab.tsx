import type { EventBySlugQuery } from '@/graphql';

export const EventOverviewTab = ({ event }: { event: EventBySlugQuery['eventBySlug'] }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border p-6">
      <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">About this event</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {event.description || 'No description provided.'}
      </p>
    </div>
  );
};
