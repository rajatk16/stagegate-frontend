import type { OrganizationBySlugQuery } from '@/graphql';
import { OrgEventsTab } from './OrgEventsTab';
import { OrgMembersTab } from './OrgMembersTab';
import { OrgSettingsTab } from './OrgSettingsTab';

interface OrganizationContentLayoutProps {
  activeTab: string;
  organization: OrganizationBySlugQuery['organizationBySlug'];
}

export const OrganizationContentLayout = (props: OrganizationContentLayoutProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
      <section>
        {props.activeTab === 'events' && (
          <OrgEventsTab
            slug={props.organization.slug}
            organizationId={props.organization.id}
            viewerOrgRole={props.organization.viewerRole}
          />
        )}

        {props.activeTab === 'members' && <OrgMembersTab slug={props.organization.slug} />}

        {props.activeTab === 'settings' && <OrgSettingsTab organization={props.organization} />}
      </section>

      <aside className="space-y-6">
        {props.organization.description && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border p-5">
            <h3 className="font-semibold mb-2 text-white">About</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {props.organization.description}
            </p>
          </div>
        )}

        {props.organization.website && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border p-5">
            <a
              href={
                props.organization.website.startsWith('http')
                  ? props.organization.website
                  : 'https://' + props.organization.website
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:underline font-medium"
            >
              Visit Website →
            </a>
          </div>
        )}
      </aside>
    </div>
  );
};
