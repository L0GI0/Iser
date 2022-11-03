import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Typography(theme: Theme) {
    return {
      MuiTypography: {
        styleOverrides: {
          root: {
            justifyContent: 'center'
          },
          paragraph: {
            marginBottom: theme.spacing(2)
          },
          gutterBottom: {
            marginBottom: theme.spacing(1)
          }
        }
      }
    };
  }
