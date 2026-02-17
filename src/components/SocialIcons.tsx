import styles from "./SocialIcons.module.css";
import {
  FaGithub,
  FaTwitter,
  FaFacebookF,
  FaLinkedin,
  FaYoutube,
  FaTwitch,
  FaInstagram,
  FaSnapchatGhost,
  FaTiktok,
  FaCircle
} from "react-icons/fa";
import { IconType } from "react-icons";
import { useTranslation } from "react-i18next";

const ICON_MAPPING: Record<string, IconType> = {
  default: FaCircle,
  facebook: FaFacebookF,
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  snapchat: FaSnapchatGhost,
  tiktok: FaTiktok,
  twitter: FaTwitter,
  twitch: FaTwitch,
  youtube: FaYoutube
};

export const SocialIcons = () => {
  const { t } = useTranslation();
  const socialprofils = {
    github: "https://github.com/DFRSfx",
    linkedin: "https://www.linkedin.com/in/d%C3%A1rio-soares-1395082b1/",
  };

  return (
    <div className={styles.stickFollowIcon}>
      <ul>
        {Object.entries(socialprofils).map(([platform, url]) => {
          const IconComponent = ICON_MAPPING[platform] || ICON_MAPPING.default;
          return (
            <li key={platform}>
              <a href={url} aria-label={`Visit my ${platform.charAt(0).toUpperCase() + platform.slice(1)} profile`}>
                <IconComponent />
              </a>
            </li>
          );
        })}
      </ul>
      <p>{t('socialIcons.followText')}</p>
    </div>
  );
};
