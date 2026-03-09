import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router';

interface ResultStepProps {
  result: {
    total: number;
    created: number;
    skipped: number;
  } | null;
  orgSlug: string;
  eventSlug: string;
}

export const ResultStep = (props: ResultStepProps) => (
  <div className="space-y-6 text-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
      </div>

      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Import Completed Successfully
      </h2>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        All valid proposals have been processed.
      </p>
    </div>

    {/* Metrics Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="rounded-xl border bg-gray-50 dark:bg-gray-900/40 p-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          {props.result?.total ?? 0}
        </p>
      </div>

      <div className="rounded-xl border bg-green-50 dark:bg-green-900/20 p-4">
        <p className="text-sm text-green-600 dark:text-green-400">Created</p>
        <p className="text-2xl font-semibold text-green-700 dark:text-green-300">
          {props.result?.created ?? 0}
        </p>
      </div>

      <div className="rounded-xl border bg-yellow-50 dark:bg-yellow-900/20 p-4">
        <p className="text-sm text-yellow-600 dark:text-yellow-400">Skipped</p>
        <p className="text-2xl font-semibold text-yellow-700 dark:text-yellow-300">
          {props.result?.skipped ?? 0}
        </p>
      </div>
    </div>

    <Link
      to={`/organizations/${props.orgSlug}/events/${props.eventSlug}`}
      className="inline-flex items-center justify-center mt-4 bg-brand-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 transition"
    >
      Back to Event
    </Link>
  </div>
);
