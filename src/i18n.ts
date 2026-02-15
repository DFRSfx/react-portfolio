import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationPT from './locales/pt.json';
import translationEN from './locales/en.json';

const resources = {
  pt: {
    translation: translationPT
  },
  en: {
    translation: translationEN
  }
};

i18n
  .use(LanguageDetector) // Detecta o idioma do navegador
  .use(initReactI18next) // Passa i18n para react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Idioma padrão
    defaultNS: 'translation',
    ns: 'translation',
    debug: false,
    interpolation: {
      escapeValue: false // React já faz escape por padrão
    },
    detection: {
      order: ['localStorage', 'navigator'], // Primeiro verifica localStorage, depois navegador
      caches: ['localStorage'], // Guarda a escolha do utilizador
      lookupLocalStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      cacheUserLanguageKey: 'i18nextLng'
    }
  });

// Initialize with 'en' if localStorage doesn't have a saved language
if (!localStorage.getItem('i18nextLng')) {
  i18n.changeLanguage('en');
}

export default i18n;
