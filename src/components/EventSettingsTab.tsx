import { EventMemberRole, type EventBySlugQuery } from '@/graphql';
import { Badge, InputField } from '@/ui';
import { FORMAT_STYLES, labelize, STATUS_STYLES, TYPE_STYLES } from '@/utils';
import { Info } from 'lucide-react';

interface EventSettingsTabProps {
  event: EventBySlugQuery['eventBySlug'];
}

export const EventSettingsTab = (props: EventSettingsTabProps) => {
  const isOrganizer = props.event.viewerEventRole === EventMemberRole.Organizer;
  return (
    <div className="space-y-6">
      {!isOrganizer && (
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 p-4 text-sm text-yellow-800 dark:text-yellow-200 flex gap-2">
          <Info className="w-4 h-4 mt-0.5" />
          You don't have permission to modify this event's settings.
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl border p-6 space-y-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Event Details</h3>

        <InputField
          id="name"
          label="Event Name"
          value={props.event.name}
          disabled
          onChange={() => {}}
        />

        <InputField
          id="tagline"
          label="Tagline"
          value={props.event.tagline ?? ''}
          disabled={!isOrganizer}
          placeholder="Short one-line description"
          onChange={() => {}}
        />

        <InputField
          id="description"
          label="Description"
          textArea
          value={props.event.description ?? ''}
          disabled={!isOrganizer}
          placeholder="Describe the event"
          onChange={() => {}}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Classification</h3>

        <div className="flex flex-wrap gap-2">
          <Badge
            label={labelize(props.event.status)}
            className={STATUS_STYLES[props.event.status]}
          />
          <Badge
            label={labelize(props.event.eventType)}
            className={TYPE_STYLES[props.event.eventType]}
          />
          <Badge
            label={labelize(props.event.format)}
            className={FORMAT_STYLES[props.event.format]}
          />
        </div>

        <p className="text-sm text-gray-500">
          These define how the event appears across the platform.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Event Dates</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            id="startDate"
            label="Start Date"
            value={
              props.event.startDate ? new Date(props.event.startDate).toLocaleDateString() : ''
            }
            disabled={!isOrganizer}
            placeholder="DD-MM-YYYY"
            onChange={() => {}}
          />

          <InputField
            id="endDate"
            label="End Date"
            value={
              props.event.endDate ? new Date(props.event.endDate).toLocaleDateString() : ''
            }
            disabled={!isOrganizer}
            placeholder="DD-MM-YYYY"
            onChange={() => {}}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Website</h3>

        <InputField
          id="website"
          label="Event Website"
          value={props.event.website ?? ''}
          disabled={!isOrganizer}
          placeholder="https://example.com"
          onChange={() => {}}
        />
      </div>

      {isOrganizer && (
        <div className="flex justify-end">
          <button
            disabled
            className="px-5 py-2 rounded-md bg-brand-500 text-white font-medium opacity-60 cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};
