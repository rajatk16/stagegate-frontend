import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQuery } from '@apollo/client/react';

import { useAppSelector } from '@/hooks';
import { LeaveOrganizationModal, OrgMembersTable } from '@/components';
import {
  REMOVE_ORG_MEMBER,
  LEAVE_ORGANIZATION,
  ORGANIZATION_MEMBERS,
  CHANGE_ORG_MEMBER_ROLE,
  OrganizationMemberRole,
} from '@/graphql';

export const OrgMembersTab = (props: { slug: string }) => {
  const navigate = useNavigate();
  const { token, uid } = useAppSelector((state) => state.auth);

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);

  const { data, loading, error } = useQuery(ORGANIZATION_MEMBERS, {
    variables: { slug: props.slug },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
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

  return (
    <>
      <OrgMembersTable
        uid={uid}
        data={data}
        error={error}
        loading={loading}
        activeUserId={activeUserId}
        onRoleChange={handleRoleChange}
        onRemoveMember={handleRemoveMember}
        onLeaveOrganization={() => setShowLeaveModal(true)}
        setActiveUserId={setActiveUserId}
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
