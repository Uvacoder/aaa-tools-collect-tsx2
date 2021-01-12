import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-node-fs-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import path from 'path';
import { languages } from './constants.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: path.join(__dirname, 'locales', '{{lng}}', '{{ns}}.json'),
      jsonIndent: 2,
    },
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    whitelist: languages,
    saveMissing: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: false,
    },
  });

export default i18n;
