import React, { PropsWithChildren } from 'react';
import { Box, } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import styled, { CSSObject } from 'styled-components';

// ----------------------------------------------------------------------

interface LabelContainerProps {
  color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'active'
  variant: 'filled' | 'outlined',
  sx?: SxProps<Theme>
}

const labelStyleFilled = (theme: Theme, color: LabelContainerProps['color']): CSSObject => ({
  color: (color === 'active') ? theme.palette.action.active : theme.palette[color].main,
  backgroundColor: (color === 'active') ? theme.palette.action.active : theme.palette[color].lighter
})

const labelStyleOutlined = (theme: Theme, color: LabelContainerProps['color']): CSSObject => ({
  backgroundColor: 'transparent',
  color: (color === 'active') ? theme.palette.action.active : theme.palette[color].main,
  border: `1px solid ${(color === 'active') ? theme.palette.action.active : theme.palette[color].main}`
})

// ----------------------------------------------------------------------

const LabelContainer = styled(Box)<LabelContainerProps>(({theme, color, variant}) => ({
  height: 22,
  minWidth: 22,
  lineHeight: 0,
  borderRadius: theme.borders.borderRadius.xxl,
  alignItems: 'center',
  display: 'inline-flex',
  justifyConent: 'center',
  padding: theme.spacing(1, 1),
  fontSize: theme.typography.pxToRem(14),
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightBold,

  ...(variant === 'filled' ? {
    ...labelStyleFilled(theme, color)
  } : {
    ...labelStyleOutlined(theme, color)
  })
}));

// ----------------------------------------------------------------------

type LabelProps = PropsWithChildren<Partial<LabelContainerProps>> 

const Label: React.FC<LabelProps> = ({ children, color = "primary", variant = "outlined", sx = {} }) => {
  return (
    <LabelContainer color={color} variant={variant} sx={sx}>
      {children}
    </LabelContainer>
  );
}

export default Label;