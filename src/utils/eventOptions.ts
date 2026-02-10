import { EventFormat, EventType } from '@/graphql';

export const EVENT_TYPE_OPTIONS = [
  { value: EventType.Conference, label: 'Conference' },
  { value: EventType.Meetup, label: 'Meetup' },
  { value: EventType.Workshop, label: 'Workshop' },
  { value: EventType.Hackathon, label: 'Hackathon' },
  { value: EventType.Webinar, label: 'Webinar' },
  { value: EventType.Other, label: 'Other' },
];

export const EVENT_FORMAT_OPTIONS = [
  { value: EventFormat.InPerson, label: 'In Person' },
  { value: EventFormat.Online, label: 'Online' },
  { value: EventFormat.Hybrid, label: 'Hybrid' },
];
