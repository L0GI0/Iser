import { Backdrop } from "@mui/material"
import styled from 'styled-components'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import { withTheme } from "@mui/styles"
import { Typography  } from "material-ui-core";

export const LimitedBackdrop = styled(Backdrop)`
  &.MuiBackdrop-root {
    position: absolute;
    z-index: 1;
    background: none;
  }
`

export const BorderFlexLimitedBackdrop = styled(LimitedBackdrop)`
  &.MuiBackdrop-root {
    display: flex;
    flex-direction: column;
  }
`

export const ResultHeader = styled(Typography).attrs({variant: 'h5'})`  
  &.MuiTypography-root {
    margin: 1.75rem 0 .75rem 0;
  }
`

export const SuccessIcon = withTheme(styled(CheckCircleIcon)`
    &.MuiSvgIcon-root {
        font-size: 5em;
    }
    color: ${props => props.theme.palette.success.main};
`
);

export const InformationIcon = withTheme(styled(InfoIcon)`
  &.MuiSvgIcon-root {
    font-size: 5em;
  }

  color:  ${props => props.theme.palette.info.main}
`);

export const AppWarningIcon = withTheme(styled(WarningIcon)`
  &.MuiSvgIcon-root {
    font-size: 5em;
  }

  color: ${props => props.theme.palette.warning.main}
`);

export const ErrorIcon = withTheme(styled(ReportIcon)`
  &.MuiSvgIcon-root {
    font-size: 5em;
  }

  color: ${props => props.theme.palette.error.main}
`);