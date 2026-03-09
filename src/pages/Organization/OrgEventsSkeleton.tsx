export const OrgEventsSkeleton = () => (
  <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 divide-y animate-pulse">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex justify-between px-6 py-4">
        <div className="space-y-2">
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <div className="flex gap-3">
          <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    ))}
  </div>
);
