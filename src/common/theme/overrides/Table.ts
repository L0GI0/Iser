
import { Theme } from '@mui/material/styles';

export default function Table(theme: Theme) {
  return {
    MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: `${theme.borders.borderWidth[1]} solid ${theme.palette.divider}`,
        },
      }
    },
  }
}