import { ReadOnlyField } from '@/ui';
import type { OrganizationBySlugQuery } from '@/graphql';
import { Eye, Globe, Lock } from 'lucide-react';

interface GeneralOrgSettingsProps {
  org: OrganizationBySlugQuery['organizationBySlug'] | null;
}

export const GeneralOrgSettings = (props: GeneralOrgSettingsProps) => (
  <>
    <section className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        General Settings
      </h3>

      <div className="space-y-4">
        <ReadOnlyField label="Organization Name" value={props.org?.name} />
        <ReadOnlyField label="Description" value={props.org?.description ?? '-'} />
        <ReadOnlyField
          label="Website"
          value={
            props.org?.website ? (
              <a
                href={
                  props.org.website.startsWith('http')
                    ? props.org.website
                    : `https://${props.org.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-600 hover:underline"
              >
                <Globe className="w-4 h-4" />
                {props.org.website}
              </a>
            ) : (
              '-'
            )
          }
        />
      </div>
      <div className="flex items-center gap-3 mt-4">
        {props.org?.isPublic ? (
          <Eye className="w-5 h-5 text-green-600" />
        ) : (
          <Lock className="w-5 h-5 text-gray-500" />
        )}
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {props.org?.isPublic ? 'Public Organization' : 'Private Organization'}
          </p>
          <p className="text-sm text-gray-500">
            {props.org?.isPublic
              ? 'Anyone can discoverand join this organization.'
              : 'Only invited users can join this organization. (Not yet implemented)'}
          </p>
        </div>
      </div>
    </section>
  </>
);
