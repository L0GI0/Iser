// ----------------------------------------------------------------------

export const REQUEST_STATUS: Record<RequestStatus, RequestStatus> = {
  success: 'success',
  unauthorised: 'unauthorised',
  failed: 'failed',
  forbidden: 'forbidden'
}

export const LANGUAGES:  Record<Languages, Omit<Language, 'value'>>  = {
  "en-GB": {
    label: 'English',
    icon: '/static/icons/lng_flag_en.svg',
  },
  "pl": {
    label: 'Polski',
    icon: '/static/icons/lng_flag_pl.svg',
  },
  "de": {
    label: 'Deutsch',
    icon: '/static/icons/lng_flag_de.svg',
  },
  "fr": {
    label: 'Français',
    icon: '/static/icons/lng_flag_fr.svg',
  }
}

export const LANGS: Language[] = [
  {
    value: 'en-GB',
    ...LANGUAGES['en-GB']
  },
  {
    value: 'pl',
    ...LANGUAGES['pl']
  },
  {
    value: 'de',
    ...LANGUAGES['de']
  },
  {
    value: 'fr',
    ...LANGUAGES['fr']
  },
];