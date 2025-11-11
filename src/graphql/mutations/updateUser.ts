import { gql, type TypedDocumentNode } from '@apollo/client';

import type { UpdateUserMutation, UpdateUserMutationVariables } from '../types';

export const UPDATE_USER: TypedDocumentNode<UpdateUserMutation, UpdateUserMutationVariables> =
  gql`
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
