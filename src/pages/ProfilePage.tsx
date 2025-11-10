import { Helmet } from 'react-helmet';
import { Link } from 'react-router';
import { useQuery } from '@apollo/client/react';
import { Building2, Loader2, Mail, MapPin, Pencil, Phone, User } from 'lucide-react';

import { ME } from '@/graphql';
import { useAppSelector } from '@/hooks';

export const ProfilePage = () => {
  const { token } = useAppSelector((state) => state.auth);
  const { data, loading, error } = useQuery(ME, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const user = data?.me;

  const formatField = (value?: string | null, fallback = 'Not provided') => {
    if (!value || value.trim() === '') {
      return <span className="text-gray-500 dark:text-gray-400 italic">{fallback}</span>;
    }
    return <span>{value}</span>;
  };

  const renderLocation = (city?: string | null, country?: string | null) => {
    if (city && country) return `${city}, ${country}`;
    if (city) return city;
    if (country) return country;
    return 'Not Provided';
  };

  return (
    <>
      <Helmet>
        <title>StageGate - Profile</title>
        <meta name="description" content="Your profile page" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-brand-100 dark:bg-brand-900/30">
                <User className="w-7 h-7 text-brand-600 dark:text-brand-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Profile</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  View and manage your StageGate account information.
                </p>
              </div>
            </div>

            <Link
              to="/edit-profile"
              className="mt-6 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium shadow-sm transition-all cursor-pointer"
            >
              <Pencil className="w-4 h-4" />
              Edit Profile
            </Link>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-6 h-6 text-brand-500 animate-spin" />
              <span className="ml-2 text-gray-600 dark:text-gray-300">
                Loading your profile...
              </span>
            </div>
          )}

          {!loading && (error || !user) && (
            <div className="text-center text-red-500 py-200">
              <p>Failed to load profile. Please try again later.</p>
            </div>
          )}

          {user && !loading && !error && (
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-8 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4" /> {user.email}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 shrink-0" />
                    {formatField(renderLocation(user.location?.city, user.location?.country))}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-8">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Bio
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {formatField(user.bio)}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/40">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Occupation
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Title:</span>{' '}
                    {formatField(user.occupation?.title)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Company:</span>{' '}
                    {formatField(user.occupation?.company)}
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/40">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-brand-600" />
                    Contact Info
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Phone:</span>{' '}
                    {formatField(user.contactInfo?.phone)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Website:</span>{' '}
                    {user.contactInfo?.website ? (
                      <a
                        href={user.contactInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:underline"
                      >
                        {user.contactInfo.website}
                      </a>
                    ) : (
                      formatField('')
                    )}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Secondary Email:</span>{' '}
                    {formatField(user.contactInfo?.secondaryEmail)}
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/40">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Social Media
                </h3>
                {user.socialMedia && user.socialMedia.length > 0 ? (
                  <ul className="space-y-2">
                    {user.socialMedia.map((s, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700/50 pb-2 last:border-0"
                      >
                        <span className="capitalize text-gray-700 dark:text-gray-300">
                          {s.platform}
                        </span>
                        <a
                          href={s.handle}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-600 hover:underline"
                        >
                          {s.handle}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">
                    No social media accounts linked yet.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
