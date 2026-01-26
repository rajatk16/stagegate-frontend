import { useMutation } from '@apollo/client/react';
import { Loader2, Save } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
  OrganizationMemberRole,
  UPDATE_ORGANIZATION,
  type OrganizationBySlugQuery,
} from '@/graphql';
import { useAppSelector } from '@/hooks';
import { InputField } from '@/ui';
import { uploadImage } from '@/utils';
import { OrganizationLogoUploader } from './OrgLogoUploader';

interface OrgSettingsTabProps {
  organization: OrganizationBySlugQuery['organizationBySlug'];
}

export const OrgSettingsTab = (props: OrgSettingsTabProps) => {
  const { token } = useAppSelector((state) => state.auth);

  const isOwner = props.organization.viewerRole === OrganizationMemberRole.Owner;
  const isAdmin = props.organization.viewerRole === OrganizationMemberRole.Admin;

  const canEditContent = isOwner || isAdmin;
  const canEditSensitive = isOwner;

  const [formData, setFormData] = useState({
    description: props.organization.description ?? '',
    website: props.organization.website ?? '',
    isPublic: props.organization.isPublic,
  });

  const [error, setError] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [updateOrganization, { loading }] = useMutation(UPDATE_ORGANIZATION, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  useEffect(() => {
    setFormData({
      description: props.organization.description ?? '',
      website: props.organization.website ?? '',
      isPublic: props.organization.isPublic,
    });
  }, [props.organization.description, props.organization.website, props.organization.isPublic]);

  const handleSave = async () => {
    setError(null);

    try {
      let logoUrl = null;
      if (logoFile) {
        logoUrl = await uploadImage(logoFile, props.organization.name, 'organizations');
      }

      const { data } = await updateOrganization({
        variables: {
          input: {
            organizationId: props.organization.id,
            logo: canEditSensitive ? logoUrl : undefined,
            isPublic: canEditContent ? formData.isPublic : undefined,
            website: canEditContent ? formData.website.trim() : undefined,
            description: canEditContent ? formData.description.trim() : undefined,
          },
        },
      });

      if (data?.updateOrganization) {
        window.location.reload();
      } else {
        setError('Failed to update organization settings. Please try again.');
      }
    } catch (error) {
      console.log(error);
      setError((error as Error).message || 'Failed to update organization settings');
    }
  };

  return (
    <div className="space-y-8 mt-6">
      <section className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 text-gray-900 dark:text-white space-y-6">
        <h3 className="text-lg font-semibold mb-4">General</h3>
        <InputField
          id="name"
          disabled
          label="Name"
          type="text"
          onChange={() => {}}
          value={props.organization.name}
          className="opacity-70 cursor-not-allowed"
        />

        <InputField
          textArea
          type="text"
          id="description"
          label="Description"
          disabled={!canEditContent}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <InputField
          type="url"
          id="website"
          label="Website"
          value={formData.website}
          disabled={!canEditContent}
          placeholder="https://example.com"
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        />
      </section>

      <section className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 text-gray-900 dark:text-white space-y-6">
        <h3 className="text-lg font-semibold mb-4">Branding</h3>

        {!canEditSensitive ? (
          <p>Only the organization owner can change the logo.</p>
        ) : (
          <OrganizationLogoUploader value={logoFile} onChange={setLogoFile} />
        )}
      </section>

      <section className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 text-gray-900 dark:text-white space-y-6">
        <h3 className="text-lg font-semibold mb-4">Visibility</h3>

        <div className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/40">
          <div>
            <p className="font-medium">Public Organization</p>
            <p className="text-sm text-gray-500">
              Allow others to discover and join this organization.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            disabled={!canEditContent}
            aria-checked={formData.isPublic}
            onClick={() => setFormData({ ...formData, isPublic: !formData.isPublic })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              formData.isPublic ? 'bg-brand-500' : 'bg-gray-300 dark:bg-gray-600'
            } ${!canEditSensitive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${formData.isPublic ? 'translate-x-5' : 'translate-x-1'}`}
            />
          </button>
        </div>
      </section>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800 text-center">
          {error}
        </div>
      )}

      {(canEditContent || canEditSensitive) && (
        <div className="flex justify-end">
          <button
            type="button"
            disabled={loading}
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
