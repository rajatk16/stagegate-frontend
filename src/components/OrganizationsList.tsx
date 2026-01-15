import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Globe } from 'lucide-react';

import { OrganizationMemberRole } from '@/graphql';

interface OrganizationsListProps {
  organizations: {
    __typename: 'Organization';
    id: string;
    name: string;
    slug: string;
    description: string | null;
    website: string | null;
    logo: string | null;
    viewerRole: OrganizationMemberRole | null;
    owner: {
      __typename: 'User';
      id: string;
    };
  }[];
}

export const OrganizationsList = (props: OrganizationsListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700 shadow-sm overflow-hidden"
    >
      {props.organizations.map((org, idx) => (
        <motion.div
          key={org.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="flex items-center justify-between gap-6 p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
              {org.logo ? (
                <img src={org.logo} alt={org.name} className="w-full h-full object-contain" />
              ) : (
                <Building2 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center justify-center gap-2">
                <p className="text-semibold text-gray-800 dark:text-gray-200 truncate">
                  {org.name}
                </p>
                {org.viewerRole === OrganizationMemberRole.Owner && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-brand-100 text-brand-700 dark:bg-brand-800 dark:text-brand-200 border border-brand-200 dark:border-brand-700">
                    Owner
                  </span>
                )}
                {org.viewerRole === OrganizationMemberRole.Admin && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700">
                    Admin
                  </span>
                )}
                {org.viewerRole === OrganizationMemberRole.Member && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 border border-green-200 dark:border-green-700">
                    Member
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {org.website && (
              <a
                href={org.website.startsWith('http') ? org.website : `https://${org.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:underline"
              >
                <Globe className="w-4 h-4" />
                <span className="sr-only">Visit {org.name} website</span>
              </a>
            )}

            <Link
              to={`/organizations/${org.slug}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-md bg-brand-500 hover:bg-brand-600 text-white font-medium transition-all shadow-sm hover:shadow"
            >
              <ArrowRight className="w-4 h-4" />
              <span className="sr-only">Open {org.name} organization</span>
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
