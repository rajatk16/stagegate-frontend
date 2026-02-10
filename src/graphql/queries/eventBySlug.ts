import { gql, type TypedDocumentNode } from '@apollo/client';

import type { EventBySlugQuery, EventBySlugQueryVariables } from '../types';

export const EVENT_BY_SLUG: TypedDocumentNode<EventBySlugQuery, EventBySlugQueryVariables> =
  gql`
    query EventBySlug($orgSlug: String!, $eventSlug: String!) {
      eventBySlug(organizationSlug: $orgSlug, eventSlug: $eventSlug) {
        id
        name
        slug
        organization {
          id
          name
          slug
        }
        tagline
        status
        eventType
        format
        viewerEventRole
        description
        startDate
        endDate
        website
        location {
          name
          address
          city
          country
        }
        coverImage
      }
    }
  `;
