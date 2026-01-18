import { gql, type ApolloCache } from '@apollo/client';

import type { OrganizationMemberRole } from '@/graphql';

export const updateMemberRoleInCache = (
  cache: ApolloCache,
  organizationId: string,
  userId: string,
  role: OrganizationMemberRole,
) => {
  cache.modify({
    id: cache.identify({
      __typename: 'Organization',
      id: organizationId,
    }),
    fields: {
      members(existingMembers) {
        if (!existingMembers?.results) return existingMembers;

        return {
          ...existingMembers,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          results: existingMembers.results.map((memberRef: any) => {
            const member = cache.readFragment<{
              user: { id: string };
              role: OrganizationMemberRole;
            }>({
              id: memberRef.__ref,
              fragment: gql`
                fragment MemberRole on OrganizationMember {
                  user {
                    id
                  }
                  role
                }
              `,
            });

            if (!member || member.user.id !== userId) return memberRef;

            return {
              ...memberRef,
              role,
            };
          }),
        };
      },
    },
  });
};
