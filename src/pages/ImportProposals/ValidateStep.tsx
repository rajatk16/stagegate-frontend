import { AlertCircle } from 'lucide-react';

interface ValidateStepProps {
  errors: string[];
  onClick: () => void;
}

export const ValidateStep = (props: ValidateStepProps) => (
  <div className="space-y-3 text-red-600 flex flex-col items-center justify-center">
    <AlertCircle />
    {props.errors.map((e) => (
      <div key={e}>{e}</div>
    ))}
    <button
      className="px-6 py-3 rounded-xl font-semibold text-white transition bg-brand-500 hover:bg-brand-600 cursor-pointer"
      onClick={props.onClick}
    >
      Upload a different file
    </button>
  </div>
);
