import { gql, type TypedDocumentNode } from '@apollo/client';
import type { UpdateOrganizationMutation, UpdateOrganizationMutationVariables } from '../types';

export const UPDATE_ORGANIZATION: TypedDocumentNode<
  UpdateOrganizationMutation,
  UpdateOrganizationMutationVariables
> = gql`
  mutation UpdateOrganization($input: UpdateOrganizationInput!) {
    updateOrganization(input: $input) {
      id
      name
      slug
      website
      isPublic
      description
    }
  }
`;
