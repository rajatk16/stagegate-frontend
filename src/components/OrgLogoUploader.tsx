import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';

interface Props {
  value: File | null;
  onChange: (file: File | null) => void;
  maxSizeKB?: number;
}

const ALLOWED_TYPES = ['image/svg+xml'];

export const OrganizationLogoUploader = ({ value, onChange, maxSizeKB = 200 }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (f: File) => {
    if (!ALLOWED_TYPES.includes(f.type)) {
      return 'Only SVG files are allowed';
    }

    if (f.size > maxSizeKB * 1024) {
      return `File must me smaller than ${maxSizeKB}KB`;
    }
    return null;
  };

  const handleFile = (file: File | null) => {
    setError(null);
    if (!file) return;

    const isValid = validateFile(file);
    if (isValid) {
      setError(isValid);
      return;
    }

    onChange(file);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] ?? null;
    handleFile(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-2">
      <motion.div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onClick={() => inputRef.current?.click()}
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        className={`w-full border-2 border-dashed rounded-xl p-6 text-center cursor-pointer bg-white dark:bg-gray-800 transition-colors ${value ? 'border-brand-500' : 'border-gray-300 dark:border-gray-600'} hover:border-brand-500 dark:hover:border-brand-400`}
      >
        {!value ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <ImagePlus className="w-6 h-6 text-gray-500" />
            </div>
            <p className="font-medium text-gray-800 dark:text-gray-200">
              Upload your organization logo
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Drag & Drop or click to browse
            </p>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              SVG Only - Max {maxSizeKB}KB
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-28 h-28 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-2">
              <img
                src={URL.createObjectURL(value)}
                alt="Logo Preview"
                className="w-full h-full object-contain"
              />
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
            >
              <X className="w-4 h-4" /> Remove Logo
            </button>
          </div>
        )}

        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept="image/svg+xml"
          onChange={onInputChange}
        />
      </motion.div>
      {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
};
