interface PreviewProposalsTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[];
}

export const PreviewProposalsTable = (props: PreviewProposalsTableProps) => {
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Showing first {props.rows.length} proposals.
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Abstract
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Speaker Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Speaker Email
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Bio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Occupation Company
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Occupation Title
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
            {props.rows.map((row, index) => {
              return (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/40 text-center"
                >
                  <td className="px-4 py-3 text-gray-400 dark:white">{row.title}</td>
                  <td className="px-4 py-3 text-gray-400 dark:white">
                    {row.abstract?.slice(0, 100)}...
                  </td>
                  <td className="px-4 py-3 text-gray-400 dark:white">
                    {row.description?.slice(0, 100)}...
                  </td>
                  <td className="px-4 py-3 text-gray-400 dark:white">{row.duration} minutes</td>
                  <td className="px-4 py-3 text-gray-400 dark:white">{row.speaker_name}</td>
                  <td className="px-4 py-3 text-gray-400 dark:white">{row.speaker_email}</td>
                  <td className="px-4 py-3 text-gray-400 dark:white">{row.location}</td>
                  <td className="px-4 py-3 text-gray-400 dark:white">
                    {row.speaker_bio?.slice(0, 100)}
                  </td>
                  <td className="px-4 py-3 text-gray-400 dark:white">{row.company}</td>
                  <td className="px-4 py-3 text-gray-400 dark:white">{row.role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
