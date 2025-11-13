import {
  SiX,
  SiGithub,
  SiTiktok,
  SiTwitch,
  SiYoutube,
  SiFacebook,
  SiLinkedin,
  SiInstagram,
} from 'react-icons/si';

export const SOCIAL_PLATFORMS = [
  { id: 'x', name: 'X', icon: SiX, prefix: 'https://x.com/', color: '000000' },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: SiLinkedin,
    prefix: 'https://linkedin.com/in/',
    color: '0A66C2',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: SiInstagram,
    prefix: 'https://instagram.com/',
    color: 'E4405F',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: SiFacebook,
    prefix: 'https://facebook.com/',
    color: '1877F2',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: SiGithub,
    prefix: 'https://github.com/',
    color: '181717',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: SiYoutube,
    prefix: 'https://youtube.com/',
    color: 'FF0000',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: SiTiktok,
    prefix: 'https://tiktok.com/',
    color: '010101',
  },
  {
    id: 'twitch',
    name: 'Twitch',
    icon: SiTwitch,
    prefix: 'https://twitch.tv/',
    color: '9146FF',
  },
];
