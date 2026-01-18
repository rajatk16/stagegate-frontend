import { gql, type TypedDocumentNode } from '@apollo/client';
import type { RemoveOrgMemberMutation, RemoveOrgMemberMutationVariables } from '../types';

export const REMOVE_ORG_MEMBER: TypedDocumentNode<
  RemoveOrgMemberMutation,
  RemoveOrgMemberMutationVariables
> = gql`
  mutation RemoveOrgMember($input: RemoveOrgMemberInput!) {
    removeOrgMember(input: $input) {
      success
    }
  }
`;
