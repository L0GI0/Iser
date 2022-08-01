import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Input(theme: Theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            '& svg': { color: theme.palette.text.disabled }
          }
        },
        input: {
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled
          },
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          underline: {
            '&:before': {
              borderBottomColor: theme.palette.grey[500_56]
            }
          }
        },
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
        fieldset: {
            transitionPropety: `border-color border-width color font-weight`,
            transitionDuration: `.15s`,
            borderColor: theme.palette.divider,
          },
          '&.Mui-focused fieldset': {
            boxShadow: theme.customShadows.action.primary.focus
          },
          '&&:hover fieldset': {
            borderColor: theme.palette.primary.main,
          },
        }
      }
    }
  };
}
