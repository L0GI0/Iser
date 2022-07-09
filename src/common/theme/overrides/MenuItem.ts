
import { Theme } from '@mui/material/styles';

export default function MenuItem(theme: Theme) {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          minWidth: theme.functions.pxToRem(160),
          minHeight: "unset",
          padding: `${theme.functions.pxToRem(4.8)} ${theme.functions.pxToRem(16)}`,
          borderRadius: theme.borders.borderRadius.md,
          transition: "background-color 300ms ease, color 300ms ease",
        },
      },
    }
  }
}