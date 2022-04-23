import { Theme, ThemeOptions } from '@mui/material/styles';
import react from 'react';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
// material
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import palette from './palette';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';
import 'styled-components';
import {  PaletteColor as PaletteRoot } from '@mui/material/styles';
import { Shadows } from '@mui/material/styles/shadows'


const iserThemeOptions = {
    palette,
    shape: { borderRadius: 8 },
    shadows,
    customShadows,
} as const;

type IserTheme = {
    [Key in keyof typeof iserThemeOptions]: typeof iserThemeOptions[Key]
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

    // interface PaletteOptions {
    //   lighter: string,
    //   darker: string,
    // }
  
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


