import { TabButton } from '@/ui';

interface TabsProps<T> {
  activeTab: T;
  onChange: (tab: T) => void;
  tabs: {
    label: string;
    icon: React.ElementType;
    value: T;
    hidden?: boolean;
  }[];
}

export const Tabs = <T,>(props: TabsProps<T>) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto no-scrollbar">
      <div className="flex gap-6">
        {props.tabs.map((tab, index) =>
          tab.hidden ? null : (
            <TabButton
              key={`${tab.value}-${index}`}
              active={props.activeTab === tab.value}
              onClick={() => props.onChange(tab.value)}
              icon={tab.icon}
              label={tab.label}
            />
          ),
        )}
      </div>
    </div>
  );
};
