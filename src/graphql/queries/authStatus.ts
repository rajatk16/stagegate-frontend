import { gql, type TypedDocumentNode } from '@apollo/client';

import type { AuthStatusQuery, AuthStatusQueryVariables } from '../types';

export const AUTH_STATUS: TypedDocumentNode<AuthStatusQuery, AuthStatusQueryVariables> = gql`
  query AuthStatus {
    authStatus {
      emailVerified
    }
  }
`;
