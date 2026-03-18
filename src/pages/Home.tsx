import styles from "./Home.module.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const { t, i18n } = useTranslation();

  const CV_PATH = i18n.language === 'pt' ? '/cv/CV_Dario_Soares_PT.pdf' : '/cv/CV_Dario_Soares_EN.pdf';

  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t('home.meta.title')}</title>
          <meta name="description" content={t('home.meta.description')} />
        </Helmet>
        <div className={`${styles.introSec} d-block d-lg-flex align-items-center`}>
          <div
            className={`${styles.hBgImage} order-1 order-lg-2`}
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1498050108023-c5249f4df085)` }}
          ></div>
          <div className={`${styles.text} order-2 order-lg-1 d-lg-flex justify-content-center`}>
            <div className="align-self-center">
              <div className={`${styles.intro} mx-auto`}>
                <h2 className="mb-1x">{t('home.greeting')}</h2>
                <h1 className="fluidz-48 mb-1x">
                  <Typewriter
                    options={{
                      strings: [
                        t('home.title1'),
                        t('home.title2'),
                        t('home.title3'),
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 10,
                    }}
                  />
                </h1>
                <p className="mb-1x">{t('home.description')}</p>

                {/* ALTERAÇÃO AQUI: Adicionei styles.btnWrapper */}
                <div className={`${styles.btnWrapper} pb-5`}>
                  <a href="#portfolio" onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('portfolio');
                    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }} aria-label="View my portfolio">
                    <div id="button_p" className={`${styles.acBtn} ${styles.btnSolid} btn`}>
                      {t('home.portfolioButton')}
                    </div>
                  </a>
                  <a href="#contact" onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }} aria-label="Go to contact section">
                    <div id="button_h" className={`${styles.acBtn} ${styles.btnOutline} btn`}>
                      {t('home.contactButton')}
                    </div>
                  </a>
                  <a href={CV_PATH} download aria-label="Download my CV">
                    <div className={`${styles.acBtn} ${styles.btnOutline} btn`}>
                      {t('home.cvButton', 'Download CV')}
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};