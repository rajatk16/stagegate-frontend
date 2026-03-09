/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader2 } from 'lucide-react';
import Papa from 'papaparse';
import { useState } from 'react';
import { Link, useParams } from 'react-router';

import { normalizeLocation } from '@/utils/localtionNormalizer';
import { ImportProposalStepIndicator } from './ImportProposalStepIndicator';
import { PreviewStep } from './PreviewStep';
import { ResultStep } from './ResultStep';
import { UploadStep } from './UploadStep';
import { ValidateStep } from './ValidateStep';

const REQUIRED_HEADERS = ['title', 'speaker_name', 'speaker_email', 'abstract'];
const MAX_ROWS = 2000;
const MAX_FILE_SIZE_MB = 5;

export const ImportProposalsPage = () => {
  const { orgSlug, eventSlug } = useParams<{
    orgSlug: string;
    eventSlug: string;
  }>();

  const [rows, setRows] = useState<any[]>([]);
  const [step, setStep] = useState<string>('upload');
  const [result, setResult] = useState<{
    total: number;
    created: number;
    skipped: number;
  } | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const normalizeHeaders = (row: any) => {
    const normalized: any = {};
    Object.keys(row).forEach((key) => {
      normalized[key.trim().toLowerCase()] = row[key];
    });
    return normalized;
  };

  const normalizeRow = (row: any) => ({
    title: row.title?.trim(),
    abstract: row.abstract?.trim(),
    description: row.description?.trim() ?? null,
    duration: row.duration && !isNaN(Number(row.duration)) ? Number(row.duration) : null,
    speaker_name: row.speaker_name?.trim(),
    speaker_email: row.speaker_email?.trim(),
    speaker_bio: row.speaker_bio?.trim() ?? null,
    location: normalizeLocation(row.location?.trim() ?? null),
    company: row.company?.trim() ?? null,
    role: row.role?.trim() ?? null,
  });

  const validateRows = (rows: any[]) => {
    const errors: string[] = [];

    if (rows.length === 0) {
      errors.push('CSV file is empty.');
      return errors;
    }

    if (rows.length > MAX_ROWS) {
      errors.push(
        `Maximum number of rows exceeded. Please reduce the number of rows to ${MAX_ROWS}.`,
      );
      return errors;
    }

    const headers = Object.keys(rows[0]);

    for (const header of REQUIRED_HEADERS) {
      if (!headers.includes(header)) {
        errors.push(`Missing required column: ${header}`);
      }
    }

    rows.forEach((row, index) => {
      if (!row.title?.trim()) {
        errors.push(`Row ${index + 2}: Missing title.`);
      }

      if (!row.speaker_name?.trim()) {
        errors.push(`Row ${index + 2}: Missing speaker name.`);
      }

      if (!row.speaker_email?.trim()) {
        errors.push(`Row ${index + 2}: Missing speaker email.`);
      }

      if (!row.abstract?.trim()) {
        errors.push(`Row ${index + 2}: Missing abstract.`);
      }

      if (row.duration && isNaN(Number(row.duration))) {
        errors.push(`Row ${index + 2}: Duration must be a number.`);
      }
    });

    return errors;
  };

  const handleFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setErrors(['File size exceeds the maximum limit of 5MB.']);
      setStep('validate');
      return;
    }

    if (file.type !== 'text/csv') {
      setErrors(['File must be a CSV file.']);
      setStep('validate');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rawRows = results.data as any[];

        const normalizedHeaderRows = rawRows.map(normalizeHeaders);

        const cleanedRows = normalizedHeaderRows.map(normalizeRow);

        const validationErrors = validateRows(cleanedRows);

        if (validationErrors.length > 0) {
          setErrors(validationErrors);
          setStep('validate');
          return;
        }

        setRows(cleanedRows);
        setStep('preview');
      },
    });
  };

  const handleImport = async () => {
    setStep('importing');

    try {
      // TODO: Implement import logic

      setResult({
        total: rows.length,
        created: rows.length,
        skipped: 0,
      });
      setStep('result');
    } catch (error) {
      setErrors([(error as Error).message || 'Import failed. Please try again.']);
      setStep('validate');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="space-y-2 flex flex-col gap-2">
          <Link
            to={`/organizations/${orgSlug}/events/${eventSlug}`}
            className="text-sm text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 hover:underline transition"
          >
            Back to Event
          </Link>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Import Proposals
            </h1>

            <p className="text-gray-500 dark:text-gray-400">
              Upload a CSV file to bulk import proposals for this event.
            </p>
          </div>
          <ImportProposalStepIndicator step={step} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border p-8 space-y-6">
          {step === 'upload' && <UploadStep onFileSelected={handleFile} />}

          {step == 'validate' && (
            <ValidateStep
              errors={errors}
              onClick={() => {
                setErrors([]);
                setStep('upload');
              }}
            />
          )}

          {step === 'preview' && <PreviewStep rows={rows} onConfirm={handleImport} />}

          {step === 'importing' && (
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-brand-500" />
              <span className="text-gray-500 dark:text-gray-400">Importing proposals...</span>
            </div>
          )}

          {step === 'result' && (
            <ResultStep result={result} orgSlug={orgSlug!} eventSlug={eventSlug!} />
          )}
        </div>
      </div>
    </main>
  );
};
