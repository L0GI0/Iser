
import { Theme } from '@mui/material/styles';
import { alpha } from '@mui/material'

export default function Card(theme: Theme) {
  return {
    MuiCard: {
    styleOverrides: {
      root: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        minWidth: 0,
        wordWrap: "break-word",
        backgroundColor: theme.palette.background.default,
        backgroundClip: "border-box",
        border: `${theme.borders.borderWidth[0]} solid ${alpha(theme.palette.common.black, 0.125)}`,
        borderRadius: theme.borders.borderRadius.xl,
        boxShadow: theme.shadows[3],
        padding: `0 ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(2)}`,
        },
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderRadius: theme.borders.borderRadius.xl,
          margin: `${theme.functions.pxToRem(16)} ${theme.functions.pxToRem(16)} 0`,
        },
        media: {
          width: "auto",
        },
      },
    }
  }
}