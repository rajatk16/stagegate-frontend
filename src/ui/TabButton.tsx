interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}

export const TabButton = ({ active, onClick, icon: Icon, label }: TabButtonProps) => (
  <button
    type="button"
    disabled={active}
    onClick={onClick}
    className={`pb-3 inline-flex items-center gap-2 font-medium whitespace-nowrap ${
      active
        ? 'border-b-2 border-brand-500 text-brand-600 cursor-not-allowed'
        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer'
    }`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);
