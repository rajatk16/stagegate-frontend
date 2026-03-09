export const EventOverviewSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-2">
        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>

    <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto no-scrollbar">
      <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>

    <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl" />
  </div>
);
