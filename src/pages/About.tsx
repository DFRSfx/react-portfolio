import styles from "./About.module.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const About = () => {
  const { t } = useTranslation();

  const tools = [
    "React", "TypeScript", "Express", "Node.js",
    "MySQL", "Laravel", "PUG", "Python", "PHP", "C#", "C++", "REST APIs",
    "Git", "AWS", "Vercel"
  ];

  return (
    <HelmetProvider>
      <Container className={styles.aboutContainer}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t('about.meta.title')}</title>
          <meta name="description" content={t('about.meta.description')} />
        </Helmet>

        <div className={styles.aboutLayout}>
          {/* Lado Esquerdo - Nome e Descrição */}
          <div className={styles.leftSide}>
            <h1 className={styles.name}>Dário Soares</h1>
            <p className={styles.role}>Full Stack Developer especializado em construir produtos web que resolvem problemas reais de negócio.</p>
          </div>

          {/* Lado Direito - O Que Eu Resolvo e Ferramentas */}
          <div className={styles.rightSide}>
            {/* O Que Eu Resolvo */}
            <section className={styles.problem}>
              <h2 className={styles.sectionTitle}>O Que Eu Resolvo</h2>
              <p className={styles.problemText}>
                Empresas perdem dinheiro com sistemas lentos, interfaces confusas e processos manuais.
                Eu construo aplicações rápidas, intuitivas e automatizadas que aumentam conversão e economizam tempo.
              </p>
            </section>

            {/* Ferramentas */}
            <section className={styles.tools}>
              <h2 className={styles.sectionTitle}>Ferramentas</h2>
              <div className={styles.toolsList}>
                {tools.map((tool, i) => (
                  <span key={i} className={styles.tool}>{tool}</span>
                ))}
              </div>
            </section>
          </div>
        </div>

      </Container>
    </HelmetProvider>
  );
};
