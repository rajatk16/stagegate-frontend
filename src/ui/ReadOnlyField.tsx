interface ReadOnlyFieldProps {
  label: string;
  value: React.ReactNode;
}

export const ReadOnlyField = (props: ReadOnlyFieldProps) => (
  <div>
    <p className="textsm font-medium text-gray-600 dark:text-gray-400 mb-1">{props.label}</p>
    <div className="text-gray-900 dark:text-gray-200">{props.value}</div>
  </div>
);
