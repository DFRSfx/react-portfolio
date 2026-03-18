import styles from "./About.module.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import BallCanvasGrid from "../components/TechBall";
import { motion } from "framer-motion";

export const About = () => {
  const { t } = useTranslation();

  const groupedTools = {
    frontend: [
      { name: "React", icon: "/images/icons/react.svg", color: "#20232a" },
      { name: "TypeScript", icon: "/images/icons/typescript.svg", color: "#007acc" },
      { name: "JavaScript", icon: "/images/icons/javascript.svg", color: "#f7df1e" },
      { name: "Tailwind CSS", icon: "/images/icons/tailwind.svg", color: "#1a1a2e" },
      { name: "Bootstrap", icon: "/images/icons/bootstrap.svg", color: "#7952b3" },
      { name: "Pug", icon: "/images/icons/pug.svg", color: "#1a1a2e" }
    ],
    backend: [
      { name: "Node.js", icon: "/images/icons/nodejs.svg", color: "#1a1a2e" },
      { name: "PHP", icon: "/images/icons/php.svg", color: "#1a1a2e" },
      { name: "Python", icon: "/images/icons/python.svg", color: "#1a1a2e" },
      { name: "C#", icon: "/images/icons/csharp.svg", color: "#1a1a2e" },
      { name: "C++", icon: "/images/icons/cplusplus.svg", color: "#1a1a2e" },
      { name: "Laravel", icon: "/images/icons/laravel.svg", color: "#1a1a2e" }
    ],
    database: [
      { name: "MySQL", icon: "/images/icons/mysql.svg", color: "#1a1a2e" }
    ],
    otherTools: [
      { name: "Git", icon: "/images/icons/git.svg", color: "#1a1a2e" },
      { name: "AWS", icon: "/images/icons/aws.svg", color: "#e0e0e0" },
      { name: "Vercel", icon: "/images/icons/vercel-dark.svg", lightIcon: "/images/icons/vercel.svg", color: "#1a1a2e" }
    ]
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <HelmetProvider>
      <Container className={styles.aboutContainer}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t('about.meta.title')}</title>
          <meta name="description" content={t('about.meta.description')} />
        </Helmet>

        <div className={styles.aboutLayout}>
          
          {/* Top Hero Quote */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={fadeInUp}
            className={styles.heroQuoteContainer}
          >
            <h2 className={styles.heroQuote}>{t('about.role')}</h2>
          </motion.div>

          {/* Separator */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.8 }}
            variants={fadeInUp}
            className={styles.separatorContainer}
          >
            <hr className={styles.separatorLine} />
          </motion.div>

          {/* Editorial Content Grid */}
          <div className={styles.aboutContentGrid}>
            
            {/* Left: Greeting */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInUp}
              className={styles.greetingSide}
            >
              <h1 className={styles.greetingTitle}>{t('about.title', 'Olá, sou o Dário Soares.')}</h1>
            </motion.div>

            {/* Right: Description & Problem */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInUp}
              className={styles.descriptionSide}
            >
              <p className={styles.descriptionText}>{t('about.description')}</p>
              
              <div className={styles.problem}>
                <h2 className={styles.sectionTitle}>{t('about.problemTitle')}</h2>
                <p className={styles.problemText}>
                  {t('about.problemText')}
                </p>
              </div>
            </motion.div>

          </div>

          {/* Full-width Tools Section */}
          <motion.section 
            className={styles.toolsSection}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={staggerContainer}
          >
            <h2 className={styles.toolsMainTitle}>{t('about.toolsTitle')}</h2>
            <div className={styles.toolsFlex}>
              {Object.entries({
                frontend: groupedTools.frontend,
                backend: groupedTools.backend,
                database: groupedTools.database,
                otherTools: groupedTools.otherTools
              }).map(([categoryKey, toolsGroup]) => (
                <motion.div key={categoryKey} className={styles.toolCategoryColumn} variants={fadeInUp}>
                  <h3 className={styles.categoryTitle}>{t(`about.categories.${categoryKey}`)}</h3>
                  <BallCanvasGrid tools={toolsGroup} />
                </motion.div>
              ))}
            </div>
          </motion.section>

        </div>

      </Container>
    </HelmetProvider>
  );
};
