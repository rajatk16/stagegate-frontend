interface TableHeaderProps {
  labels: string[];
}

export const TableHeader = (props: TableHeaderProps) => (
  <thead className="bg-gray-50 dark:bg-gray-900/50 hidden sm:table-header-group">
    <tr>
      {props.labels.map((label, index) => (
        <th
          key={index}
          className="px-5 py-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide text-center"
        >
          {label}
        </th>
      ))}
    </tr>
  </thead>
);
