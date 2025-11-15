import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationPT from './locales/pt.json';
import translationEN from './locales/en.json';
import translationES from './locales/es.json';
import translationFR from './locales/fr.json';

const resources = {
  pt: {
    translation: translationPT
  },
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  },
  fr: {
    translation: translationFR
  }
};

i18n
  .use(LanguageDetector) // Detecta o idioma do navegador
  .use(initReactI18next) // Passa i18n para react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Idioma padrão
    debug: false,
    interpolation: {
      escapeValue: false // React já faz escape por padrão
    },
    detection: {
      order: ['localStorage', 'navigator'], // Primeiro verifica localStorage, depois navegador
      caches: ['localStorage'] // Guarda a escolha do utilizador
    }
  });

export default i18n;
