import { Theme } from '@mui/material/styles';
import { ButtonProps } from '@mui/material';
import { Property } from 'csstype'

// ----------------------------------------------------------------------

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
      round: true;
    }
  }

export default function Button(theme: Theme) {
  return {
    MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none" as Property.TextTransform,
            margin: '1em 0' as Property.Margin,
            boxShadow: 'none' as Property.BoxShadow,
            ":hover": {
              background: theme.palette.primary.dark,
              boxShadow: 'none' as Property.BoxShadow,
            }
          }
        },
        variants: [
          {
            props: { variant: 'round' as ButtonProps['variant'] },
            style: {
              borderRadius: '5em',
              padding: '0.75em 3em',
            }
          },
          {
            props: { 
              variant: 'round' as ButtonProps['variant'],
              color: "primary" as ButtonProps['color'] },
            style: {
              background: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              boxShadow: theme.customShadows.primary,
              ":hover": {
                boxShadow: theme.customShadows.action.primary.active
              }
            }
          },
          {
            props: { 
              variant: 'round' as ButtonProps['variant'],
              color: "secondary" as ButtonProps['color'] },
            style: {
              background: theme.palette.secondary.main,
              boxShadow: theme.customShadows.secondary,
              ":hover": {
                background: theme.palette.primary.dark,
                boxShadow: theme.customShadows.action.secondary.active
              }
            }
          },
        ]
      }
    }
  }