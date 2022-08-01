
import { Theme } from '@mui/material/styles';
import { alpha } from '@mui/material'

export default function Card(theme: Theme) {
  return {
    MuiSwitch: {
      defaultProps: {
        disableRipple: true,
      },
    
      styleOverrides: {
        root: {
          width: theme.functions.pxToRem(40),
          height: theme.functions.pxToRem(20),
          margin: `${theme.functions.pxToRem(4)} 0`,
          padding: 0,
          borderRadius: theme.functions.pxToRem(160),
          transition: "transform 250ms ease-in",
        },
    
        switchBase: {
          padding: 0,
          top: "50%",
          transform: `translate(${theme.functions.pxToRem(2)}, -50%)`,
          transition: `transform 250ms ease-in-out`,
    
          "&.Mui-checked": {
            transform: `translate(${theme.functions.pxToRem(22)}, -50%)`,
    
            "& + .MuiSwitch-track": {
              backgroundColor: `${alpha(theme.palette.primary.dark, 0.95)} !important`,
              borderColor: `${alpha(theme.palette.primary.dark, 0.95)} !important`,
              opacity: 1,
            },
          },
    
          "&.Mui-disabled + .MuiSwitch-track": {
            opacity: "0.3 !important",
          },
    
          "&.Mui-focusVisible .MuiSwitch-thumb": {
            backgroundImage: theme.functions.linearGradient(theme.palette.primary.main, theme.palette.primary.dark),
          },
        },
    
        thumb: {
          width: theme.functions.pxToRem(16),
          height: theme.functions.pxToRem(16),
          backgroundColor: theme.palette.grey[100],
          boxShadow: theme.shadows[15],
          top: "50%",
        },
    
        track: {
          backgroundColor: theme.palette.background.neutral,
          border: `${theme.borders.borderWidth[1]} solid ${theme.palette.background.neutral}`,
          borderRadius: theme.functions.pxToRem(160),
          opacity: 1,
          transition: `background-color 250ms ease, border-color 200ms ease`,
        },
    
        checked: {},
      },
    },
  }
}