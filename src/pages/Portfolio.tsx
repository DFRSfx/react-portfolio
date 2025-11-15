import styles from "./Portfolio.module.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const Portfolio = () => {
  const { t } = useTranslation();
  const dataportfolio = [
    {
      img: "/images/projects/biblioteca-islagaia.pt.webp",
      title: 'Biblioteca ISLA Gaia',
      description: 'Aplicação web para gestão de biblioteca escolar, permitindo gestão de empréstimos e devolução de livros, pesquisa de títulos e gestão de utilizadores.',
      technologies: ["React", "Node.js", "Express", "TypeScript", "Tailwind CSS", "MySQL"],
      link: "https://biblioteca-islagaia.pt",
      github: "#",
    },
    {
      img: "/images/projects/arteemponto.pt.webp",
      title: 'Arte em Ponto Ecommerce',
      description: 'Plataforma de comércio eletrónico para venda de criações únicas em croche, com funcionalidades de carrinho de compras, pagamento seguro e gestão de inventário.',
      technologies: ["React", "Node.js", "Express", "TypeScript", "Tailwind CSS", "Stripe", "MySQL"],
      link: "#",
      github: "#",
    },
    {
      img: "/images/projects/jf-sermonde.pt.webp",
      title: 'Junta de Freguesia de Sermonde',
      description: 'Website institucional para a Junta de Freguesia de Sermonde, com informações sobre serviços, eventos e contactos.',
      technologies: ["React", "Node.js", "Express", "TypeScript", "Tailwind CSS", "MySQL"],
      link: "#",
      github: "#",
    },
  ];

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t('portfolio.meta.title')}</title>
          <meta name="description" content={t('portfolio.meta.description')} />
        </Helmet>
        <div className="text-center mb-5">
          <p className="text-uppercase tracking-wider mb-2" style={{ color: 'var(--secondary-color)', fontSize: '14px', fontWeight: '600' }}>
            {t('portfolio.subtitle')}
          </p>
          <h1 className="display-4 mb-4">{t('portfolio.pageTitle')}</h1>
          <p className="mx-auto" style={{ maxWidth: '700px', color: 'var(--text-color)', opacity: '0.8' }}>
            {t('portfolio.description')}
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {dataportfolio.map((project, i) => (
            <div key={i} className={styles.projectCard}>
              <div className={styles.projectImageWrapper}>
                <img src={project.img} alt={project.title} className={styles.projectImage} />
                <div className={styles.projectOverlay}>
                  <div className={styles.projectLinks}>
                    <a href={project.github} className={styles.iconLink} title={t('portfolio.viewCode')}>
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </a>
                    <a href={project.link} className={styles.iconLink} title={t('portfolio.viewDemo')}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.projectTech}>
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </HelmetProvider>
  );
};
