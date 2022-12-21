import { CSSObject, css } from 'styled-components';
import { alpha } from '@mui/material/styles'
import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type SkinStyleType = {
  color?: IserColor
  skin?: IserSkin
  skinVariant?: "default" | "outlined" | 'filled' 
}

export const SkinVariant = css<SkinStyleType>`
  ${({ theme, color="primary", skin="main", skinVariant="default" }) =>
    (skinVariant === 'default' &&
      css`
      color: ${theme.palette[color][skin]};
      background-color: ${alpha(theme.palette[color][skin], .12)};
      `) ||
    (skinVariant === 'filled' &&
      css`
      color: ${theme.palette[color].contrastText};
      background-color: ${theme.palette[color][skin]};
      `) ||
    (skinVariant === 'outlined' &&
      css`
      color: ${theme.palette[color][skin]};
      background: transparent;
      border: 1px solid ${theme.palette[color][skin]}
      `)}
`;

export function getSkinVariantStyleObject(
  theme: Theme,
  color: SkinStyleType['color'] = "primary",
  skin: SkinStyleType['skin'] = "main",
  skinVariant: SkinStyleType['skinVariant'] = "default"): CSSObject {

  const skinVariantStyleObject = {
    default: {
      color: theme.palette[color][skin],
      backgroundColor: alpha(theme.palette[color][skin], .12)
    },
    filled: {
      color: theme.palette[color].contrastText,
      backgroundColor: theme.palette[color][skin],
    },
    outlined: {
      color: theme.palette[color][skin],
      background: 'transparent',
      border: `1px solid ${theme.palette[color][skin]}`
    }
  }
  return skinVariantStyleObject[skinVariant]
}
