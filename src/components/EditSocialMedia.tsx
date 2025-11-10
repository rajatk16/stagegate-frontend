/* eslint-disable @typescript-eslint/no-explicit-any */
import { SOCIAL_PLATFORMS } from '@/utils/socialPlatforms';

interface SocialEntry {
  handle: string;
  platform: string;
}

interface Props {
  socialMedia: SocialEntry[];
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const EditSocialMedia = ({ socialMedia, setFormData }: Props) => {
  // Normalize the input handle
  const normalizeHandle = (handle: string) => {
    if (!handle) return '';
    return handle
      .trim()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/^@/, '')
      .split(/[/?#]/)[0];
  };

  const handleChange = (platformId: string, value: string) => {
    setFormData((prev: any) => {
      const updated = [...(prev.socialMedia || [])];
      const normalized = normalizeHandle(value);

      // Update or add the handle for the platform
      const existing = updated.find((s) => s.platform === platformId);
      if (existing) {
        existing.handle = normalized;
      } else {
        updated.push({ id: crypto.randomUUID(), platform: platformId, handle: normalized });
      }

      return { ...prev, socialMedia: updated };
    });
  };

  // Map handles for quick lookup
  const handleMap: Record<string, string> = {};
  socialMedia.forEach((s) => (handleMap[s.platform] = s.handle));

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Social Media</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SOCIAL_PLATFORMS.map((platform) => {
          const handle = handleMap[platform.id] || '';
          const fullUrl = handle ? `${platform.prefix}${handle}` : '';

          return (
            <div key={platform.id} className="flex flex-col">
              <label
                htmlFor={`handle-${platform.id}`}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {platform.name}
              </label>

              <input
                id={`handle-${platform.id}`}
                type="text"
                value={handle}
                placeholder={`Enter your ${platform.name} handle`}
                onChange={(e) => handleChange(platform.id, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                           rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
                           focus:ring-2 focus:ring-brand-500 focus:border-brand-500 
                           transition-colors"
                style={{ borderLeft: `4px solid #${platform.color}` }}
              />

              {fullUrl && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                  Preview:{' '}
                  <a
                    href={fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-600 hover:underline"
                  >
                    {fullUrl}
                  </a>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
