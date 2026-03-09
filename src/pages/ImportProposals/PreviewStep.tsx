import { PreviewProposalsTable } from './PreviewProposalsTable';

interface PreviewStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[];
  onConfirm: () => void;
}

export const PreviewStep = (props: PreviewStepProps) => (
  <>
    <PreviewProposalsTable rows={props.rows.slice(0, 10)} />

    <button
      className="px-6 py-3 rounded-xl font-semibold text-white transition bg-brand-500 hover:bg-brand-600 cursor-pointer"
      onClick={props.onConfirm}
    >
      Confirm Import
    </button>
  </>
);
