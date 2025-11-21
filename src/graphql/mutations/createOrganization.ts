import { gql, type TypedDocumentNode } from '@apollo/client';
import type { CreateOrganizationMutation, CreateOrganizationMutationVariables } from '../types';

export const CREATE_ORGANIZATION: TypedDocumentNode<
  CreateOrganizationMutation,
  CreateOrganizationMutationVariables
> = gql`
  mutation CreateOrganization($input: CreateOrganizationInput!) {
    createOrganization(input: $input) {
      id
      name
      slug
      description
      website
      logo
      owner {
        id
        name
        email
      }
      createdAt
      updatedAt
    }
  }
`;
