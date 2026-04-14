import { useState } from "react";
import styles from "./Header.module.css";
import { VscGrabber, VscClose } from "react-icons/vsc";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Header = () => {
  const { t } = useTranslation();
  const logotext = "DÁRIO.";

  const socialprofiles = {
    github: "https://github.com/DFRSfx",
    linkedin: "https://www.linkedin.com/in/d%C3%A1rio-soares-1395082b1/",
  };

  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("ovhidden");
  };

  const closeMenu = () => {
    if (isActive) {
      setActive(false);
      document.body.classList.remove("ovhidden");
    }
  };

  return (
    <header className={styles.siteHeader}>
      <div className={`d-flex align-items-center justify-content-between w-100 ${styles.headerInner}`}>
        {/* LADO ESQUERDO: Logo */}
        <Link to={t('routes.home')} className={styles.navAc} onClick={closeMenu} style={{ cursor: 'pointer' }}>
          {logotext}
        </Link>

        {/* LADO DIREITO: Navegação + Ferramentas agrupadas */}
        <div className={styles.rightGroup}>
          {/* Links de Navegação */}
          <nav className={`d-none d-lg-flex ${styles.desktopNav}`}>
            <Link to={t('routes.home')} onClick={closeMenu} className={styles.desktopNavLink}>{t('header.home')}</Link>
            <Link to={t('routes.portfolio')} onClick={closeMenu} className={styles.desktopNavLink}>{t('header.portfolio')}</Link>
            <Link to={t('routes.about')} onClick={closeMenu} className={styles.desktopNavLink}>{t('header.about')}</Link>
            <Link to={t('routes.experience')} onClick={closeMenu} className={styles.desktopNavLink}>{t('header.experience')}</Link>
            <Link to={t('routes.contact')} onClick={closeMenu} className={styles.desktopNavLink}>{t('header.contact')}</Link>
          </nav>

          {/* Ferramentas (Idioma, Tema e Botão Mobile) */}
          <div className={styles.toolsGroup}>
            <div className="d-none d-md-flex align-items-center" style={{ gap: '15px' }}>
              <LanguageSelector />
              <ThemeToggle />
            </div>
            <button
              className={`d-lg-none ${styles.menuButton}`}
              onClick={handleToggle}
              aria-label={isActive ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isActive}
            >
              {isActive ? <VscClose /> : <VscGrabber />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu only visible on smaller screens */}
      <div className={`d-lg-none ${styles.siteNavigation} ${isActive ? styles.menuOpened : ""}`}>
        <div className={`${styles.bgMenu} h-100`}>
          <div className={styles.menuWrapper}>
            <div className={`${styles.menuContainer} p-4`}>
              <div className={styles.mobileTools}>
                <LanguageSelector />
                <ThemeToggle />
              </div>
              <ul className={styles.theMenu}>
                <li className={styles.menuItem}>
                  <Link to={t('routes.home')} onClick={closeMenu} className="my-2">{t('header.home')}</Link>
                </li>
                <li className={styles.menuItem}>
                  <Link to={t('routes.portfolio')} onClick={closeMenu} className="my-2">{t('header.portfolio')}</Link>
                </li>
                <li className={styles.menuItem}>
                  <Link to={t('routes.about')} onClick={closeMenu} className="my-2">{t('header.about')}</Link>
                </li>
                <li className={styles.menuItem}>
                  <Link to={t('routes.experience')} onClick={closeMenu} className="my-2">{t('header.experience')}</Link>
                </li>
                <li className={styles.menuItem}>
                  <Link to={t('routes.contact')} onClick={closeMenu} className="my-2">{t('header.contact')}</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`${styles.menuFooter} d-flex flex-column flex-md-row justify-content-between align-items-start position-absolute w-100 p-4`}>
          <div className={`d-flex align-items-center ${styles.socialSection}`}>
            <span className={styles.followText}>Follow me</span>
            <a href={socialprofiles.github} aria-label="GitHub" className={styles.socialLinkItem}>
              <FaGithub />
              <span>Github</span>
            </a>
            <a href={socialprofiles.linkedin} aria-label="LinkedIn" className={styles.socialLinkItem}>
              <FaLinkedin />
              <span>LinkedIn</span>
            </a>
          </div>
          <p className="copyright m-0 mt-3">© {new Date().getFullYear()} DÁRIO.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;