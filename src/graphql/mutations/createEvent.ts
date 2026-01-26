import { gql, type TypedDocumentNode } from '@apollo/client';
import type { CreateEventMutation, CreateEventMutationVariables } from '../types';

export const CREATE_EVENT: TypedDocumentNode<
  CreateEventMutation,
  CreateEventMutationVariables
> = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      event {
        id
        name
        slug
      }
    }
  }
`;
