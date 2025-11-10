import { gql, type TypedDocumentNode } from '@apollo/client';

export const UPDATE_USER: TypedDocumentNode = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
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
      updatedAt
    }
  }
`;
