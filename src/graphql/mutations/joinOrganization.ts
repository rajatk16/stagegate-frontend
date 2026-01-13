import { gql, type TypedDocumentNode } from '@apollo/client';
import type { JoinOrganizationMutation, JoinOrganizationMutationVariables } from '../types';

export const JOIN_ORGANIZATION: TypedDocumentNode<
  JoinOrganizationMutation,
  JoinOrganizationMutationVariables
> = gql`
  mutation JoinOrganization($input: JoinOrganizationInput!) {
    joinOrganization(input: $input) {
      organization {
        id
        slug
      }
    }
  }
`;
