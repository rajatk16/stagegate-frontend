import { gql, type TypedDocumentNode } from '@apollo/client';

import type { EventProposalsQuery, EventProposalsQueryVariables } from '../types';

export const EVENT_PROPOSALS: TypedDocumentNode<
  EventProposalsQuery,
  EventProposalsQueryVariables
> = gql`
  query EventProposals(
    $eventId: ID!
    $organizationId: ID!
    $pagination: PaginationInput
    $filter: EventProposalsFilterInput
  ) {
    eventProposals(
      eventId: $eventId
      organizationId: $organizationId
      pagination: $pagination
      filter: $filter
    ) {
      proposals {
        id
        title
        description
        abstract
        duration
        status
        format
      }
      pagination {
        total
        cursor
      }
    }
  }
`;
