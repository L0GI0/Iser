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
            boxShadow: 'none' as Property.BoxShadow
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
              boxShadow: '0px 10px 10px rgba(92, 58, 252, 0.5)',
              ":hover": {
                background: 'rgba(92, 58, 252, 0.9)',
                boxShadow: '0px 5px 10px rgba(92, 58, 252, 0.5)'
              }
            }
          },
          {
            props: { 
              variant: 'round' as ButtonProps['variant'],
              color: "secondary" as ButtonProps['color'] },
            style: {
              background: theme.palette.secondary.main,
              boxShadow: '0px 10px 10px rgba(86,55,235,255)',
              ":hover": {
                background: 'rgba(86,55,235,255)',
                boxShadow: '0px 0px 10px 1px rgba(110,96,255,255)'
              }
            }
          },
        ]
      }
    }
  }