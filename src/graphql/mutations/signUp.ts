import { gql, type TypedDocumentNode } from '@apollo/client';

import type { SignUpMutation, SignUpMutationVariables } from '../types';

export const SIGN_UP_MUTATION: TypedDocumentNode<SignUpMutation, SignUpMutationVariables> = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      uid
      email
      user {
        id
        name
        email
        createdAt
      }
    }
  }
`;
