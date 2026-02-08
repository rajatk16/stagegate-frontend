import { Building2 } from 'lucide-react';

import type { OrganizationBySlugQuery } from '@/graphql';

interface OrganizationHeaderProps {
  organization: OrganizationBySlugQuery['organizationBySlug'];
}

export const OrganizationHeader = (props: OrganizationHeaderProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3 mb-5">
        {props.organization.logo ? (
          <img
            src={props.organization.logo}
            alt={props.organization.name}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
          />
        ) : (
          <Building2 className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 dark:text-gray-400" />
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          {props.organization.name}
        </h1>
      </div>
    </div>
  );
};
