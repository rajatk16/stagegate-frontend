import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQuery } from '@apollo/client/react';
import { Check, AlertCircle, Loader2, Trash2, LogOut } from 'lucide-react';

import { useAppSelector } from '@/hooks';
import { OrgMembersSkeleton } from '@/components';
import { ActionMenu, DropDown, Modal } from '@/ui';
import {
  REMOVE_ORG_MEMBER,
  LEAVE_ORGANIZATION,
  ORGANIZATION_MEMBERS,
  CHANGE_ORG_MEMBER_ROLE,
  OrganizationMemberRole,
} from '@/graphql';

const ROLE_OPTIONS = [
  {
    value: OrganizationMemberRole.Owner,
    label: 'Owner',
    disabled: true,
  },
  {
    value: OrganizationMemberRole.Admin,
    label: 'Admin',
  },
  {
    value: OrganizationMemberRole.Member,
    label: 'Member',
  },
];

export const OrgMembersTab = (props: { slug: string }) => {
  const navigate = useNavigate();
  const { token, uid } = useAppSelector((state) => state.auth);

  const { data, loading, error } = useQuery(ORGANIZATION_MEMBERS, {
    variables: { slug: props.slug },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const [changeOrgMemberRole, { loading: mutationLoading, error: mutationError }] = useMutation(
    CHANGE_ORG_MEMBER_ROLE,
    {
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  );

  const [removeOrgMember, { loading: removeOrgMemberLoading }] = useMutation(
    REMOVE_ORG_MEMBER,
    {
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  );

  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

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

  const viewerRole = data?.organizationBySlug.viewerRole;

  const canManageRoles =
    viewerRole === OrganizationMemberRole.Owner || viewerRole === OrganizationMemberRole.Admin;

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
    <div className="mt-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50 dark:bg-gray-900/50">
          <tr>
            <th className="px-5 py-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide text-center">
              Member
            </th>
            <th className="px-5 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Role
            </th>
            <th className="px-5 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {loading && <OrgMembersSkeleton />}

          {error && !loading && (
            <tr>
              <td colSpan={2} className="px-6 py-10 text-center">
                <div className="flex flex-col items-center gap-3 text-red-600 dark:text-red-400">
                  <AlertCircle className="w-6 h-6" />
                  <p className="font-medium">Failed to load organization members.</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Please try refreshing the page.
                  </p>
                </div>
              </td>
            </tr>
          )}
          {!loading &&
            !error &&
            data?.organizationBySlug.members.results.map((m) => {
              const isSelf = m.user.id === uid;
              const isOwner = m.role === OrganizationMemberRole.Owner;

              const canRemoveMember = canManageRoles && !isSelf && !isOwner;
              const canChangeRole = canManageRoles && !isSelf && !isOwner;

              const canLeaveOrganization = isSelf && m.role !== OrganizationMemberRole.Owner;

              const roleOptionsForRow = ROLE_OPTIONS.filter(
                (opt) => opt.value !== OrganizationMemberRole.Owner,
              );

              const isRowLoading =
                (mutationLoading || removeOrgMemberLoading || leaveOrganizationLoading) &&
                activeUserId === m.user.id;

              return (
                <tr key={m.user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                        {m.user.profilePicture ? (
                          <img
                            src={m.user.profilePicture}
                            alt={m.user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-white bg-brand-500">
                            {m.user.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 dark:text-gray-200 truncate">
                          {m.user.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">{m.user.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <div className="inline-flex flex-col items-center gap-1">
                      {canChangeRole ? (
                        <DropDown
                          value={m.role}
                          options={roleOptionsForRow}
                          disabled={isRowLoading}
                          onChange={(role) => handleRoleChange(m.user.id, role)}
                          renderOption={(option, active) => (
                            <div className="flex items-center gap-2">
                              <span>{option.label}</span>
                              {active && <Check className="w-4 h-4" />}
                            </div>
                          )}
                        />
                      ) : (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                          {m.role}
                        </span>
                      )}

                      {isRowLoading && (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Updating...
                        </span>
                      )}

                      {mutationError && activeUserId === m.user.id && (
                        <span className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {mutationError.message}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <ActionMenu
                      disabled={isRowLoading}
                      options={[
                        ...(canRemoveMember
                          ? [
                              {
                                danger: true,
                                icon: Trash2,
                                label: 'Remove member',
                                onClick: () => handleRemoveMember(m.user.id),
                              },
                            ]
                          : []),
                        ...(canLeaveOrganization
                          ? [
                              {
                                label: 'Leave organization',
                                icon: LogOut,
                                danger: true,
                                onClick: () => setShowLeaveModal(true),
                              },
                            ]
                          : []),
                      ]}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {showLeaveModal && (
        <Modal
          title="Leave organization"
          confirmText="Leave organization"
          loading={leaveOrganizationLoading}
          onConfirm={handleLeaveOrganization}
          onCancel={() => setShowLeaveModal(false)}
          description="You will immediately lose access to this organization and its data."
          confirmClassName="px-4 py-2 rounded-md text-sm font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 cursor-pointer"
        />
      )}
    </div>
  );
};
