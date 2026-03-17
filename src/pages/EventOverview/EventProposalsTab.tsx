import { useQuery } from '@apollo/client/react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { ProposalFormatBadge, ProposalStatusBadge } from '@/components';
import {
  EVENT_PROPOSALS,
  ProposalFormat,
  ProposalStatus,
  type EventBySlugQuery,
} from '@/graphql';
import { DropDown } from '@/ui';
import { ProposalsList } from './ProposalsList';

interface EventProposalsTabProps {
  event: EventBySlugQuery['eventBySlug'];
}

const PROPOSAL_FORMAT_OPTIONS = [
  { value: null, label: 'All' },
  { value: ProposalFormat.Talk, label: 'Talk' },
  { value: ProposalFormat.Workshop, label: 'Workshop' },
  { value: ProposalFormat.Panel, label: 'Panel' },
  { value: ProposalFormat.LightningTalk, label: 'Lightning Talk' },
  { value: ProposalFormat.Other, label: 'Other' },
];

export const EventProposalsTab = (props: EventProposalsTabProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProposal, setSelectedProposal] = useState<any | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<ProposalFormat | null>(null);

  const { data, loading, error, fetchMore, refetch } = useQuery(EVENT_PROPOSALS, {
    variables: {
      eventId: props.event.id,
      organizationId: props.event.organization.id,
      pagination: {
        limit: 20,
        cursor: null,
      },
      filter: {
        format: selectedFormat ?? null,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProposal !== null) setSelectedProposal(null);
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedProposal]);

  const payload = data?.eventProposals;
  const proposals = payload?.proposals;
  const total = payload?.pagination.total ?? 0;
  const nextCursor = payload?.pagination.cursor;

  const loadMore = async () => {
    if (!nextCursor) return;

    await fetchMore({
      variables: {
        pagination: {
          cursor: nextCursor,
          limit: 20,
        },
        filter: {
          format: selectedFormat ?? null,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          eventProposals: {
            ...fetchMoreResult.eventProposals,
            proposals: [
              ...(prev.eventProposals.proposals ?? []),
              ...(fetchMoreResult.eventProposals.proposals ?? []),
            ],
          },
        };
      },
    });
  };

  const handleFormatChange = async (value: ProposalFormat | null) => {
    setSelectedFormat(value);

    await refetch({
      organizationId: props.event.organization.id,
      eventId: props.event.id,
      pagination: {
        limit: 20,
        cursor: null,
      },
      filter: {
        format: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Proposals</h2>
          {!loading && !error && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{total} proposals found.</p>
          )}
        </div>

        {!loading && !error && (
          <Link
            to={`/organizations/${props.event.organization.slug}/events/${props.event.slug}/import-proposals`}
            className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 transition"
          >
            Import Proposals
          </Link>
        )}
      </div>

      {!loading && !error && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">Format</span>
            <DropDown
              variant="compact"
              value={selectedFormat}
              onChange={handleFormatChange}
              options={PROPOSAL_FORMAT_OPTIONS}
            />
          </div>
        </div>
      )}

      {loading && (
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading proposals...
        </div>
      )}

      {!loading && proposals === null && (
        <div className="text-sm text-gray-500 dark:text-gray-400 border rounded-lg p-4">
          You do not have permission to view proposal details.
        </div>
      )}

      {!loading && proposals?.length === 0 && (
        <div className="text-sm text-gray-500 dark:text-gray-400 border rounded-lg p-4">
          No proposals have been submitted yet.
        </div>
      )}

      {!loading && proposals && proposals.length > 0 && (
        <>
          <ProposalsList proposals={proposals} onSelectedProposal={setSelectedProposal} />

          {nextCursor && (
            <div className="flex justify-center pt-4">
              <button
                onClick={loadMore}
                className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer text-gray-700 dark:text-gray-200"
              >
                Load More
              </button>
            </div>
          )}

          {selectedProposal && (
            <div className="fixed inset-0 z-50 flex justify-end">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setSelectedProposal(null)}
              />
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="relative w-full max-w-xl bg-white dark:bg-gray-900 h-full shadow-xl overflow-y-auto p-6 space-y-6 transform transition-transform duration-200"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedProposal.title}
                  </h2>
                  <button
                    onClick={() => setSelectedProposal(null)}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition bg-gray-100 dark:bg-gray-800"
                  >
                    x
                  </button>
                </div>

                <div className="flex gap-2">
                  <ProposalStatusBadge
                    status={selectedProposal.status ?? ProposalStatus.Draft}
                  />
                  <ProposalFormatBadge
                    format={selectedProposal.format ?? ProposalFormat.Talk}
                  />
                </div>

                {selectedProposal.duration && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Duration</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      {selectedProposal.duration} minutes
                    </p>
                  </div>
                )}

                {selectedProposal.abstract && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Abstract</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">
                      {selectedProposal.abstract}
                    </p>
                  </div>
                )}

                {selectedProposal.description && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Description</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">
                      {selectedProposal.description}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
