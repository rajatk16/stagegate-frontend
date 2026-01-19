import { gql, type TypedDocumentNode } from '@apollo/client';
import type { LeaveOrganizationMutation, LeaveOrganizationMutationVariables } from '../types';

export const LEAVE_ORGANIZATION: TypedDocumentNode<
  LeaveOrganizationMutation,
  LeaveOrganizationMutationVariables
> = gql`
  mutation LeaveOrganization($input: LeaveOrganizationInput!) {
    leaveOrganization(input: $input) {
      success
    }
  }
`;
