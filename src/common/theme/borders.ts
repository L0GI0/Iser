import { alpha } from '@mui/material/styles';
import { pxToRem } from "./functions";
import PaletteType from './palette';

// ----------------------------------------------------------------------

const bordersDimensions = {
  borderWidth: {
    0: 0,
    1: pxToRem(1),
    2: pxToRem(2),
    3: pxToRem(3),
    4: pxToRem(4),
    5: pxToRem(5),
  },

  borderRadius: {
    xs: pxToRem(2),
    sm: pxToRem(4),
    md: pxToRem(8),
    lg: pxToRem(12),
    xl: pxToRem(16),
    xxl: pxToRem(24),
    section: pxToRem(160),
  },
};

export const createBorders = (themePalette: PaletteType) => {
  return {
      ...bordersDimensions,
      default: `${bordersDimensions.borderWidth[1]} solid ${themePalette.divider}`,
      action: {
        selected: `${bordersDimensions.borderWidth[1]} solid ${alpha(themePalette.info.main, .4)}`
    }
  }
}
