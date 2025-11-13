import { Link } from 'react-router';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client/react';
import {
  Building2,
  Loader2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  User,
  Globe,
  AlertCircle,
} from 'lucide-react';

import { ME } from '@/graphql';
import { useAppSelector } from '@/hooks';
import { SOCIAL_PLATFORMS } from '@/utils';

const InfoCard = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 
               bg-gray-50/70 dark:bg-gray-800/40 hover:shadow-sm transition-all"
  >
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
      <Icon className="w-5 h-5 text-brand-600" />
      {title}
    </h3>
    {children}
  </motion.div>
);

export const ProfilePage = () => {
  const { token } = useAppSelector((state) => state.auth);
  const { data, loading, error } = useQuery(ME, {
    context: { headers: { Authorization: `Bearer ${token}` } },
  });

  const user = data?.me;

  const formatField = (value?: string | null, fallback = 'Not provided') =>
    !value?.trim() ? (
      <span className="text-gray-500 dark:text-gray-400 italic">{fallback}</span>
    ) : (
      <span>{value}</span>
    );

  const renderLocation = (city?: string | null, country?: string | null) => {
    if (city && country) return `${city}, ${country}`;
    if (city) return city;
    if (country) return country;
    return 'Not provided';
  };

  return (
    <>
      <Helmet>
        <title>StageGate - Profile</title>
        <meta
          name="description"
          content="View and manage your StageGate account information."
        />
      </Helmet>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-5xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-brand-100 dark:bg-brand-900/30">
                <User className="w-7 h-7 text-brand-600 dark:text-brand-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Profile</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your StageGate account details.
                </p>
              </div>
            </div>

            <Link
              to={!loading && !error && user ? '/edit-profile' : '#'}
              onClick={(e) => {
                if (loading || error || !user) e.preventDefault();
              }}
              className={`mt-6 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm transition-all focus:outline-none focus:ring-2 ${loading || error || !user ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed text-gray-200 dark:text-gray-400' : 'bg-brand-500 hover:bg-brand-600 text-white focus:ring-brand-500'}`}
            >
              <Pencil className="w-4 h-4" />
              {loading ? 'Loading...' : error ? 'Unavailable' : 'Edit Profile'}
            </Link>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-6 h-6 text-brand-500 animate-spin" />
              <span className="ml-2 text-gray-600 dark:text-gray-300">
                Loading your profile...
              </span>
            </div>
          )}

          {/* Error */}
          {!loading && (error || !user) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <AlertCircle className="w-8 h-8 text-red-500 mb-3" />
              <p className="text-red-500 font-medium mb-1">Failed to load profile.</p>
              <p className="text-gray-600 dark:text-gray-400">
                Please refresh the page or try again later.
              </p>
            </motion.div>
          )}

          {/* Content */}
          {user && !loading && !error && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-8 transition-all"
            >
              {/* Basic Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 shrink-0" />
                    {formatField(renderLocation(user.location?.city, user.location?.country))}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-8">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Bio
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {user.bio?.trim() ? (
                    user.bio
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400 italic">
                      No bio provided yet.
                    </span>
                  )}
                </p>
              </div>

              {/* Occupation & Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InfoCard title="Occupation" icon={Building2}>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Title:</span>{' '}
                    {formatField(user.occupation?.title)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Company:</span>{' '}
                    {formatField(user.occupation?.company)}
                  </p>
                </InfoCard>

                <InfoCard title="Contact Info" icon={Phone}>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Phone:</span>{' '}
                    {formatField(user.contactInfo?.phone)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Website:</span>{' '}
                    {user.contactInfo?.website ? (
                      <a
                        href={
                          user.contactInfo.website.startsWith('http')
                            ? user.contactInfo.website
                            : `https://${user.contactInfo.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:underline"
                      >
                        {user.contactInfo.website}
                      </a>
                    ) : (
                      formatField()
                    )}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Secondary Email:</span>{' '}
                    {formatField(user.contactInfo?.secondaryEmail)}
                  </p>
                </InfoCard>
              </div>

              {/* Social Media */}
              <InfoCard title="Social Media" icon={Globe}>
                {user.socialMedia && user.socialMedia.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {user.socialMedia.map((s, idx) => {
                      const platform = SOCIAL_PLATFORMS.find((p) => p.id === s.platform);
                      const Icon = platform?.icon || Globe;
                      const color = platform?.color || '6B7280';
                      const url = platform ? `${platform.prefix}${s.handle}` : s.handle;

                      return (
                        <li
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-lg border border-gray-100 
                                     dark:border-gray-700 bg-white dark:bg-gray-800/70 hover:shadow-sm transition-all"
                        >
                          <div className="flex items-center gap-3 truncate">
                            <Icon className="w-5 h-5 shrink-0" color={`#${color}`} />
                            <span className="text-gray-800 dark:text-gray-200 font-medium">
                              {platform?.name || s.platform}
                            </span>
                          </div>
                          {s.handle ? (
                            <a
                              href={url.startsWith('http') ? url : `https://${url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-brand-600 hover:underline font-medium truncate max-w-[60%] text-right"
                              title={`${platform?.name}: ${s.handle}`}
                            >
                              {s.handle}
                            </a>
                          ) : (
                            <span className="text-gray-500 dark:text-gray-400 italic">
                              Not provided
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">
                    No social media accounts linked yet.
                  </p>
                )}
              </InfoCard>
            </motion.section>
          )}
        </div>
      </main>
    </>
  );
};
