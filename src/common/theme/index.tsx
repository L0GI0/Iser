import React, { useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider as StyledComponentsThemeProvider} from 'styled-components';
import { Shadows } from '@mui/material/styles/shadows'
import palette from './palette';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';
import typography from './typography';

// ----------------------------------------------------------------------

interface Props {
    children: React.ReactNode
}

const IserThemeOptions = {
    palette,
    shape: { borderRadius: 8 },
    customShadows,
    typography,
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
      <MUIThemeProvider theme={theme}>
      <StyledComponentsThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </StyledComponentsThemeProvider>
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
