import { useMutation, useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
  CHANGE_ORG_MEMBER_ROLE,
  LEAVE_ORGANIZATION,
  ORGANIZATION_MEMBERS,
  OrganizationMemberRole,
  REMOVE_ORG_MEMBER,
} from '@/graphql';
import { useAppSelector } from '@/hooks';
import { LeaveOrganizationModal } from './LeaveOrganizationModal';
import { OrgMembersTable } from './OrgMembersTable';

export const OrgMembersTab = (props: { slug: string }) => {
  const navigate = useNavigate();
  const { token, uid } = useAppSelector((state) => state.auth);

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);

  const { data, loading, error, fetchMore } = useQuery(ORGANIZATION_MEMBERS, {
    variables: {
      slug: props.slug,
      pagination: {
        limit: 20,
        cursor: null,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [changeOrgMemberRole] = useMutation(CHANGE_ORG_MEMBER_ROLE, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const [removeOrgMember] = useMutation(REMOVE_ORG_MEMBER, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const [leaveOrganization, { loading: leaveOrganizationLoading }] = useMutation(
    LEAVE_ORGANIZATION,
    {
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  );

  const handleLeaveOrganization = async () => {
    if (!data?.organizationBySlug.id) return;
    const res = await leaveOrganization({
      variables: {
        input: {
          organizationId: data.organizationBySlug.id,
        },
      },
    });

    if (res.data?.leaveOrganization.success) {
      navigate('/dashboard');
    }
  };

  const handleRoleChange = async (userId: string, role: OrganizationMemberRole) => {
    setActiveUserId(userId);
    try {
      if (!data?.organizationBySlug.id) return;
      await changeOrgMemberRole({
        variables: {
          input: {
            role,
            userId,
            organizationId: data.organizationBySlug.id,
          },
        },
        refetchQueries: [ORGANIZATION_MEMBERS],
      });
    } finally {
      setActiveUserId(null);
    }
  };

  const handleRemoveMember = async (userId: string) => {
    if (!data?.organizationBySlug.id) return;
    await removeOrgMember({
      variables: {
        input: {
          userId,
          organizationId: data.organizationBySlug.id,
        },
      },
      refetchQueries: [ORGANIZATION_MEMBERS],
    });
  };

  const nextCursor = data?.organizationBySlug.members.pagination?.cursor;

  const loadMore = async () => {
    if (!nextCursor || loading) return;

    await fetchMore({
      variables: {
        pagination: {
          limit: 20,
          cursor: nextCursor,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          organizationBySlug: {
            ...prev.organizationBySlug,
            members: {
              ...fetchMoreResult.organizationBySlug.members,
              results: [
                ...(prev.organizationBySlug.members.results ?? []),
                ...(fetchMoreResult.organizationBySlug.members.results ?? []),
              ],
            },
          },
        };
      },
    });
  };

  return (
    <>
      <OrgMembersTable
        uid={uid}
        data={data}
        error={error}
        loading={loading}
        loadMore={loadMore}
        activeUserId={activeUserId}
        hasMore={Boolean(nextCursor)}
        onRoleChange={handleRoleChange}
        setActiveUserId={setActiveUserId}
        onRemoveMember={handleRemoveMember}
        onLeaveOrganization={() => setShowLeaveModal(true)}
      />

      <LeaveOrganizationModal
        open={showLeaveModal}
        loading={leaveOrganizationLoading}
        onConfirm={handleLeaveOrganization}
        onCancel={() => setShowLeaveModal(false)}
      />
    </>
  );
};
