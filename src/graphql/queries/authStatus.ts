import { gql } from '@apollo/client';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type { AuthStatusQuery, AuthStatusQueryVariables } from '../types';

export const AUTH_STATUS: TypedDocumentNode<AuthStatusQuery, AuthStatusQueryVariables> = gql`
  query AuthStatus {
    authStatus {
      emailVerified
    }
  }
`;
