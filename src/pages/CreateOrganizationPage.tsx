import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useMutation } from '@apollo/client/react';

import { useAppSelector } from '@/hooks';
import { CREATE_ORGANIZATION } from '@/graphql';
import { InputField, OrganizationLogoUploader } from '@/components';
import { uploadImage } from '@/utils';

export const CreateOrganizationPage = () => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);

  const [logo, setLogo] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: '',
    website: '',
  });

  const [formError, setFormError] = useState<string | null>(null);

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
    <>
      <Helmet>
        <title>StageGate - Create Organization</title>
        <meta name="description" content="Create a new organization on StageGate" />
      </Helmet>

      <main className="relative min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-300/20 dark:bg-brand-400/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
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
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              label="Organization Name"
              required
              placeholder="Enter your organization name"
            />
            <InputField
              type="text"
              id="description"
              label="Description"
              textArea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="About your organization"
            />

            <OrganizationLogoUploader value={logo} onChange={setLogo} />

            <InputField
              type="url"
              id="website"
              label="Website"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="Enter your organization website"
            />

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
      </main>
    </>
  );
};
