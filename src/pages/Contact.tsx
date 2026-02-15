import styles from "./Contact.module.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const EMAIL = "dariofrsoares@gmail.com";
const PHONE = "+351 919792186";
const CV_PATH = "/cv/dario-soares-cv.pdf";

export const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <div className={styles.contactPage}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t('contact.meta.title')}</title>
          <meta name="description" content={t('contact.meta.description')} />
        </Helmet>

        <header className={styles.pageHeader}>
          <span className={styles.pageSubtitle}>{t('contact.subtitle', 'Get in touch')}</span>
          <h1 className={styles.pageTitle}>{t('contact.pageTitle', 'Contact')}</h1>
          <p className={styles.pageDescription}>
            {t('contact.description', "Have a project in mind or want to work together? Drop me an email — I'll get back to you as soon as possible.")}
          </p>
        </header>

        {/* Two action cards */}
        <div className={styles.cardsGrid}>

          {/* Email card */}
          <a href={`mailto:${EMAIL}`} className={styles.actionCard}>
            <div className={styles.cardIcon}>
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className={styles.cardLabel}>{t('contact.emailLabel', 'Email')}</span>
            <h2 className={styles.cardTitle}>{EMAIL}</h2>
            <p className={styles.cardDescription}>
              {t('contact.emailDescription', "Best way to reach me. I typically reply within 24 hours.")}
            </p>
            <span className={styles.cardAction}>
              {t('contact.emailAction', 'Send Email')}
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>

          {/* CV card */}
          <a href={CV_PATH} download className={styles.actionCard}>
            <div className={styles.cardIcon}>
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21H19.44a2 2 0 001.94-1.515L22 17" />
              </svg>
            </div>
            <span className={styles.cardLabel}>{t('contact.cvLabel', 'Curriculum Vitae')}</span>
            <h2 className={styles.cardTitle}>{t('contact.cvTitle', 'Download CV')}</h2>
            <p className={styles.cardDescription}>
              {t('contact.cvDescription', "Full overview of my experience, education and technical skills.")}
            </p>
            <span className={styles.cardAction}>
              {t('contact.cvAction', 'Download PDF')}
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>

        </div>

        {/* Phone — secondary */}
        {PHONE && (
          <a href={`tel:${PHONE}`} className={styles.phoneRow}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {PHONE}
          </a>
        )}
      </div>
    </HelmetProvider>
  );
};
