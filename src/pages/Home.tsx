import styles from "./Home.module.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export const Home = () => {
  const { t, i18n } = useTranslation();

  const CV_PATH = i18n.language === 'pt' ? '/cv/CV_Dario_Soares_PT.pdf' : '/cv/CV_Dario_Soares_EN.pdf';

  return (
    <HelmetProvider>
      <section id="home" className={styles.homeSection}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t('home.meta.title')}</title>
          <meta name="description" content={t('home.meta.description')} />
        </Helmet>

        <div className={styles.introSec}>
          <motion.div
            className={styles.textContainer}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className={styles.greeting}>{t('home.greeting')}</h1>
            <h2 className={styles.mainTitle}>
              <Typewriter
                options={{
                  strings: [
                    t('home.title1'),
                    t('home.title2'),
                    t('home.title3'),
                    t('home.title4'),
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 10,
                  delay: 50,
                }}
              />
            </h2>
            <p className={styles.description}>{t('home.description')}</p>

            <div className={styles.btnWrapper}>
              <a href="#portfolio" onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('portfolio');
                if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }} aria-label="View my portfolio">
                <div className={`${styles.acBtn} ${styles.btnSolid}`}>
                  {t('home.portfolioButton')}
                </div>
              </a>

              <a href={CV_PATH} download aria-label="Download my CV" className={styles.cvLink}>
                {t('home.cvButton', 'Download CV')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </HelmetProvider>
  );
};