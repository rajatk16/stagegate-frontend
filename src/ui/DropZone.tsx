import { motion } from 'framer-motion';
import { ImagePlus } from 'lucide-react';

interface DropZoneProps {
  onFileSelected: (file: File) => Promise<void>;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const DropZone = (props: DropZoneProps) => {
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const dropped = e.dataTransfer.files?.[0] ?? null;
    if (dropped) props.onFileSelected(dropped);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <motion.div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={() => props.inputRef.current?.click()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="w-full border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 cursor-pointer hover:border-brand-400 hover:shadow-sm transition-colors text-center"
      role="button"
      aria-label="Drop your image here or click to select"
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <ImagePlus className="w-6 h-6 text-gray-500" />
        </div>
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-200">Drag & drop image here</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">or click to select a file</p>
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          JPEG, PNG, or WebP (max 8MB)
        </p>
      </div>
    </motion.div>
  );
};
