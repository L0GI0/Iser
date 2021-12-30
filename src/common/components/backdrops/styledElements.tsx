import { Backdrop } from "@material-ui/core"
import styled from 'styled-components'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { withTheme } from "@material-ui/core/styles"

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