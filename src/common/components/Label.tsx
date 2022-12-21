import React, { PropsWithChildren } from 'react';
import { Box, } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import styled from 'styled-components';
import { getSkinVariantStyleObject, SkinStyleType } from 'common/styles/SkinStyle';

// ----------------------------------------------------------------------

type LabelPropsProps = {
  sx?: SxProps<Theme>
} & SkinStyleType

// ----------------------------------------------------------------------

const LabelContainer = styled(Box)<LabelPropsProps>(({theme, color, skin, skinVariant}) => ({
  height: 22,
  lineHeight: 0,
  borderRadius: theme.borders.borderRadius.xxl,
  alignItems: 'center',
  display: 'inline-flex',
  justifyConent: 'center',
  padding: theme.spacing(1.5, 1.5),
  fontFamily: theme.typography.fontFamily,
  '&&.MuiBox-root': {
    justifyContent: 'center'
  },
  fontWeight: theme.typography.fontWeightBold,
  ...getSkinVariantStyleObject(theme, color, skin, skinVariant)
}));

// ----------------------------------------------------------------------

type LabelProps = PropsWithChildren<Partial<LabelPropsProps>> 

const Label: React.FC<LabelProps> = ({ children, ...rest }) => {
  return (
    <LabelContainer {...rest} >
      {children}
    </LabelContainer>
  );
}

export default Label;