import { gql, type TypedDocumentNode } from '@apollo/client';
import type { MyOrganizationsQuery, MyOrganizationsQueryVariables } from '../types';

export const MY_ORGANIZATIONS: TypedDocumentNode<
  MyOrganizationsQuery,
  MyOrganizationsQueryVariables
> = gql`
  query MyOrganizations {
    myOrganizations {
      id
      name
      slug
      description
      website
      logo
      owner {
        id
      }
    }
  }
`;
