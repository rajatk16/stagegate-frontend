import { gql, type TypedDocumentNode } from '@apollo/client';

import type {
  BulkCreateProposalsMutation,
  BulkCreateProposalsMutationVariables,
} from '../types';

export const BULK_CREATE_PROPOSALS: TypedDocumentNode<
  BulkCreateProposalsMutation,
  BulkCreateProposalsMutationVariables
> = gql`
  mutation BulkCreateProposals($input: BulkCreateProposalsInput!) {
    bulkCreateProposals(input: $input) {
      total
      created
      skipped
    }
  }
`;
