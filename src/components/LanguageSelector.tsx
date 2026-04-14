import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./LanguageSelector.module.css";

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "pt", fullLabel: "Português" },
    { code: "en", fullLabel: "English" },
  ];

  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const activeLang = i18n.resolvedLanguage || i18n.language;
    const detected = languages.find((lang) => activeLang.startsWith(lang.code));
    return detected || languages[1];
  });

  useEffect(() => {
    const activeLang = i18n.resolvedLanguage || i18n.language;
    const detected = languages.find((lang) => activeLang.startsWith(lang.code));
    setCurrentLanguage(detected || languages[1]);
  }, [i18n.resolvedLanguage, i18n.language]);

  const changeLanguage = (code: string) => {
    const currentPath = location.pathname;
    const routeKeys = ["home", "about", "portfolio", "contact"];
    let currentRouteKey = "home";

    for (const key of routeKeys) {
      if (currentPath === t(`routes.${key}`)) {
        currentRouteKey = key;
        break;
      }
    }

    i18n.changeLanguage(code);
    
    // Get the translated path for the new language
    const newPath = i18n.getFixedT(code)(`routes.${currentRouteKey}`);
    navigate(newPath, { replace: true });
    
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <button
        className={styles.triggerBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Language"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{currentLanguage.code.toUpperCase()}</span>
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          className={isOpen ? styles.iconOpen : styles.icon}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`${styles.optionBtn} ${i18n.language === lang.code ? styles.active : ''}`}
              onClick={() => changeLanguage(lang.code)}
              role="option"
              aria-selected={i18n.language === lang.code}
            >
              <span className={styles.langCode}>{lang.code.toUpperCase()}</span>
              <span className={styles.langName}>{lang.fullLabel}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;