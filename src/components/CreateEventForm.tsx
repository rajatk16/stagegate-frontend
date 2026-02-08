import { useMutation } from '@apollo/client/react';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { CREATE_EVENT, EventFormat, EventType, type OrganizationBySlugQuery } from '@/graphql';
import { DropDown, InputField } from '@/ui';
import { isValidDate, toISODate } from '@/utils';

interface CreateEventFormProps {
  data: OrganizationBySlugQuery;
}

const EVENT_TYPE_OPTIONS = [
  { value: EventType.Conference, label: 'Conference' },
  { value: EventType.Meetup, label: 'Meetup' },
  { value: EventType.Workshop, label: 'Workshop' },
  { value: EventType.Hackathon, label: 'Hackathon' },
  { value: EventType.Webinar, label: 'Webinar' },
  { value: EventType.Other, label: 'Other' },
];

const EVENT_FORMAT_OPTIONS = [
  { value: EventFormat.InPerson, label: 'In Person' },
  { value: EventFormat.Online, label: 'Online' },
  { value: EventFormat.Hybrid, label: 'Hybrid' },
];

export const CreateEventForm = (props: CreateEventFormProps) => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    tagline: '',
    description: props.data.organizationBySlug.description || '',
    website: props.data.organizationBySlug.website || '',
    coverImage: '',
    eventType: EventType.Conference,
    format: EventFormat.InPerson,
    startDate: '',
    endDate: '',
    location: {
      name: '',
      address: '',
      city: '',
      country: '',
    },
  });

  const [createEvent, { loading }] = useMutation(CREATE_EVENT);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (!form.name.trim()) {
      setFormError('Event name is required.');
      return;
    }

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

    try {
      const res = await createEvent({
        variables: {
          input: {
            organizationId: props.data.organizationBySlug.id,
            name: form.name.trim(),
            tagline: form.tagline.trim() || null,
            description: form.description.trim() || null,
            eventType: form.eventType,
            format: form.format,
            startDate: form.startDate ? toISODate(form.startDate) : null,
            endDate: form.endDate ? toISODate(form.endDate) : null,
            website: form.website.trim() || null,
            coverImage: form.coverImage.trim() || null,
            location: Object.values(form.location).some((v) => v.trim())
              ? {
                  name: form.location.name.trim() || null,
                  address: form.location.address.trim() || null,
                  city: form.location.city.trim() || null,
                  country: form.location.country.trim() || null,
                }
              : null,
          },
        },
      });

      if (res.data?.createEvent?.event) {
        const slug = res.data.createEvent.event.slug;
        navigate(`/organizations/${props.data.organizationBySlug.slug}/events/${slug}`);
      }
    } catch (error: unknown) {
      setFormError((error as Error).message || 'Failed to create event. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formError && (
        <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm text-center">
          {formError}
        </div>
      )}

      <InputField
        required
        id="name"
        type="text"
        value={form.name}
        label="Event Name"
        disabled={loading}
        placeholder="Enter your event name"
        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
      />

      <InputField
        id="tagline"
        type="text"
        label="Tagline"
        disabled={loading}
        value={form.tagline}
        placeholder="Enter your event tagline"
        onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))}
      />

      <InputField
        textArea
        type="text"
        id="description"
        disabled={loading}
        label="Description"
        value={form.description}
        placeholder="Enter your event description"
        onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label
            htmlFor="eventType"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Event Type
          </label>
          <DropDown
            value={form.eventType}
            disabled={loading}
            options={EVENT_TYPE_OPTIONS}
            align="left"
            variant="form"
            onChange={(v) => setForm((p) => ({ ...p, eventType: v }))}
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="format"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Event Format
          </label>
          <DropDown
            disabled={loading}
            value={form.format}
            options={EVENT_FORMAT_OPTIONS}
            align="left"
            variant="form"
            onChange={(v) => setForm((p) => ({ ...p, format: v }))}
          />
        </div>
      </div>

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
              ? 'Enter a valid date in the format DD-MM-YYYY'
              : undefined
          }
          description="Format: DD-MM-YYYY"
          disabled={loading}
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
              ? 'Enter a valid date in the format DD-MM-YYYY'
              : undefined
          }
          description="Format: DD-MM-YYYY"
          disabled={loading}
        />
      </div>

      {(form.format === EventFormat.InPerson || form.format === EventFormat.Hybrid) && (
        <div className="space-y-4">
          <InputField
            id="locationName"
            type="text"
            value={form.location.name}
            label="Venue Name"
            disabled={loading}
            placeholder="Enter the name of the venue"
            onChange={(e) =>
              setForm((p) => ({ ...p, location: { ...p.location, name: e.target.value } }))
            }
          />

          <InputField
            id="address"
            type="text"
            value={form.location.address}
            label="Address"
            disabled={loading}
            placeholder="Enter the address of the venue"
            onChange={(e) =>
              setForm((p) => ({ ...p, location: { ...p.location, address: e.target.value } }))
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              id="city"
              type="text"
              value={form.location.city}
              label="City"
              disabled={loading}
              placeholder="Enter the city of the venue"
              onChange={(e) =>
                setForm((p) => ({ ...p, location: { ...p.location, city: e.target.value } }))
              }
            />
            <InputField
              id="country"
              type="text"
              value={form.location.country}
              label="Country"
              disabled={loading}
              placeholder="Enter the country of the venue"
              onChange={(e) =>
                setForm((p) => ({ ...p, location: { ...p.location, country: e.target.value } }))
              }
            />
          </div>
        </div>
      )}
      <InputField
        id="website"
        label="Website"
        type="url"
        value={form.website}
        onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
        placeholder="Enter the website of the event"
        description="https://example.com"
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
        className={`
          w-full py-3 rounded-full font-semibold text-white transition ${loading ? 'bg-brand-400 cursor-not-allowed' : 'bg-brand-500 hover:bg-brand-600 cursor-pointer'}  
        `}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" />
            Creating...
          </>
        ) : (
          'Create Event'
        )}
      </button>
    </form>
  );
};
