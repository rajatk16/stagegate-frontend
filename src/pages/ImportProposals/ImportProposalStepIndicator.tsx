import { CheckCircle } from 'lucide-react';

const STEP_ORDER = ['upload', 'validate', 'preview', 'importing', 'result'];

const STEP_LABELS: Record<string, string> = {
  upload: 'Upload',
  validate: 'Validate',
  preview: 'Preview',
  importing: 'Importing',
  result: 'Result',
};

interface ImportProposalStepIndicatorProps {
  step: string;
}

export const ImportProposalStepIndicator = (props: ImportProposalStepIndicatorProps) => {
  const currentStepIndex = STEP_ORDER.indexOf(props.step);
  return (
    <div className="w-full flex justify-around my-6">
      <div className="flex items-center gap-0">
        {STEP_ORDER.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;

          return (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center justify-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition 
                ${
                  isCompleted
                    ? 'bg-brand-500 text-white'
                    : isActive
                      ? 'bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}
                >
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : index + 1}
                </div>

                <div className="-bottom-6 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {STEP_LABELS[step]}
                </div>
              </div>

              {index < STEP_ORDER.length - 1 && (
                <div
                  className={`w-20 h-0.5 mx-2 transition ${index < currentStepIndex ? 'bg-brand-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
