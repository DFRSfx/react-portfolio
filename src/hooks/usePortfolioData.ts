import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export interface Project {
  id: string;
  img: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export const usePortfolioData = () => {
  const { t, i18n } = useTranslation();

  // useMemo ensures this array is only recalculated when the language changes.
  // It stops React from creating a new array reference on every single component render.
  const dataportfolio: Project[] = useMemo(() => {

    return [
      {
        id: "biblioteca-islagaia",
        // Dynamic image loading based on user's selected language
        // Make sure you have both .pt.webp and .en.webp in your public folder!
        img: `/images/projects/biblioteca-islagaia.pt.webp`,
        title: t('portfolio.projects.project1.title'),
        description: t('portfolio.projects.project1.description'),
        technologies: ["React", "Node.js", "Express", "TypeScript", "Tailwind CSS", "MySQL"],
        link: "https://biblioteca-islagaia.pt",
        github: "https://github.com/DFRSfx/ISLAGaia-Library-Showcase",
      },
      {
        id: "arteemponto",
        img: `/images/projects/arteemponto.pt.webp`,
        title: t('portfolio.projects.project2.title'),
        description: t('portfolio.projects.project2.description'),
        technologies: ["React", "Node.js", "Express", "TypeScript", "Tailwind CSS", "Stripe", "MySQL"],
        link: "https://arteemponto.pt",
      },
      {
        id: "jf-sermonde",
        img: `/images/projects/jf-sermonde.pt.webp`,
        title: t('portfolio.projects.project3.title'),
        description: t('portfolio.projects.project3.description'),
        technologies: ["React", "Node.js", "Express", "TypeScript", "Tailwind CSS", "MySQL"],
        link: "https://jf-sermonde.pt",
      },
      {
        id: "oxlynsoftware",
        img: `/images/projects/oxlynsoftware.com.webp`,
        title: t('portfolio.projects.project4.title'),
        description: t('portfolio.projects.project4.description'),
        technologies: ["React", "Node.js", "Express", "TypeScript", "Tailwind CSS", "MySQL", "Tebex"],
        link: "https://oxlynsoftware.com",
      },
    ];
  }, [t, i18n.resolvedLanguage]); // Only rebuild when translation functions or language change

  return dataportfolio;
};