import { gql, type TypedDocumentNode } from '@apollo/client';

import type {
  DeleteProfilePictureMutation,
  DeleteProfilePictureMutationVariables,
} from '../types';

export const DELETE_PROFILE_PICTURE: TypedDocumentNode<
  DeleteProfilePictureMutation,
  DeleteProfilePictureMutationVariables
> = gql`
  mutation DeleteProfilePicture {
    deleteProfilePicture {
      name
      email
      profilePicture
    }
  }
`;
