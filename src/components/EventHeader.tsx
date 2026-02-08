import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

import type { EventBySlugQuery } from '@/graphql';
import { EventBadges } from './EventBadges';

interface EventHeaderProps {
  event: EventBySlugQuery['eventBySlug'];
  orgSlug: string;
}

export const EventHeader = (props: EventHeaderProps) => {
  return (
    <div className="space-y-2">
      <Link
        to={`/organizations/${props.orgSlug}`}
        className="text-sm text-brand-600 hover:text-brand-700 hover:underline inline-flex items-center gap-1"
      >
        <ArrowLeft className="w-4 h-4" />
        {props.event.organization.name}
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        {props.event.name}
      </h1>

      {props.event.tagline && (
        <p className="text-gray-600 dark:text-gray-400">{props.event.tagline}</p>
      )}
      <EventBadges
        status={props.event.status}
        eventType={props.event.eventType}
        format={props.event.format}
        viewerEventRole={props.event.viewerEventRole}
      />
    </div>
  );
};
