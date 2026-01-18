import { gql, type TypedDocumentNode } from '@apollo/client';

import type {
  ChangeOrgMemberRoleMutation,
  ChangeOrgMemberRoleMutationVariables,
} from '../types';

export const CHANGE_ORG_MEMBER_ROLE: TypedDocumentNode<
  ChangeOrgMemberRoleMutation,
  ChangeOrgMemberRoleMutationVariables
> = gql`
  mutation ChangeOrgMemberRole($input: ChangeOrgMemberRoleInput!) {
    changeOrgMemberRole(input: $input) {
      user {
        id
      }
      role
    }
  }
`;
