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
  const socialprofils = {
    github: "https://github.com/dariosoares",
    linkedin: "https://linkedin.com/in/dariosoares",
    instagram: "https://instagram.com/dariosoares",
  };

  return (
    <div className={styles.stickFollowIcon}>
      <ul>
        {Object.entries(socialprofils).map(([platform, url]) => {
          const IconComponent = ICON_MAPPING[platform] || ICON_MAPPING.default;
          return (
            <li key={platform}>
              <a href={url}>
                <IconComponent />
              </a>
            </li>
          );
        })}
      </ul>
      <p>Segue-me</p>
    </div>
  );
};
