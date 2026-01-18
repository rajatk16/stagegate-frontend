import { useState } from 'react';
import { Check, AlertCircle, Loader2, Trash2 } from 'lucide-react';
import { useMutation, useQuery } from '@apollo/client/react';

import { DropDown } from '@/ui';
import { useAppSelector } from '@/hooks';
import { OrgMembersSkeleton } from '@/components';
import {
  CHANGE_ORG_MEMBER_ROLE,
  ORGANIZATION_MEMBERS,
  OrganizationMemberRole,
  REMOVE_ORG_MEMBER,
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
              const isRowLoading = mutationLoading && activeUserId === m.user.id;

              const disabled = !canManageRoles || m.user.id === uid || isRowLoading;

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
                      <DropDown
                        value={m.role}
                        options={ROLE_OPTIONS}
                        disabled={disabled || removeOrgMemberLoading}
                        onChange={(role) => handleRoleChange(m.user.id, role)}
                        renderOption={(option, active) => (
                          <div className="flex items-center gap-2">
                            <span>{option.label}</span>
                            {active && <Check className="w-4 h-4" />}
                          </div>
                        )}
                      />

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
                    {canManageRoles && m.user.id !== uid ? (
                      <button
                        disabled={disabled || removeOrgMemberLoading}
                        onClick={() => handleRemoveMember(m.user.id)}
                        className="group inline-flex items-center gap-1.5 px-2.5 py-2 rounded-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline group-hover:inline text-sm font-medium">
                          Remove
                        </span>
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
