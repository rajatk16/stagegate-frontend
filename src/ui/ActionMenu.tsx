import { MoreVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type ActionMenuOption = {
  label: string;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
};

interface ActionMenuProps {
  options: ActionMenuOption[];
  disabled?: boolean;
}

export const ActionMenu = (props: ActionMenuProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);

    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  if (props.options.length === 0) {
    return <span className="text-sm text-gray-400">-</span>;
  }

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        disabled={props.disabled}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Action Menu"
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <MoreVertical className="w-4 h04 text-gray-500" />
      </button>

      {open && !props.disabled && (
        <div className="absolute right-0 z-30 mt-2 min-w-[160px] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
          {props.options.map((opt, idx) => (
            <button
              key={idx}
              type="button"
              disabled={opt.disabled}
              onClick={() => {
                setOpen(false);
                opt.onClick();
              }}
              className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition ${opt.disabled ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer'} ${opt.danger && !opt.disabled ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:bg-red-900/20' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              {opt.icon && <opt.icon className="w-4 h-4" />}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
