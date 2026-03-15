import { ProposalFormat } from '@/graphql';
import { DropDown } from '@/ui';
import { Upload } from 'lucide-react';

interface UploadStepProps {
  onFileSelected: (file: File) => void;
  format: ProposalFormat;
  onFormatChange: (format: ProposalFormat) => void;
  disableFormatDropdown: boolean;
}

const PROPOSAL_FORMAT_OPTIONS = [
  { value: ProposalFormat.Talk, label: 'Talk' },
  { value: ProposalFormat.Workshop, label: 'Workshop' },
  { value: ProposalFormat.Panel, label: 'Panel' },
  { value: ProposalFormat.LightningTalk, label: 'Lightning Talk' },
  { value: ProposalFormat.Other, label: 'Other' },
];

export const UploadStep = (props: UploadStepProps) => (
  <div className="space-y-8">
    <div className="rounded-xl border bg-gray-50 dark:bg-gray-900/40 p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        CSV Format Instructions
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Your CSV file must include the following required columns. Additional optional columns
        are also supported.
      </p>

      <div>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Required Columns
        </h3>

        <div className="flex flex-wrap gap-2">
          {['title', 'abstract', 'speakerName', 'speakerEmail'].map((c) => (
            <span
              key={c}
              className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 font-medium"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Optional Columns
        </h3>

        <div className="flex flex-wrap gap-2">
          {['description', 'duration', 'speakerBio', 'country', 'company', 'role'].map((c) => (
            <span
              key={c}
              className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 font-medium"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-5">
        Format
      </label>
      <DropDown
        value={props.format}
        disabled={props.disableFormatDropdown}
        options={PROPOSAL_FORMAT_OPTIONS}
        align="left"
        variant="compact"
        onChange={(v) => props.onFormatChange(v)}
      />
    </div>

    <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-16 cursor-pointer hover:border-brand-500 dark:hover:border-brand-400 transition">
      <Upload className="w-10 h-10 text-gray-500 mb-3" />
      <span className="font-medium text-gray-800 dark:text-gray-200">
        Click to upload CSV file
      </span>

      <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">Max file size: 5MB</span>
      <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Maximum number of rows: 2000
      </span>
      <input
        type="file"
        accept=".csv"
        hidden
        onChange={(e) => e.target.files?.[0] && props.onFileSelected(e.target.files[0])}
      />
    </label>
  </div>
);
