import { ProposalFormatBadge, ProposalStatusBadge } from '@/components';
import { ProposalFormat, ProposalStatus, type EventProposalsQuery } from '@/graphql';

interface ProposalsListProps {
  proposals: EventProposalsQuery['eventProposals']['proposals'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelectedProposal: (proposal: any | null) => void;
}
export const ProposalsList = (props: ProposalsListProps) => {
  return (
    <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="divide-y">
        {props.proposals?.map((proposal) => (
          <div
            key={proposal?.id}
            onClick={() => props.onSelectedProposal(proposal)}
            className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-lg">
                {proposal?.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <ProposalStatusBadge status={proposal?.status ?? ProposalStatus.Draft} />
              <ProposalFormatBadge format={proposal?.format ?? ProposalFormat.Talk} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
