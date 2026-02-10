import type { EventBySlugQuery } from '@/graphql';
import { Calendar } from 'lucide-react';
import { EventBadges } from './EventBadges';

interface EventHeroProps {
  event: EventBySlugQuery['eventBySlug'];
}

export const EventHero = (props: EventHeroProps) => {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
      <div className="relative h-[260px] sm:h-[340px] lg:h-[420px]">
        {props.event.coverImage ? (
          <img
            src={props.event.coverImage}
            alt={props.event.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-brand-600 to-brand-800" />
        )}

        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 h-full flex items-end">
          <div className="w-full px-4 sm:px-6 pb-6 sm:pb-8 max-w-6xl mx-auto">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap gap-2">
                <EventBadges
                  status={props.event.status}
                  eventType={props.event.eventType}
                  format={props.event.format}
                  viewerEventRole={props.event.viewerEventRole}
                />
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                {props.event.name}
              </h1>

              {props.event.tagline && (
                <p className="text-gray-200 text-sm sm:text-base max-w-2xl">
                  {props.event.tagline}
                </p>
              )}

              {(props.event.startDate || props.event.endDate) && (
                <div className="flex items-center gap-2 text-sm text-gray-200 mt-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {props.event.startDate &&
                      new Date(props.event.startDate).toLocaleDateString()}
                    {props.event.endDate && (
                      <> – {new Date(props.event.endDate).toLocaleDateString()}</>
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
