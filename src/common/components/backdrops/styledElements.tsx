import { Backdrop } from "@mui/material"
import styled from 'styled-components'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { withTheme } from "@mui/styles"

export const LimitedBackdrop = styled(Backdrop)`
  &.MuiBackdrop-root {
    position: absolute;
    z-index: 1;
    background: none;
  }
`

export const SuccessIcon = withTheme(styled(CheckCircleIcon)`
    &.MuiSvgIcon-root {
        font-size: 3.5em;
    }
    color: ${props => props.theme.palette.success.main};
`
);