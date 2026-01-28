import { Calendar, Globe } from 'lucide-react';
import { Link } from 'react-router';

import type { OrganizationEventsQuery } from '@/graphql';
import { Badge } from '@/ui';
import {
  EVENT_ROLE_STYLES,
  FORMAT_STYLES,
  labelize,
  STATUS_STYLES,
  TYPE_STYLES,
} from '@/utils';

interface EventsListProps {
  orgSlug: string;
  events: OrganizationEventsQuery['organizationEvents'];
}

export const EventsList = (props: EventsListProps) => {
  return (
    <div className="space-y-3">
      {props.events.map((event) => (
        <div
          key={event.id}
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-gray-900 dark:text-gray-200 truncate">
                  {event.name}
                </p>
                <Badge label={labelize(event.status)} className={STATUS_STYLES[event.status]} />
                {event.viewerEventRole && (
                  <Badge
                    label={labelize(event.viewerEventRole)}
                    className={EVENT_ROLE_STYLES[event.viewerEventRole]}
                  />
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm text-gray-500 dark:text-gray-400">
                {event.startDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 shrink-0" />
                    {new Date(event.startDate).toLocaleDateString()}
                    {event.endDate && (
                      <>
                        <span className="mx-1 text-gray-400 dark:text-gray-500">-</span>
                        {new Date(event.endDate).toLocaleDateString()}
                      </>
                    )}
                  </span>
                )}

                {event.website && (
                  <a
                    href={
                      event.website.startsWith('http')
                        ? event.website
                        : `https://${event.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-brand-600 hover:underline"
                  >
                    <Globe className="w-4 h-4" />
                    Website
                  </a>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <Badge
                  label={labelize(event.eventType)}
                  className={TYPE_STYLES[event.eventType]}
                />
                <Badge label={labelize(event.format)} className={FORMAT_STYLES[event.format]} />
              </div>
            </div>

            <Link
              to={`/organizations/${props.orgSlug}/events/${event.slug}`}
              className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium shadow transition-all hover:shadow-md w-full sm:w-auto shrink-0"
            >
              Open
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
