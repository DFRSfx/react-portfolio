import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import styles from "./Experience.module.css";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

const experienceKeys = [
  { role: "experience.items.item1.role", company: "experience.items.item1.company", location: "experience.items.item1.location", date: "experience.items.item1.date", description: "experience.items.item1.description", current: true },
  { role: "experience.items.item2.role", company: "experience.items.item2.company", location: "experience.items.item2.location", date: "experience.items.item2.date", description: "experience.items.item2.description", current: false },
  { role: "experience.items.item3.role", company: "experience.items.item3.company", location: "experience.items.item3.location", date: "experience.items.item3.date", description: "experience.items.item3.description", current: false },
];

export const Experience = () => {
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("experience.meta.title")}</title>
        <meta name="description" content={t("experience.meta.description")} />
      </Helmet>

      <Container>
        <div className={styles.wrapper}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3, margin: "2000px 0px 0px 0px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className={styles.title}>{t("experience.title")}</h1>
            <p className={styles.subtitle}>{t("experience.subtitle")}</p>
          </motion.div>

          <div className={styles.timeline}>
            <div className={styles.timelineLine} aria-hidden="true" />

            <motion.div
              className={styles.itemList}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1, margin: "2000px 0px 0px 0px" }}
            >
              {experienceKeys.map((item, index) => (
                <motion.div key={index} className={styles.itemWrapper} variants={cardVariants}>
                  <div className={styles.dotWrapper} aria-hidden="true">
                    {item.current && <span className={styles.dotPulse} />}
                    <span className={styles.dot} />
                  </div>

                  <div className={styles.card}>
                    <div className={styles.cardTop}>
                      <h2 className={styles.role}>{t(item.role)}</h2>
                      <span className={styles.dateBadge}>
                        {t(item.date)}
                        {item.current && (
                          <> · <span className={styles.currentLabel}>{t("experience.current")}</span></>
                        )}
                      </span>
                    </div>

                    <div className={styles.cardMeta}>
                      <span className={styles.company}>{t(item.company)}</span>
                      <span className={styles.separator} aria-hidden="true">·</span>
                      <span className={styles.location}>{t(item.location)}</span>
                    </div>

                    <p className={styles.description}>{t(item.description)}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </HelmetProvider>
  );
};
