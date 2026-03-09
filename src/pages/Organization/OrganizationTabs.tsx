import { Calendar, Settings, Users } from 'lucide-react';

import { OrganizationMemberRole, type OrganizationBySlugQuery } from '@/graphql';
import { Tabs } from '@/ui';

interface OrganizationTabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
  organization: OrganizationBySlugQuery['organizationBySlug'];
}

export const OrganizationTabs = (props: OrganizationTabsProps) => {
  const hideSettings =
    props.organization.viewerRole === OrganizationMemberRole.Owner ||
    props.organization.viewerRole === OrganizationMemberRole.Admin;
  return (
    <Tabs
      activeTab={props.activeTab}
      onChange={props.onChange}
      tabs={[
        {
          label: 'Events',
          icon: Calendar,
          value: 'events',
        },
        {
          label: 'Members',
          icon: Users,
          value: 'members',
          hidden: false,
        },
        {
          label: 'Settings',
          icon: Settings,
          value: 'settings',
          hidden: !hideSettings,
        },
      ]}
    />
  );
};
