import { gql, type TypedDocumentNode } from '@apollo/client';
import type { EventMembersQuery, EventMembersQueryVariables } from '../types';

export const EVENT_MEMBERS: TypedDocumentNode<EventMembersQuery, EventMembersQueryVariables> =
  gql`
    query EventMembers($orgSlug: String!, $eventSlug: String!, $pagination: PaginationInput) {
      eventBySlug(organizationSlug: $orgSlug, eventSlug: $eventSlug) {
        id
        viewerEventRole
        members(pagination: $pagination) {
          pagination {
            cursor
            total
          }
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
