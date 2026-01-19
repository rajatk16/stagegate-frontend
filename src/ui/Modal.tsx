import { Loader2 } from 'lucide-react';

interface ModalProps {
  title: string;
  description: string;
  confirmText: string;
  loading?: boolean;
  onConfirm: () => void;
  confirmClassName?: string;
  onCancel: () => void;
}

export const Modal = (props: ModalProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 shadow-xl p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {props.title}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{props.description}</p>

      <div className="flex justify-end gap-3">
        <button
          onClick={props.onCancel}
          disabled={props.loading}
          className="px-4 py-2 rounded-md text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
        >
          Cancel
        </button>

        <button
          onClick={props.onConfirm}
          disabled={props.loading}
          className={props.confirmClassName}
        >
          {props.loading ? <Loader2 className="w-4 h-4 animate-spin" /> : props.confirmText}
        </button>
      </div>
    </div>
  </div>
);
