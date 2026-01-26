import { gql, type TypedDocumentNode } from '@apollo/client';
import type { OrganizationEventsQuery, OrganizationEventsQueryVariables } from '../types';

export const ORGANIZATION_EVENTS: TypedDocumentNode<
  OrganizationEventsQuery,
  OrganizationEventsQueryVariables
> = gql`
  query OrganizationEvents($organizationId: ID!) {
    organizationEvents(organizationId: $organizationId) {
      id
      name
      slug
      eventType
      tagline
      startDate
      endDate
      website
      coverImage
      format
      status
      viewerOrgRole
      viewerEventRole
    }
  }
`;
