import { gql, type TypedDocumentNode } from '@apollo/client';

import type { SearchOrganizationsQuery, SearchOrganizationsQueryVariables } from '../types';

export const SEARCH_ORGANIZATIONS: TypedDocumentNode<
  SearchOrganizationsQuery,
  SearchOrganizationsQueryVariables
> = gql`
  query SearchOrganizations($query: String!, $excludeMyOrganizations: Boolean, $limit: Int) {
    searchOrganizations(
      query: $query
      excludeMyOrganizations: $excludeMyOrganizations
      limit: $limit
    ) {
      id
      name
      slug
      description
      logo
      website
    }
  }
`;
