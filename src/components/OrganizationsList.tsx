import { Badge } from '@/ui';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Globe } from 'lucide-react';
import { Link } from 'react-router';

import { OrganizationMemberRole } from '@/graphql';
import { labelize, ORG_MEMBER_ROLE_STYLES } from '@/utils';

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
                <p className="text-semibold text-gray-800 dark:text-gray-200">{org.name}</p>
                {org.viewerRole && (
                  <Badge
                    label={labelize(org.viewerRole)}
                    className={ORG_MEMBER_ROLE_STYLES[org.viewerRole]}
                  />
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
