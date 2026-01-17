import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useMutation } from '@apollo/client/react';

import { InputField } from '@/ui';
import { uploadImage } from '@/utils';
import { useAppSelector } from '@/hooks';
import { CREATE_ORGANIZATION } from '@/graphql';
import { OrganizationLogoUploader } from './OrgLogoUploader';

export const CreateOrgForm = () => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);

  const [formError, setFormError] = useState<string | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    isPublic: false,
  });

  const [createOrganization, { loading }] = useMutation(CREATE_ORGANIZATION, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormError(null);

    if (!formData.name.trim()) {
      setFormError('Organization name is required.');
    }

    try {
      let logoUrl = null;
      if (logo) {
        logoUrl = await uploadImage(logo, `${formData.name.trim()}`, 'organizations');
        console.log(logoUrl);
      }
      const { data } = await createOrganization({
        variables: {
          input: {
            name: formData.name.trim(),
            logo: logoUrl,
            website: formData.website.trim() || null,
            description: formData.description.trim() || null,
            isPublic: formData.isPublic,
          },
        },
      });

      if (data?.createOrganization) {
        const slug = data.createOrganization.slug;
        navigate(`/organizations/${slug}`);
      }
    } catch (error: unknown) {
      setFormError((error as Error).message || 'Something went wrong. Please try again.');
    }
  };
  return (
    <div className="relative w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 md:p-10">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
        Create Your Organization
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Set up your organization to manage events, proposals, reviews, and more.
      </p>

      {formError && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800 text-center">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          required
          id="name"
          type="text"
          value={formData.name}
          label="Organization Name"
          placeholder="Enter your organization name"
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
        />

        <InputField
          textArea
          type="text"
          id="description"
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
          placeholder="About your organization"
        />

        <OrganizationLogoUploader value={logo} onChange={setLogo} />

        <InputField
          type="url"
          id="website"
          label="website"
          value={formData.website}
          placeholder="Enter your organization website"
          onChange={(e) => setFormData((p) => ({ ...p, website: e.target.value }))}
        />

        <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/40">
          <div>
            <p className="font-medium text-gray-800 dark:text-gray-200">Public Organization</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Allow others to discover and join this organization.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={formData.isPublic}
            onClick={() => setFormData((p) => ({ ...p, isPublic: !p.isPublic }))}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 cursor-pointer ${formData.isPublic ? 'bg-brand-500' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${formData.isPublic ? 'translate-x-5' : 'translate-x-1'}`}
            />
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`
            w-full py-3 rounded-full font-semibold text-white transition-all shadow 
            focus:outline-none focus:ring-2 focus:ring-brand-400
            ${
              loading
                ? 'bg-brand-300 cursor-not-allowed'
                : 'bg-brand-500 hover:bg-brand-600 cursor-pointer'
            }
          `}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" />
              Creating...
            </>
          ) : (
            'Create Organization'
          )}
        </button>
      </form>
    </div>
  );
};
