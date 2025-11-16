import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { ArrowLeft, Camera, Loader2, Trash2 } from 'lucide-react';

import { useAppSelector } from '@/hooks';
import { EditSocialMedia, InputField } from '@/components';
import { ME, UPDATE_USER, type UpdateUserInput } from '@/graphql';

export const EditProfilePage = () => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);
  const { data, loading } = useQuery(ME, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const initialSocialMedia = useMemo(() => {
    return [
      {
        handle: '',
        platform: 'x',
      },
      {
        handle: '',
        platform: 'linkedin',
      },
      {
        handle: '',
        platform: 'instagram',
      },
      {
        handle: '',
        platform: 'facebook',
      },
      {
        handle: '',
        platform: 'github',
      },
      {
        handle: '',
        platform: 'youtube',
      },
      {
        handle: '',
        platform: 'tiktok',
      },
      {
        handle: '',
        platform: 'twitch',
      },
      {
        handle: '',
        platform: 'reddit',
      },
    ];
  }, []);

  const user = data?.me;
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    city: '',
    country: '',
    phone: '',
    secondaryEmail: '',
    website: '',
    company: '',
    title: '',
    socialMedia: initialSocialMedia,
  });

  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.name ?? '',
      bio: user.bio ?? '',
      city: user.location?.city ?? '',
      country: user.location?.country ?? '',
      phone: user.contactInfo?.phone ?? '',
      secondaryEmail: user.contactInfo?.secondaryEmail ?? '',
      website: user.contactInfo?.website ?? '',
      company: user.occupation?.company ?? '',
      title: user.occupation?.title ?? '',
      socialMedia:
        user.socialMedia?.length && user.socialMedia.length > 0
          ? user.socialMedia.map((s) => ({
              handle: s.handle ?? '',
              platform: s.platform ?? '',
            }))
          : initialSocialMedia,
    });
  }, [user, initialSocialMedia]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormError(null);
    setNameError(null);

    if (!formData.name.trim()) {
      setNameError('Name is required.');
      return;
    }

    setSaving(true);

    try {
      const input: UpdateUserInput = {
        name: formData.name.trim(),
        bio: formData.bio.trim() || null,
        location: {
          city: formData.city.trim() || null,
          country: formData.country.trim() || null,
        },
        contactInfo: {
          phone: formData.phone.trim() || null,
          secondaryEmail: formData.secondaryEmail.trim() || null,
          website: formData.website.trim() || null,
        },
        occupation: {
          company: formData.company.trim() || null,
          title: formData.title.trim() || null,
        },
        socialMedia: formData.socialMedia
          .filter((s) => s.handle.trim() !== '')
          .map((s) => ({
            handle: s.handle.trim(),
            platform: s.platform,
          })),
      };

      const { data } = await updateUser({
        variables: {
          input,
        },
      });

      if (data?.updateUser) {
        navigate('/profile');
      } else {
        setFormError('Something went wrong. Please try again.');
      }
    } catch (error: unknown) {
      setFormError((error as Error).message || 'Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>StageGate - Edit Profile</title>
        <meta name="description" content="Edit your profile information" />
      </Helmet>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Link
            to="/profile"
            className="flex items-center text-brand-600 hover:underline mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Edit Profile
          </h1>

          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-6 h-6 text-brand-500 animate-spin" />
              <span className="ml-2 text-gray-600 dark:text-gray-300">
                Loading your profile...
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6"
            >
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 shadow">
                    {user?.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl font-semibold text-white bg-brand-500">
                        {formData.name?.charAt(0).toUpperCase() ?? 'U'}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 mt-3">
                  <Link
                    to="/edit-profile-picture"
                    className="px-4 py-2 text-sm rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium transition cursor-pointer flex items-center justify-center"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Change Profile Picture
                  </Link>
                  {user?.profilePicture && (
                    <button
                      type="button"
                      className="px-4 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition cursor-pointer flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Profile Picture
                    </button>
                  )}
                </div>
              </div>
              <InputField
                id="name"
                label="Name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {nameError && <p className="text-sm text-red-500 mt-1">{nameError}</p>}
              <InputField
                id="bio"
                textArea
                label="Bio"
                type="text"
                value={formData.bio}
                onChange={handleChange}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  id="city"
                  label="City"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                />
                <InputField
                  type="text"
                  id="country"
                  label="Country"
                  onChange={handleChange}
                  value={formData.country}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  id="phone"
                  label="Phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <InputField
                  type="email"
                  id="secondaryEmail"
                  label="Secondary Email"
                  value={formData.secondaryEmail}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  type="text"
                  id="company"
                  label="Company"
                  value={formData.company}
                  onChange={handleChange}
                />
                <InputField
                  type="text"
                  id="title"
                  label="Title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <InputField
                id="website"
                label="Website"
                type="url"
                value={formData.website}
                onChange={handleChange}
              />

              <EditSocialMedia socialMedia={formData.socialMedia} setFormData={setFormData} />

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={saving || !formData.name.trim()}
                  className={`w-full px-6 py-2.5 font-semibold rounded-lg text-white transition-all ${
                    saving
                      ? 'bg-brand-400 cursor-not-allowed'
                      : 'bg-brand-500 hover:bg-brand-600 cursor-pointer'
                  }`}
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
                {formError && <p className="text-sm text-red-500 mt-3">{formError}</p>}
              </div>
            </form>
          )}
        </div>
      </main>
    </>
  );
};
