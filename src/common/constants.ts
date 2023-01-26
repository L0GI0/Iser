// ----------------------------------------------------------------------

export const REQUEST_STATUS: Record<RequestStatus, RequestStatus> = {
  success: 'success',
  unauthorised: 'unauthorised',
  failed: 'failed',
  forbidden: 'forbidden',
  not_found: 'not_found'
}

export const LANGUAGES:  Record<Languages, Language>  = {
  "en-GB": {
    value: 'en-GB',
    label: 'English',
    icon: '/static/icons/lng_flag_en.svg',
  },
  "pl": {
    value: 'pl',
    label: 'Polski',
    icon: '/static/icons/lng_flag_pl.svg',
  },
  "de": {
    value: 'de',
    label: 'Deutsch',
    icon: '/static/icons/lng_flag_de.svg',
    disabled: true,
  },
  "fr": {
    value: 'fr',
    label: 'Français',
    icon: '/static/icons/lng_flag_fr.svg',
    disabled: true
  }
}

export const LANGS: Language[] = [
  {
    ...LANGUAGES['en-GB']
  },
  {
    ...LANGUAGES['pl']
  },
  {
    ...LANGUAGES['de']
  },
  {
    ...LANGUAGES['fr']
  },
];

export const reactiveStateDefaultValue: ReactiveRequestState = { 
  isRequesting: false,
  reqStatus:  null,
}
