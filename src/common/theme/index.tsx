import React, { useMemo } from 'react';
import { CssBaseline, PaletteMode } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider as StyledComponentsThemeProvider} from 'styled-components';
import { Shadows } from '@mui/material/styles/shadows';
import { RootState } from "rootStore/rootReducer";
import { useSelector } from 'react-redux';
import { getPallette } from './palette';
import componentsOverride from './overrides';
import { createShadows, createCustomShadows } from './shadows';
import { createBorders } from './borders';
import typography from './typography';
import { linearGradient, pxToRem } from './functions';

// ----------------------------------------------------------------------

interface Props {
    children: React.ReactNode
}

export const getIserTheme = (themeMode: PaletteMode) => {

  const palette = getPallette(themeMode);
  const customShadows = createCustomShadows(palette);
  const shadows = createShadows(palette.grey[500]);
  const borders = createBorders(palette);  

  return {
    typography,
    palette: {...palette},
    shape: { borderRadius: 8 },
    shadows,
    borders: { ...borders },
    customShadows: { ...customShadows },
    functions: {
      linearGradient,
      pxToRem
    },
    sidebarWidth: 240,
  } 
}

export default function ThemeProvider({ children }: Props) {

  const { themeMode } = useSelector((state: RootState) => state.accountReducer)


  const themeOptions = useMemo(
    () => (getIserTheme(themeMode)),
    [themeMode]);

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);
  theme.shadows = themeOptions.shadows as Shadows;

  return (
    <StyledEngineProvider injectFirst>
      <StyledComponentsThemeProvider theme={theme}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        { children }
      </MUIThemeProvider>
      </StyledComponentsThemeProvider>
    </StyledEngineProvider>
  );
}
