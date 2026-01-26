export const STATUS_STYLES: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200',
  PUBLISHED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200',
  ARCHIVED: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-200',
};

export const TYPE_STYLES: Record<string, string> = {
  CONFERENCE: 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-200',
  MEETUP: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200',
  WORKSHOP: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-200',
  HACKATHON: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200',
  WEBINAR: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200',
  OTHER: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-200',
};

export const FORMAT_STYLES: Record<string, string> = {
  IN_PERSON: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200',
  ONLINE: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-200',
  HYBRID: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-200',
};

export const EVENT_ROLE_STYLES: Record<string, string> = {
  ORGANIZER: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-200',
  REVIEWER: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200',
  GUEST: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200',
};

export const ORG_MEMBER_ROLE_STYLES: Record<string, string> = {
  OWNER: 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-200',
  ADMIN: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-200',
  MEMBER: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200',
};

export const labelize = (value: string) =>
  value
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
