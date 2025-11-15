import styles from "./About.module.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const About = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: "Dashboard Analytics",
      challenge: "Cliente precisava visualizar 100K+ registros de dados em tempo real sem lag.",
      process: "Implementei virtualização de lista, caching inteligente e WebSockets para updates em tempo real.",
      result: "Redução de 85% no tempo de carregamento. Sistema agora processa updates de 1000 registros/segundo.",
    },
    {
      title: "E-commerce Platform",
      challenge: "Taxa de conversão baixa (1.2%) devido a checkout lento e confuso.",
      process: "Redesenhei fluxo de checkout para 2 passos, integrei Stripe e implementei one-click purchase.",
      result: "Taxa de conversão aumentou para 3.8%. Tempo médio de checkout reduziu de 4min para 45s.",
    },
    {
      title: "Sistema CRM Interno",
      challenge: "Equipe de vendas perdia 3h/dia em tarefas manuais de gestão de leads.",
      process: "Desenvolvi automação de pipeline, integração com email e dashboard centralizado.",
      result: "Equipe economiza 15h/semana. ROI positivo em 2 meses. 40% aumento em conversão de leads.",
    },
  ];

  const tools = [
    "React", "TypeScript", "Next.js", "Node.js",
    "PostgreSQL", "MongoDB", "REST APIs", "GraphQL",
    "Git", "Docker", "AWS", "Vercel"
  ];

  return (
    <HelmetProvider>
      <Container className={styles.aboutContainer}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t('about.meta.title')}</title>
          <meta name="description" content={t('about.meta.description')} />
        </Helmet>

        {/* 1. Abertura Curta */}
        <section className={styles.opening}>
          <h1 className={styles.name}>Dário Soares</h1>
          <p className={styles.role}>Full Stack Developer especializado em construir produtos web que resolvem problemas reais de negócio.</p>
        </section>

        {/* 2. O Problema que Resolvo */}
        <section className={styles.problem}>
          <h2 className={styles.sectionTitle}>O Que Eu Resolvo</h2>
          <p className={styles.problemText}>
            Empresas perdem dinheiro com sistemas lentos, interfaces confusas e processos manuais.
            Eu construo aplicações rápidas, intuitivas e automatizadas que aumentam conversão e economizam tempo.
          </p>
        </section>

        {/* 3. Projetos */}
        <section className={styles.projects}>
          <h2 className={styles.sectionTitle}>Projetos</h2>
          {projects.map((project, i) => (
            <div key={i} className={styles.projectCard}>
              <h3 className={styles.projectTitle}>{project.title}</h3>

              <div className={styles.projectSection}>
                <strong>Desafio:</strong>
                <p>{project.challenge}</p>
              </div>

              <div className={styles.projectSection}>
                <strong>O que fiz:</strong>
                <p>{project.process}</p>
              </div>

              <div className={styles.projectSection}>
                <strong>Resultado:</strong>
                <p className={styles.result}>{project.result}</p>
              </div>
            </div>
          ))}
        </section>

        {/* 4. Ferramentas */}
        <section className={styles.tools}>
          <h2 className={styles.sectionTitle}>Ferramentas</h2>
          <div className={styles.toolsList}>
            {tools.map((tool, i) => (
              <span key={i} className={styles.tool}>{tool}</span>
            ))}
          </div>
        </section>

        {/* 5. Contato */}
        <section className={styles.contact}>
          <h2 className={styles.sectionTitle}>Contato</h2>
          <p className={styles.contactInfo}>
            <strong>Email:</strong> <a href="mailto:dario.soares@email.com">dario.soares@email.com</a>
          </p>
        </section>
      </Container>
    </HelmetProvider>
  );
};
