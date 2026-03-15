/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@apollo/client/react';
import { AlertCircle, Loader2 } from 'lucide-react';
import Papa from 'papaparse';
import { useState } from 'react';
import { Link, useParams } from 'react-router';

import { BULK_CREATE_PROPOSALS, EVENT_BY_SLUG, ProposalFormat } from '@/graphql';
import { buildProposalBatches, normalizeLocation } from '@/utils';
import { ImportProposalStepIndicator } from './ImportProposalStepIndicator';
import { PreviewStep } from './PreviewStep';
import { ResultStep } from './ResultStep';
import { UploadStep } from './UploadStep';
import { ValidateStep } from './ValidateStep';

const REQUIRED_HEADERS = ['title', 'speakerName', 'speakerEmail', 'abstract'];
const MAX_ROWS = 2000;
const MAX_FILE_SIZE_MB = 5;

export const ImportProposalsPage = () => {
  const { orgSlug, eventSlug } = useParams<{
    orgSlug: string;
    eventSlug: string;
  }>();

  const { data, loading, error } = useQuery(EVENT_BY_SLUG, {
    variables: { orgSlug: orgSlug!, eventSlug: eventSlug! },
    skip: !orgSlug || !eventSlug,
  });

  const [bulkImportProposals] = useMutation(BULK_CREATE_PROPOSALS);

  const eventId = data?.eventBySlug.id;
  const organizationId = data?.eventBySlug.organization.id;

  const [format, setFormat] = useState<ProposalFormat>(ProposalFormat.Talk);
  const [rows, setRows] = useState<any[]>([]);
  const [step, setStep] = useState<string>('upload');
  const [result, setResult] = useState<{
    total: number;
    created: number;
    skipped: number;
  } | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [importProgress, setImportProgress] = useState({
    imported: 0,
    total: 0,
    currentBatch: 0,
    totalBatches: 0,
  });

  const normalizeHeaders = (row: any) => {
    const normalized: any = {};
    Object.keys(row).forEach((key) => {
      normalized[key.trim()] = row[key];
    });
    return normalized;
  };

  const normalizeRow = (row: any) => ({
    title: row.title?.trim(),
    abstract: row.abstract?.trim(),
    description: row.description?.trim() ?? null,
    duration: row.duration && !isNaN(Number(row.duration)) ? Number(row.duration) : null,
    speakerName: row.speakerName?.trim(),
    speakerEmail: row.speakerEmail?.trim(),
    speakerBio: row.speakerBio?.trim() ?? null,
    country: normalizeLocation(row.location?.trim() ?? null),
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

      if (!row.speakerName?.trim()) {
        errors.push(`Row ${index + 2}: Missing speaker name.`);
      }

      if (!row.speakerEmail?.trim()) {
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
    const CONCURRENT_BATCHES = 3;
    if (!eventId || !organizationId) {
      setErrors(['Missing event details.']);
      setStep('validate');
      return;
    }
    setStep('importing');

    try {
      const proposals = rows.map((row) => ({
        title: row.title,
        abstract: row.abstract,
        description: row.description,
        duration: row.duration,
        speakerName: row.speakerName,
        speakerEmail: row.speakerEmail,
        speakerBio: row.speakerBio,
        speakerOccupation: {
          company: row.company,
          title: row.role,
        },
        speakerLocation: {
          country: row.country,
        },
      }));
      const batches = buildProposalBatches(
        proposals,
        (batch) => ({
          input: {
            eventId: eventId!,
            organizationId: organizationId!,
            format,
            proposals: batch,
          },
        }),
        50 * 1024,
      );
      setImportProgress({
        imported: 0,
        total: rows.length,
        currentBatch: 0,
        totalBatches: batches.length,
      });

      let totalCreated = 0;
      let totalSkipped = 0;

      let batchIndex = 0;

      async function worker() {
        while (batchIndex < batches.length) {
          const currentIndex = batchIndex++;
          const batch = batches[currentIndex];

          const response = await bulkImportProposals({
            variables: {
              input: {
                eventId: eventId!,
                organizationId: organizationId!,
                format,
                proposals: batch,
              },
            },
          });

          const result = response.data?.bulkCreateProposals;

          if (result) {
            totalCreated += result.created;
            totalSkipped += result.skipped;
          }

          setImportProgress((prev) => ({
            ...prev,
            imported: prev.imported + batch.length,
            currentBatch: currentIndex + 1,
          }));
        }
      }

      await Promise.all(Array.from({ length: CONCURRENT_BATCHES }, () => worker()));

      setResult({
        total: rows.length,
        created: totalCreated ?? 0,
        skipped: totalSkipped ?? 0,
      });
      setStep('result');
    } catch (error) {
      setErrors([(error as Error).message || 'Import failed. Please try again.']);
      setStep('validate');
    }
  };

  if (!loading && (error || !data?.eventBySlug || !eventId || !organizationId)) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 border rounded-xl p-8 text-center space-y-4">
            <AlertCircle className="w-10 h-10 text-red-500 dark:text-red-400 inline-block mr-2" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Unable to load event data.
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {error?.message
                ? 'An error occurred while loading the event data.'
                : 'The requested event was not found.'}
            </p>
            <Link
              to={`/dashboard`}
              className="inline-block text-sm text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 hover:underline transition"
            >
              Go back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className={`max-w-7xl mx-auto space-y-6 ${loading ? 'animate-pulse' : ''}`}>
        {loading ? (
          <>
            <div className="space-y-4">
              <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-96 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border p-8 space-y-6">
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </>
        ) : (
          <>
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
                  Upload a CSV file to bulk import proposals for {data?.eventBySlug?.name}.
                </p>
              </div>
              <ImportProposalStepIndicator step={step} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border p-8 space-y-6">
              {step === 'upload' && (
                <UploadStep
                  onFileSelected={handleFile}
                  format={format}
                  onFormatChange={setFormat}
                  disableFormatDropdown={loading}
                />
              )}

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
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-brand-500" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      Importing proposals...
                    </span>
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Imported {importProgress.imported} of {importProgress.total} proposals.
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-brand-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${
                          importProgress.total
                            ? (importProgress.imported / importProgress.total) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {step === 'result' && (
                <ResultStep result={result} orgSlug={orgSlug!} eventSlug={eventSlug!} />
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
};
