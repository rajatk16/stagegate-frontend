import { AlertCircle, Info, Loader2 } from 'lucide-react';
import { useState } from 'react';

import {
  EventFormat,
  EventMemberRole,
  EventStatus,
  UPDATE_EVENT,
  type EventBySlugQuery,
  type UpdateEventInput,
} from '@/graphql';
import { Badge, DropDown, InputField } from '@/ui';
import {
  EVENT_FORMAT_OPTIONS,
  EVENT_TYPE_OPTIONS,
  FORMAT_STYLES,
  isValidDate,
  labelize,
  STATUS_STYLES,
  toDDMMYYYY,
  toISODate,
  TYPE_STYLES,
} from '@/utils';
import { useMutation } from '@apollo/client/react';
import { EventCoverImageUploader } from './EventCoverImageUploader';

interface EventSettingsTabProps {
  event: EventBySlugQuery['eventBySlug'];
}

export const EventSettingsTab = (props: EventSettingsTabProps) => {
  const isOrganizer = props.event.viewerEventRole === EventMemberRole.Organizer;

  const [formError, setFormError] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const [form, setForm] = useState({
    tagline: props.event.tagline ?? '',
    description: props.event.description ?? '',
    website: props.event.website ?? '',
    eventType: props.event.eventType,
    format: props.event.format,
    status: props.event.status,
    startDate: toDDMMYYYY(props.event.startDate),
    endDate: toDDMMYYYY(props.event.endDate),
    location: {
      name: props.event.location?.name ?? '',
      address: props.event.location?.address ?? '',
      city: props.event.location?.city ?? '',
      country: props.event.location?.country ?? '',
    },
  });

  const [updateEvent, { loading }] = useMutation(UPDATE_EVENT);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (form.startDate && !isValidDate(form.startDate)) {
      setFormError('Start date is invalid.');
      return;
    }

    if (toISODate(form.startDate) && toISODate(form.startDate)! < new Date().toISOString()) {
      setFormError('Start date cannot be in the past.');
      return;
    }

    if (form.endDate && !isValidDate(form.endDate)) {
      setFormError('End date is invalid.');
      return;
    }

    if (form.endDate && !form.startDate) {
      setFormError('Please enter the start date first.');
      return;
    }

    if (
      form.startDate &&
      form.endDate &&
      toISODate(form.endDate)! < toISODate(form.startDate)!
    ) {
      setFormError('End date cannot be before start date.');
      return;
    }

    if (
      (form.format === EventFormat.InPerson || form.format === EventFormat.Hybrid) &&
      !form.location.city.trim()
    ) {
      setFormError('Please provide at least a city for the event location.');
      return;
    }

    const updateInput: UpdateEventInput = {
      eventId: props.event.id,
      organizationId: props.event.organization.id,
      description: form.description.trim(),
      endDate: form.endDate ? toISODate(form.endDate) : null,
      startDate: form.startDate ? toISODate(form.startDate) : null,
      tagline: form.tagline.trim(),
      website: form.website.trim(),
      location: {
        name: form.location.name.trim(),
        address: form.location.address.trim(),
        city: form.location.city.trim(),
        country: form.location.country.trim(),
      },
    };

    if (form.eventType !== props.event.eventType) {
      updateInput.eventType = form.eventType;
    }

    if (form.format !== props.event.format) {
      updateInput.format = form.format;
    }

    if (form.status !== props.event.status) {
      updateInput.status = form.status;
    }

    try {
      const res = await updateEvent({
        variables: {
          input: updateInput,
        },
      });

      if (res.data?.updateEvent) {
        window.location.reload();
      } else {
        setFormError('Failed to update event settings. Please try again.');
      }
    } catch (error) {
      setFormError((error as Error).message || 'Failed to update event settings');
    }
  };

  const STATUS_TRANSITIONS = {
    [EventStatus.Draft]: [EventStatus.Published, EventStatus.Archived],
    [EventStatus.Published]: [EventStatus.Archived],
    [EventStatus.Archived]: [],
  };

  const statusOptions = [
    { value: props.event.status, label: labelize(props.event.status), disabled: true },
    ...(STATUS_TRANSITIONS[props.event.status] ?? []).map((s) => ({
      value: s,
      label: labelize(s),
    })),
  ];

  return (
    <form onSubmit={handleSave} className="space-y-6">
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
          type="text"
          label="Tagline"
          value={form.tagline}
          disabled={!isOrganizer || loading}
          placeholder="Short one-line description"
          onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))}
        />

        <InputField
          textArea
          type="text"
          id="description"
          label="Description"
          value={form.description}
          disabled={!isOrganizer || loading}
          placeholder="Describe the event"
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
        />
      </div>

      {isOrganizer && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cover Image</h3>
          <EventCoverImageUploader value={coverImage} onChange={setCoverImage} />
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl border p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Classification</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            {isOrganizer ? (
              <DropDown
                value={form.status}
                options={statusOptions}
                disabled={!isOrganizer || loading}
                variant="form"
                onChange={(v) => setForm((p) => ({ ...p, status: v }))}
              />
            ) : (
              <Badge
                label={labelize(props.event.status)}
                className={STATUS_STYLES[props.event.status]}
              />
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Event Type
            </label>
            {isOrganizer ? (
              <DropDown
                value={form.eventType}
                options={EVENT_TYPE_OPTIONS}
                disabled={!isOrganizer || loading}
                variant="form"
                onChange={(v) => setForm((p) => ({ ...p, eventType: v }))}
              />
            ) : (
              <Badge
                label={labelize(props.event.eventType)}
                className={TYPE_STYLES[props.event.eventType]}
              />
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Event Format
            </label>
            {isOrganizer ? (
              <DropDown
                value={form.format}
                options={EVENT_FORMAT_OPTIONS}
                disabled={!isOrganizer || loading}
                variant="form"
                onChange={(v) => setForm((p) => ({ ...p, format: v }))}
              />
            ) : (
              <Badge
                label={labelize(props.event.format)}
                className={FORMAT_STYLES[props.event.format]}
              />
            )}
          </div>
        </div>

        <p className="text-sm text-gray-500">
          These define how the event appears across the platform.
        </p>
      </div>

      {(form.format === EventFormat.InPerson || form.format === EventFormat.Hybrid) && (
        <div className="bg0white dark:bg-gray-800 rounded-xl border p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Event Location
          </h3>

          <InputField
            id="locationName"
            type="text"
            label="Venue Name"
            value={form.location.name}
            disabled={!isOrganizer || loading}
            placeholder="Enter the name of the venue"
            onChange={(e) =>
              setForm((p) => ({ ...p, location: { ...p.location, name: e.target.value } }))
            }
          />

          <InputField
            id="address"
            type="text"
            label="Address"
            value={form.location.address}
            disabled={!isOrganizer || loading}
            placeholder="Enter the address of the venue"
            onChange={(e) =>
              setForm((p) => ({ ...p, location: { ...p.location, address: e.target.value } }))
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              id="city"
              type="text"
              label="City"
              value={form.location.city}
              disabled={!isOrganizer || loading}
              placeholder="Enter the city of the venue"
              onChange={(e) =>
                setForm((p) => ({ ...p, location: { ...p.location, city: e.target.value } }))
              }
            />
            <InputField
              id="country"
              type="text"
              label="Country"
              value={form.location.country}
              disabled={!isOrganizer || loading}
              placeholder="Enter the country of the venue"
              onChange={(e) =>
                setForm((p) => ({ ...p, location: { ...p.location, country: e.target.value } }))
              }
            />
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl border p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Event Dates</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            id="startDate"
            label="Start Date"
            type="text"
            value={form.startDate}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d-]/g, '');
              setForm((p) => ({ ...p, startDate: value }));
            }}
            placeholder="Enter the start date of the event"
            error={
              form.startDate && !isValidDate(form.startDate)
                ? 'Enter a valid data in the format DD-MM-YYYY'
                : undefined
            }
            description="Format: DD-MM-YYYY"
            disabled={!isOrganizer || loading}
          />

          <InputField
            id="endDate"
            label="End Date"
            type="text"
            value={form.endDate}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d-]/g, '');
              setForm((p) => ({ ...p, endDate: value }));
            }}
            placeholder="Enter the end date of the event"
            error={
              form.endDate && !isValidDate(form.endDate)
                ? 'Enter a valid data in the format DD-MM-YYYY'
                : undefined
            }
            description="Format: DD-MM-YYYY"
            disabled={!isOrganizer || loading}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Website</h3>

        <InputField
          id="website"
          label="Event Website"
          type="url"
          value={form.website}
          onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
          placeholder="Enter the website of the event"
          description="https://example.com"
          disabled={!isOrganizer || loading}
        />
      </div>

      {formError && (
        <div className="flex items-center p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm text-center">
          <AlertCircle className="w-4 h-4" />
          <span className="ml-2">{formError}</span>
        </div>
      )}

      {isOrganizer && (
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full font-semibold text-white transition ${loading ? 'bg-brand-400 cursor-not-allowed' : 'bg-brand-500 hover:bg-brand-600 cursor-pointer'}`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      )}
    </form>
  );
};
