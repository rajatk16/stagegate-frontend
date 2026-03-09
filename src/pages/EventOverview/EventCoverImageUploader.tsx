import { motion } from 'framer-motion';
import { ImagePlus, X } from 'lucide-react';
import { useRef, useState } from 'react';

interface EventCoverImageUploaderProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  maxSizeMB?: number;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const EventCoverImageUploader = ({
  value,
  onChange,
  maxSizeMB = 8,
}: EventCoverImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Please upload a valid image file (JPEG, PNG, or WebP).';
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File must be smaller than ${maxSizeMB}MB`;
    }

    return null;
  };

  const handleFile = (file: File | null) => {
    setError(null);
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
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
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <ImagePlus className="w-7 h-7 text-gray-500" />
            </div>

            <p className="font-medium text-gray-800 dark:text-gray-200">
              Upload event cover image
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Drag & Drop or click to browse
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              PNG / JPG / WebP • Max {maxSizeMB}MB
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-full h-40 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <img
                src={URL.createObjectURL(value)}
                alt="Cover Preview"
                className="w-full h-full object-cover"
              />
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 cursor-pointer"
            >
              <X className="w-4 h-4" /> Remove Image
            </button>
          </div>
        )}

        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept={ALLOWED_TYPES.join(',')}
          onChange={onInputChange}
        />
      </motion.div>
      {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
};
