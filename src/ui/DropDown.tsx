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
  align?: 'left' | 'right';
  variant?: 'compact' | 'form';
  className?: string;
};

export const DropDown = <T,>(props: DropdownProps<T>) => {
  const { align = 'left', variant = 'compact' } = props;

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

  const isForm = variant === 'form';

  return (
    <div
      ref={ref}
      className={`relative inline-block ${isForm ? 'w-full' : ''} ${props.className}`}
    >
      <button
        type="button"
        disabled={props.disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={`inline-flex items-center justify-between gap-2 transition 
          ${
            isForm
              ? 'w-full px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700'
              : 'rounded-full px-3 py-1.5 text-xs'
          }
          ${
            props.disabled
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer'
          }
        `}
      >
        <span className="truncate">
          {selected && (props.renderValue ? props.renderValue(selected) : selected.label)}
        </span>

        {!props.disabled && (
          <ChevronDown
            className={`w-4 h-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        )}
      </button>

      {open && !props.disabled && (
        <div
          className={`
            absolute z-30 mt-2 rounded-xl border border-gray-200 dark:border-gray-700 
            bg-white dark:bg-gray-800 shadow-lg overflow-auto
            ${isForm ? 'w-full' : 'w-44'}
            ${align === 'left' ? 'left-0' : 'right-0'}
            max-h-60
          `}
        >
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
                className={`
                  w-full text-left px-4 py-2 text-sm transition 
                  ${
                    option.disabled
                      ? 'text-gray-400 cursor-not-allowed'
                      : active
                        ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-200 cursor-not-allowed'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer'
                  }
                `}
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
