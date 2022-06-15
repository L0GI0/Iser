import { Theme } from '@mui/material/styles';
import palette from './palette';
import shadows, { customShadows } from './shadows';
import 'styled-components';
import {  PaletteColor as PaletteRoot } from '@mui/material/styles';
import { IserThemeOptions } from './index'

// ----------------------------------------------------------------------


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
  
    export function createTheme(options?: ThemeOptions): Theme;
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}