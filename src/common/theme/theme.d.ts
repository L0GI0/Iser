import { CSSProperties } from 'react'; 
import { Theme, PaletteColor as PaletteRoot, TypographyVariantsOptions as TypographyVariantsRoot, Variant as VariantRoot } from '@mui/material/styles';
import shadows from './shadows';
import { getIserTheme } from './index'

// ----------------------------------------------------------------------

const IserThemeOptions = getIserTheme('light')

type IserTheme = {
    [Key in keyof typeof IserThemeOptions]: typeof IserThemeOptions[Key]
}

type IserShadows = typeof shadows; 

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

declare module '@mui/material/styles/shadows' {
  type Shadows = IserShadows
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    label: true;
    responsiveCaption: true,
  }
}

declare module '@mui/material/styles' {
   interface Theme extends IserTheme {}
   interface ThemeOptions extends IserTheme {}

   interface PaletteColor extends PaletteRoot {
      lighter: string,
      darker: string,
    }

    interface PaletteColor {
      lighter: string,
    darker: string,
    }
    interface SimplePaletteColorOptions {
      lighter: string,
      darker: string,
  }

    interface TypeBackground {
      neutral: string;
    }

    interface TypographyVariantsOptions extends TypographyVariantsRoot {
      label: CSSProperties,
      responsiveCaption: CSSProperties,
    }
  
    export function createTheme(options?: ThemeOptions): Theme;
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}