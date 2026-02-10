import { gql, type TypedDocumentNode } from '@apollo/client';
import type { UpdateEventMutation, UpdateEventMutationVariables } from '../types';

export const UPDATE_EVENT: TypedDocumentNode<
  UpdateEventMutation,
  UpdateEventMutationVariables
> = gql`
  mutation UpdateEvent($input: UpdateEventInput!) {
    updateEvent(input: $input) {
      id
      name
      slug
      eventType
      description
      tagline
      startDate
      endDate
      location {
        name
        address
        city
        country
      }
      website
      coverImage
      format
      status
    }
  }
`;
