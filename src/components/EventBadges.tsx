import type { EventFormat, EventMemberRole, EventStatus, EventType } from '@/graphql';
import { Badge } from '@/ui';
import {
  EVENT_ROLE_STYLES,
  FORMAT_STYLES,
  labelize,
  STATUS_STYLES,
  TYPE_STYLES,
} from '@/utils';

interface EventBadgesProps {
  status?: EventStatus;
  eventType?: EventType;
  format?: EventFormat;
  viewerEventRole?: EventMemberRole | null;
}

export const EventBadges = (props: EventBadgesProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {props.status && (
        <Badge label={labelize(props.status)} className={STATUS_STYLES[props.status]} />
      )}
      {props.eventType && (
        <Badge label={labelize(props.eventType)} className={TYPE_STYLES[props.eventType]} />
      )}
      {props.format && (
        <Badge label={labelize(props.format)} className={FORMAT_STYLES[props.format]} />
      )}
      {props.viewerEventRole && (
        <Badge
          label={labelize(props.viewerEventRole)}
          className={EVENT_ROLE_STYLES[props.viewerEventRole]}
        />
      )}
    </div>
  );
};
