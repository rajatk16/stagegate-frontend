import { useQuery } from '@apollo/client/react';
import { Calendar, Plus } from 'lucide-react';
import { Link } from 'react-router';

import { ORGANIZATION_EVENTS, OrganizationMemberRole } from '@/graphql';
import { OrgEventsError } from './OrgEventsError';
import { OrgEventsSkeleton } from './OrgEventsSkeleton';

interface OrgEventsTabProps {
  organizationId: string;
  viewerOrgRole: OrganizationMemberRole | null;
}

export const OrgEventsTab = (props: OrgEventsTabProps) => {
  const { data, loading, error } = useQuery(ORGANIZATION_EVENTS, {
    variables: {
      organizationId: props.organizationId,
    },
  });

  const events = data?.organizationEvents ?? [];
  const canCreateEvent =
    props.viewerOrgRole === OrganizationMemberRole.Owner ||
    props.viewerOrgRole === OrganizationMemberRole.Admin;
  return (
    <div className="mt-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-900 dark:text-white">Events</h2>
        {canCreateEvent && !loading && !error && events.length !== 0 && (
          <Link
            to={`/events/new?org=${props.organizationId}`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-brand-500 hover:bg-brand-600 text-white font-medium shadow transition-all hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            Create Event
          </Link>
        )}
      </div>

      {loading && <OrgEventsSkeleton />}

      {!loading && error && <OrgEventsError />}

      {!loading && !error && events.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-700 p-10 text-center bg-white dark:bg-gray-800">
          <Calendar className="mx-auto mb-4 w-10 h-10 text-gray-400" />
          <h3 className="font-medium text-gray-800 dark:text-gray-200">No events yet.</h3>
          <p className="mt-1 text-sm text-gray-500">
            {canCreateEvent
              ? 'Create your first event to start accepting proposals.'
              : 'Ask your organization owner or admin to create an event.'}
          </p>
          {canCreateEvent && (
            <Link
              to={`/events/new?org=${props.organizationId}`}
              className="inline-flex items-center justify-center gap-2 mt-5 px-5 py-2.5 rounded-md bg-brand-500 hover:bg-brand-600 text-white font-medium shadow transtion-all hover:shadow-md"
            >
              <Plus className="w-4 h-4" />
              Create Event
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
