import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export type DropdownOption<T> = {
  value: T;
  label: string;
  disabled?: boolean;
};

type DropdownProps<T> = {
  value: T;
  disabled?: boolean;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  renderValue?: (option: DropdownOption<T>) => ReactNode;
  renderOption?: (option: DropdownOption<T>, active: boolean) => ReactNode;

  className?: string;
};

export const DropDown = <T,>(props: DropdownProps<T>) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = props.options.find((o) => o.value === props.value);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative inline-block ${props.className}`}>
      <button
        type="button"
        disabled={props.disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition ${
          props.disabled
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer'
        }`}
      >
        {selected && (props.renderValue ? props.renderValue(selected) : selected.label)}

        {!props.disabled && (
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        )}
      </button>

      {open && !props.disabled && (
        <div className="absolute right-0 z-20 mt-2 w-44 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
          {props.options.map((option) => {
            const active = option.value === props.value;

            return (
              <button
                key={String(option.value)}
                type="button"
                disabled={option.disabled}
                onClick={() => {
                  setOpen(false);
                  props.onChange(option.value);
                }}
                className={`w-full text-left px-4 py-2 text-sm transition ${
                  option.disabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : active
                      ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-200 cursor-not-allowed'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer'
                }`}
              >
                {props.renderOption ? props.renderOption(option, active) : option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
