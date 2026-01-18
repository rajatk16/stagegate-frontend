import { gql, type TypedDocumentNode } from '@apollo/client';
import type { OrgMembersQuery, OrgMembersQueryVariables } from '../types';

export const ORGANIZATION_MEMBERS: TypedDocumentNode<
  OrgMembersQuery,
  OrgMembersQueryVariables
> = gql`
  query OrgMembers($slug: String!) {
    organizationBySlug(slug: $slug) {
      id
      viewerRole
      members {
        results {
          role
          user {
            id
            name
            email
            profilePicture
          }
        }
      }
    }
  }
`;
