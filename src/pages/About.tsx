import { useState, useEffect } from "react";
import styles from "./About.module.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import BallCanvas from "../components/TechBall";

export const About = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const tools = [
    { name: "React", icon: "/icons/react.svg", color: "#1a1a2e" },
    { name: "TypeScript", icon: "/icons/typescript.svg", color: "#1a1a2e" },
    { name: "JavaScript", icon: "/icons/javascript.svg", color: "#1a1a2e" },
    { name: "Node.js", icon: "/icons/nodejs.svg", color: "#1a1a2e" },
    { name: "PHP", icon: "/icons/php.svg", color: "#1a1a2e" },
    { name: "Python", icon: "/icons/python.svg", color: "#1a1a2e" },
    { name: "C#", icon: "/icons/csharp.svg", color: "#1a1a2e" },
    { name: "C++", icon: "/icons/cplusplus.svg", color: "#1a1a2e" },
    { name: "MySQL", icon: "/icons/mysql.svg", color: "#1a1a2e" },
    { name: "Laravel", icon: "/icons/laravel.svg", color: "#1a1a2e" },
    { name: "Git", icon: "/icons/git.svg", color: "#1a1a2e" },
    { name: "AWS", icon: "/icons/aws.svg", color: "#1a1a2e" },
    { name: "Vercel", icon: "/icons/vercel.svg", color: "#1a1a2e" },
    { name: "Pug", icon: "/icons/pug.svg", color: "#1a1a2e" },
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
          <div className={styles.leftSide}>
            <h1 className={styles.name}>Dário Soares</h1>
            <p className={styles.role}>Full Stack Developer especializado em construir produtos web que resolvem problemas reais de negócio.</p>
          </div>

          <div className={styles.rightSide}>
            <section className={styles.problem}>
              <h2 className={styles.sectionTitle}>O Que Eu Resolvo</h2>
              <p className={styles.problemText}>
                Empresas perdem dinheiro com sistemas lentos, interfaces confusas e processos manuais.
                Eu construo aplicações rápidas, intuitivas e automatizadas que aumentam conversão e economizam tempo.
              </p>
            </section>

            <section className={styles.tools}>
              <h2 className={styles.sectionTitle}>Ferramentas</h2>
              
              {isMobile ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
                  {tools.map((tool) => (
                    <div key={tool.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", width: "60px" }}>
                      <img src={tool.icon} alt={tool.name} style={{ width: "44px", height: "44px", objectFit: "contain" }} />
                      <span style={{ fontSize: "0.65rem", fontWeight: 600, opacity: 0.7, textAlign: "center" }}>{tool.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
                  {tools.map((tool) => (
                    <div key={tool.name} title={tool.name}>
                      <BallCanvas icon={tool.icon} color={tool.color} />
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>

      </Container>
    </HelmetProvider>
  );
};