import { useState } from "react";
import styles from "./Header.module.css";
import { VscGrabber, VscClose } from "react-icons/vsc";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const logotext = "DÁRIO";

  const socialprofiles = {
    github: "https://github.com/DFRSfx",
    linkedin: "https://www.linkedin.com/in/d%C3%A1rio-soares-1395082b1/",
  };

  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("ovhidden");
  };

  const scrollToSection = (sectionId: string) => {
    handleToggle();
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  return (
    <>
      <header className={`fixed-top ${styles.siteHeader}`}>
        <div className="d-flex align-items-center justify-content-between">
          <a className={`navbar-brand ${styles.navAc}`} onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>
            {logotext}
          </a>
          <div className="d-flex align-items-center header-actions">
            <LanguageSelector />
            <ThemeToggle />
            <button className={`${styles.menuButton} ${styles.navAc}`} onClick={handleToggle}>
              {isActive ? <VscClose /> : <VscGrabber />}
            </button>
          </div>
        </div>

        <div className={`${styles.siteNavigation} ${isActive ? styles.menuOpened : ""}`}>
          <div className={`${styles.bgMenu} h-100`}>
            <div className={styles.menuWrapper}>
              <div className={`${styles.menuContainer} p-3`}>
                <ul className={styles.theMenu}>
                  <li className={`${styles.menuItem}`}>
                  <a onClick={() => scrollToSection('home')} className="my-3">{t('header.home')}</a>
                  </li>
                  <li className={styles.menuItem}>
                    <a onClick={() => scrollToSection('portfolio')} className="my-3">{t('header.portfolio')}</a>
                  </li>
                  <li className={styles.menuItem}>
                  <a onClick={() => scrollToSection('about')} className="my-3">{t('header.about')}</a>
                  </li>
                  <li className={styles.menuItem}>
                  <a onClick={() => scrollToSection('contact')} className="my-3">{t('header.contact')}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`${styles.menuFooter} d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center position-absolute w-100 p-3`}>
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
            <p className="copyright m-0">© {new Date().getFullYear()} {logotext}</p>
          </div>
        </div>
      </header>
      <div className={styles.brTop}></div>
      <div className={styles.brBottom}></div>
      <div className={styles.brLeft}></div>
      <div className={styles.brRight}></div>

    </>
  );
};

export default Header;
