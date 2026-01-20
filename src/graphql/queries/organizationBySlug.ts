import { gql, type TypedDocumentNode } from '@apollo/client';

import type { OrganizationBySlugQuery, OrganizationBySlugQueryVariables } from '../types';

export const ORGANIZATION_BY_SLUG: TypedDocumentNode<
  OrganizationBySlugQuery,
  OrganizationBySlugQueryVariables
> = gql`
  query OrganizationBySlug($slug: String!) {
    organizationBySlug(slug: $slug) {
      id
      name
      slug
      description
      website
      logo
      viewerRole
      isPublic
    }
  }
`;
