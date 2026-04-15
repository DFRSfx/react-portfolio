import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container } from "react-bootstrap";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { useTheme } from "../context/ThemeContext";
import { TECH_ICONS, getTechIconUrl } from "../utils/techIcons";
import styles from "./Portfolio.module.css";

// Extract SVGs to keep your main component clean (or use react-icons)
const BackIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const GithubIcon = () => (
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

export const WorkDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const dataportfolio = usePortfolioData();
  const { theme } = useTheme();

  const project = dataportfolio.find((p) => p.id === id);

  if (!project) {
    return (
      <Container className="pt-5 mt-5 text-center" style={{ minHeight: "100vh" }}>
        <h2>{t("workDetails.notFound")}</h2>
        <Link to={t("routes.portfolio")} className="btn btn-outline-dark mt-3">
          {t("workDetails.backToPortfolio")}
        </Link>
      </Container>
    );
  }

  return (
    <HelmetProvider>
      <Container className={`pt-5 mt-4 ${styles.detailsContainer}`}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{project.title} | {t("portfolio.meta.title")}</title>
          <meta name="description" content={project.description} />
        </Helmet>

        <div className="mb-5 pb-4">
          <Link to={t("routes.portfolio")} className={styles.backLink}>
            <BackIcon />
            {t("workDetails.backToPortfolio")}
          </Link>

          <h1 className={styles.detailsTitle}>{project.title}</h1>

          <div className={styles.imageWrapper}>
            <img
              src={project.img}
              alt={`Preview of ${project.title}`}
              className={styles.detailsImage}
              decoding="async"
              loading="eager"
            />
          </div>

          <div className={styles.detailsGrid}>
            <section>
              <h3 className={styles.sectionTitle}>{t("workDetails.aboutProject")}</h3>
              <p className={styles.projectDescriptionText}>
                {project.description}
              </p>
            </section>

            <aside className={styles.sidebar}>
              <h4 className={styles.sidebarTitle}>{t("workDetails.technologies")}</h4>
              <div className={styles.techStackDetails}>
                {project.technologies.map((tech, idx) => {
                  const icon = TECH_ICONS[tech];
                  return (
                    <span key={idx} className={styles.techBadge}>
                      {icon && (
                        <img
                          src={getTechIconUrl(icon, theme)}
                          alt=""
                          aria-hidden="true"
                          width={16}
                          height={16}
                          className={styles.techBadgeIcon}
                        />
                      )}
                      {tech}
                    </span>
                  );
                })}
              </div>

              <h4 className={styles.sidebarTitle}>{t("workDetails.links")}</h4>
              <div className={styles.links}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className={styles.iconLink} aria-label={`${project.title} GitHub Repository`}>
                    <GithubIcon />
                  </a>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className={styles.iconLink} aria-label={`Visit ${project.title} live site`}>
                    <ExternalLinkIcon />
                  </a>
                )}
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </HelmetProvider>
  );
};