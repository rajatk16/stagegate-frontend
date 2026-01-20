export const OrgSettingsSkeleton = () => (
  <div className="mt-6 space-y-6 animate-pulse">
    {Array.from({ length: 2 }).map((_, i) => (
      <div
        key={i}
        className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 space-y-4"
      >
        <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        ))}
      </div>
    ))}
  </div>
);
