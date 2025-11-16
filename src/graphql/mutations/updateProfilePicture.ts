import { gql, type TypedDocumentNode } from '@apollo/client';

import type {
  UpdateProfilePictureMutation,
  UpdateProfilePictureMutationVariables,
} from '../types';

export const UPDATE_PROFILE_PICTURE: TypedDocumentNode<
  UpdateProfilePictureMutation,
  UpdateProfilePictureMutationVariables
> = gql`
  mutation UpdateProfilePicture($url: String!) {
    updateProfilePicture(url: $url) {
      id
      profilePicture
    }
  }
`;
