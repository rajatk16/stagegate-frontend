/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from 'react';

import { InputField } from './InputField';
import { SOCIAL_PLATFORMS } from '@/utils';

interface SocialEntry {
  id?: string;
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

  const handleChange = useCallback(
    (platformId: string, value: string) => {
      setFormData((prev: any) => {
        const updated = [...(prev.socialMedia || [])];
        const normalized = normalizeHandle(value);

        const existing = updated.find((s) => s.platform === platformId);
        if (existing) existing.handle = normalized;
        else
          updated.push({ id: crypto.randomUUID(), platform: platformId, handle: normalized });

        return { ...prev, socialMedia: updated };
      });
    },
    [setFormData],
  );

  // Map handles for quick lookup
  const handleMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const s of socialMedia) map[s.platform] = s.handle;
    return map;
  }, [socialMedia]);

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Social Media</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SOCIAL_PLATFORMS.map((platform) => {
          const handle = handleMap[platform.id] || '';
          const fullUrl = handle ? `${platform.prefix}${handle}` : '';

          return (
            <div key={platform.id} className="flex flex-col">
              <InputField
                type="text"
                value={handle}
                label={platform.name}
                id={`handle-${platform.id}`}
                placeholder={`Enter your ${platform.name} handle`}
                onChange={(e) => handleChange(platform.id, e.target.value)}
                style={{ borderLeft: `4px solid #${platform.color}` }}
              />
              {fullUrl && (
                <a
                  href={fullUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-xs text-brand-600 hover:underline mt-1 flex items-center gap-1"
                >
                  <span className="truncate">{platform.prefix + handle}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7h5m0 0v5m0-5L10 17"
                    />
                  </svg>
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
