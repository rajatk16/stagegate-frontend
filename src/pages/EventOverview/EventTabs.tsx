import { Calendar, FileText, Settings, Users } from 'lucide-react';

import { EventMemberRole, type EventBySlugQuery } from '@/graphql';
import { Tabs } from '@/ui';

interface EventTabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
  event: EventBySlugQuery['eventBySlug'];
}

export const EventTabs = (props: EventTabsProps) => {
  return (
    <Tabs
      activeTab={props.activeTab}
      onChange={props.onChange}
      tabs={[
        {
          label: 'Overview',
          icon: Calendar,
          value: 'overview',
          hidden: false,
        },
        {
          label: 'Proposals',
          icon: FileText,
          value: 'proposals',
          hidden: false,
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
          hidden: props.event.viewerEventRole !== EventMemberRole.Organizer,
        },
      ]}
    />
  );
};
