import { gql } from '@apollo/client';

export const SIGN_UP_MUTATION = gql`
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
