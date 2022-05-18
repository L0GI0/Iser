import { defaultNS, namespaces } from './i18n';

// ----------------------------------------------------------------------

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    ns: typeof namespaces,
  }
}