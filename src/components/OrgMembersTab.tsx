import { useQuery } from '@apollo/client/react';
import { Check, AlertCircle } from 'lucide-react';

import { DropDown } from '@/ui';
import { OrgMembersSkeleton } from '@/components';
import { useAppSelector } from '@/hooks';
import { ORGANIZATION_MEMBERS, OrganizationMemberRole } from '@/graphql';

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

const onRoleChange = (role: OrganizationMemberRole) => {
  console.log(role);
};

export const OrgMembersTab = (props: { slug: string }) => {
  const { token } = useAppSelector((state) => state.auth);

  const { data, loading, error } = useQuery(ORGANIZATION_MEMBERS, {
    variables: { slug: props.slug },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

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
            data?.organizationBySlug.members.results.map((m) => (
              <tr key={m.user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0">
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
                  <DropDown
                    value={m.role}
                    options={ROLE_OPTIONS}
                    onChange={onRoleChange}
                    renderOption={(option, active) => (
                      <div className="flex items-center gap-2">
                        <span>{option.label}</span>
                        {active && <Check className="w-4 h-4" />}
                      </div>
                    )}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
