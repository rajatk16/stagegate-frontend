export const OrganizationsSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700 shadow-sm">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-center justify-between gap-6 p-5 animate-pulse">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-2 min-w-0">
            <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    ))}
  </div>
);
