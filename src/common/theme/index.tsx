import React, { useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider as StyledComponentsThemeProvider} from 'styled-components';
import { Shadows } from '@mui/material/styles/shadows';
import palette from './palette';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';
import borders from './borders';
import typography from './typography';
import { linearGradient, pxToRem } from './functions';

// ----------------------------------------------------------------------

interface Props {
    children: React.ReactNode
}

export const IserThemeOptions = {
  typography,
  palette,
  shape: { borderRadius: 8 },
  shadows,
  borders: { ...borders },
  customShadows,
  functions: {
    linearGradient,
    pxToRem
  },
  sidebarWidth: 240,
} as const;

export default function ThemeProvider({ children }: Props) {
  const themeOptions = useMemo(
    () => (IserThemeOptions),
    []);

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);
  theme.shadows = shadows as Shadows;

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
