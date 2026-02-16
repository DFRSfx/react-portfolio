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
      lookupFromSubdomainIndex: 0
    }
  }, (err) => {
    if (err) console.error('i18n init error:', err);
  });

// Persist language to localStorage on every manual changeLanguage() call.
// The LanguageDetector's caches option only writes on detection at init,
// not when changeLanguage() is called programmatically.
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
});

// Ensure fallback to 'en' if no valid language is detected and sync header
i18n.on('initialized', () => {
  const detectedLanguage = i18n.language;
  if (!detectedLanguage || !['pt', 'en'].includes(detectedLanguage)) {
    i18n.changeLanguage('en');
  }
});

export default i18n;
