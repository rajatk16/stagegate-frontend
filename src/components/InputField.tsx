import clsx from 'clsx';
import { useId } from 'react';

interface InputFieldProps {
  id?: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  textArea?: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
  error?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  autoComplete?: string;
}

export const InputField = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  textArea = false,
  placeholder,
  style,
  error,
  description,
  disabled = false,
  className,
  autoComplete,
}: InputFieldProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  const baseClasses =
    'w-full px-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-150';

  const borderClasses = clsx({
    'border-gray-300 dark:border-gray-600': !error,
    'border-red-500 focus:ring-red-500 focus:border-red-500': error,
    'opacity-70 cursor-not-allowed': disabled,
  });

  return (
    <div className={clsx('flex flex-col space-y-1', className)}>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {textArea ? (
        <textarea
          id={inputId}
          name={inputId}
          rows={3}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className={`${baseClasses} ${borderClasses} resize-none`}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : description ? `${inputId}-desc` : undefined
          }
          autoComplete=""
          style={style}
        />
      ) : (
        <input
          id={inputId}
          name={inputId}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className={`${baseClasses} ${borderClasses}`}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : description ? `${inputId}-desc` : undefined
          }
          autoComplete={autoComplete}
          style={style}
        />
      )}

      {description && !error && (
        <p id={`${inputId}-desc`} className="text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}

      {error && (
        <p id={`${inputId}-error`} className="text-xs text-red-500 mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
};
