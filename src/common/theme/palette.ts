import { alpha, PaletteColor } from '@mui/material/styles';
import { Color, PaletteMode } from '@mui/material'

// ----------------------------------------------------------------------

function createGradient(color1: string, color2: string) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

declare module '@mui/material' {
  interface Color {
    0: string,
    500_8: string,
    500_12: string,
    500_16: string,
    500_24: string,
    500_32: string,
    500_48: string,
    500_56: string,
    500_80: string,
   }    
}

const GREY: Omit<Color, 50 | 'A200' |'A400' |'A700' | 'A100'> = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const PRIMARY: PaletteColor = {
  lighter: '#D1E9FC',
  light: '#6748FD',
  main: '#5C3AFC',
  dark: '#5537eb',
  darker: '#3C1BDA',
  contrastText: GREY[0],
};

const SECONDARY: PaletteColor = {
  lighter: '#C2BCFF',
  light: '#776AFF',
  main: '#6E60FF',
  dark: '#6354FD',
  darker: '#091A7A',
  contrastText: GREY[0],
};

const INFO: PaletteColor = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#388BFD',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: GREY[0],
};


const SUCCESS: PaletteColor = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[0],
};

const WARNING: PaletteColor = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC400',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[0],
};

const ERROR: PaletteColor = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#D13F3B',
  darker: '#911A16',
  contrastText: GREY[0],
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};

export const paletteLight = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_48],
  text: { primary: GREY[900], secondary: GREY[600], disabled: GREY[500] },
  background: { paper: GREY[0], default: GREY[100], neutral: GREY[300] },
  action: {
    active: PRIMARY.main,
    hover: GREY[500_8],
    selected: alpha(INFO.main, .15),
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: .08,
    focusOpacity: .2,
    disabledOpacity: 0.48,
  },
};

export const paletteDark = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_32],
  text: { primary: GREY[0], secondary: GREY[500], disabled: GREY[600] },
  background: { paper: GREY[900], default: GREY[800], neutral: GREY[700] },
  action: {
    active: SECONDARY.lighter,
    hover: GREY[500_8],
    selected: alpha(INFO.main, .15),
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: .08,
    focusOpacity: .2,
    disabledOpacity: 0.48,
  },
};

export const getPallette = (themeMode: PaletteMode) => {
  return (themeMode === 'light' ? paletteLight : paletteDark)
}

type PaletteType = typeof paletteLight;

export default PaletteType;
