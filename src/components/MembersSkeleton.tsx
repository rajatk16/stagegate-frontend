export const MembersSkeleton = () =>
  Array.from({ length: 4 }).map((_, i) => (
    <tr key={i} className="animate-pulse">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-3 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </td>
      <td className="px-5 py-4 text-center">
        <div className="inline-block h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
      </td>
    </tr>
  ));
