import { gql, type TypedDocumentNode } from '@apollo/client';

import type { MeQuery, MeQueryVariables } from '../types';

export const ME: TypedDocumentNode<MeQuery, MeQueryVariables> = gql`
  query Me {
    me {
      __typename
      bio
      contactInfo {
        __typename
        phone
        secondaryEmail
        website
      }
      createdAt
      updatedAt
      email
      id
      location {
        __typename
        city
        country
      }
      name
      occupation {
        __typename
        company
        title
      }
      socialMedia {
        __typename
        handle
        platform
      }
      profilePicture
    }
  }
`;
