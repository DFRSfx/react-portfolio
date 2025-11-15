import { useState } from "react";
import styles from "./Header.module.css";
import { VscGrabber, VscClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const logotext = "DÁRIO";
  const socialprofils = {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  };

  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("ovhidden");
  };

  return (
    <>
      <header className={`fixed-top ${styles.siteHeader}`}>
        <div className="d-flex align-items-center justify-content-between">
          <Link  className={`navbar-brand ${styles.navAc}`} to="/">
            {logotext}
          </Link>
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
                  <Link  onClick={handleToggle} to="/" className="my-3">{t('header.home')}</Link>
                  </li>
                  <li className={styles.menuItem}>
                    <Link  onClick={handleToggle} to="/portfolio" className="my-3">{t('header.portfolio')}</Link>
                  </li>
                  <li className={styles.menuItem}>
                  <Link onClick={handleToggle} to="/about" className="my-3">{t('header.about')}</Link>
                  </li>
                  <li className={styles.menuItem}>
                  <Link onClick={handleToggle} to="/contact" className="my-3">{t('header.contact')}</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`${styles.menuFooter} d-flex flex-column flex-md-row justify-content-between align-items-md-center position-absolute w-100 p-3`}>
            <div className="d-flex">
            <a href={socialprofils.github}>Github</a>
            <a href={socialprofils.linkedin}>LinkedIn</a>
            <a href={socialprofils.twitter}>Twitter</a>
            </div>
            <p className="copyright m-0">© 2024 {logotext}</p>
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
