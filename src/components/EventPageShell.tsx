import type { ErrorLike } from '@apollo/client';

import type { EventBySlugQuery } from '@/graphql';
import { EventNotFound } from './EventNotFound';
import { EventOverviewSkeleton } from './EventOverviewSkeleton';

interface EventPageShellProps {
  loading: boolean;
  error: ErrorLike | undefined;
  orgSlug: string;
  event?: EventBySlugQuery['eventBySlug'];
  children: (event: EventBySlugQuery['eventBySlug']) => React.ReactNode;
}

export const EventPageShell = (props: EventPageShellProps) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      {props.loading && <EventOverviewSkeleton />}
      {!props.loading && props.error && <EventNotFound orgSlug={props.orgSlug} />}
      {!props.loading && !props.error && props.event && <>{props.children(props.event)}</>}
    </div>
  );
};
