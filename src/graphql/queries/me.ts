import { gql, type TypedDocumentNode } from '@apollo/client';
import type { MeQuery, MeQueryVariables } from '../types';

export const ME: TypedDocumentNode<MeQuery, MeQueryVariables> = gql`
  query Me {
    me {
      bio
      contactInfo {
        phone
        secondaryEmail
        website
      }
      createdAt
      email
      id
      location {
        city
        country
      }
      name
      occupation {
        company
        title
      }
      socialMedia {
        handle
        platform
      }
    }
  }
`;
