import styles from "./OnePage.module.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const OnePage = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: "Dashboard Analytics",
      challenge: "Cliente precisava visualizar 100K+ registros de dados em tempo real sem lag.",
      process: "Implementei virtualização de lista, caching inteligente e WebSockets para updates em tempo real.",
      result: "Redução de 85% no tempo de carregamento. Sistema agora processa updates de 1000 registros/segundo.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    },
    {
      title: "E-commerce Platform",
      challenge: "Taxa de conversão baixa (1.2%) devido a checkout lento e confuso.",
      process: "Redesenhei fluxo de checkout para 2 passos, integrei Stripe e implementei one-click purchase.",
      result: "Taxa de conversão aumentou para 3.8%. Tempo médio de checkout reduziu de 4min para 45s.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    },
    {
      title: "Sistema CRM Interno",
      challenge: "Equipe de vendas perdia 3h/dia em tarefas manuais de gestão de leads.",
      process: "Desenvolvi automação de pipeline, integração com email e dashboard centralizado.",
      result: "Equipe economiza 15h/semana. ROI positivo em 2 meses. 40% aumento em conversão de leads.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    },
  ];

  const tools = [
    "React", "TypeScript", "Next.js", "Node.js",
    "PostgreSQL", "MongoDB", "REST APIs", "GraphQL",
    "Git", "Docker", "AWS", "Vercel"
  ];

  return (
    <HelmetProvider>
      <div className={styles.onePage}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Dário Soares - Full Stack Developer</title>
          <meta name="description" content="Full Stack Developer especializado em construir produtos web que resolvem problemas reais de negócio" />
        </Helmet>

        {/* Hero Section */}
        <section id="home" className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Dário Soares</h1>
            <p className={styles.heroSubtitle}>
              Full Stack Developer especializado em construir produtos web que resolvem problemas reais de negócio.
            </p>
            <div className={styles.heroCta}>
              <a href="#projects" className={styles.ctaButton}>Ver Projetos</a>
              <a href="#contact" className={styles.ctaButtonSecondary}>Contacto</a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={styles.about}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>O Que Eu Resolvo</h2>
            <p className={styles.aboutText}>
              Empresas perdem dinheiro com sistemas lentos, interfaces confusas e processos manuais.
              Eu construo aplicações rápidas, intuitivas e automatizadas que aumentam conversão e economizam tempo.
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={styles.projects}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Projetos</h2>
            <div className={styles.projectsGrid}>
              {projects.map((project, i) => (
                <div key={i} className={styles.projectCard}>
                  <div className={styles.projectImage}>
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className={styles.projectContent}>
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className={styles.tools}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Ferramentas</h2>
            <div className={styles.toolsList}>
              {tools.map((tool, i) => (
                <span key={i} className={styles.tool}>{tool}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={styles.contact}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Contato</h2>
            <p className={styles.contactInfo}>
              <strong>Email:</strong> <a href="mailto:dario.soares@email.com">dario.soares@email.com</a>
            </p>
            <div className={styles.socialLinks}>
              <a href="https://github.com/dariosoares" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/dariosoares" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </section>
      </div>
    </HelmetProvider>
  );
};
