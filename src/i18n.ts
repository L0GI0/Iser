import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// ----------------------------------------------------------------------

export const namespaces = [
  "common",
  "account",
  "dashboard",
  "notifiers"
]

export const defaultNS = 'common'

const supportedLngs = ['en-GB', 'pl']

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    fallbackLng: 'en-GB',
    debug: true,
    supportedLngs,
    ns: namespaces,
    defaultNS,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    }
    
  });


export default i18n;