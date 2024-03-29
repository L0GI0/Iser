import MenuItem from "@mui/material/MenuItem";
import { alpha } from '@mui/material/styles';
import styled from "styled-components";

// ----------------------------------------------------------------------

const IserMenuItem = styled(MenuItem)(( { theme }) => ({
  transition: "background-color .3s ease, color .3s ease",
  color: theme.palette.text.primary,
  padding: `${theme.functions.pxToRem(1)} ${theme.spacing(2)}`,

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
    ":after": {
      opacity: .5,
    }
  },

  "&&:focus": {
    color: theme.palette.text.primary,
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    ":after": {
      opacity: 0,
    }
  },

  position: 'relative',
  borderRadius: theme.borders.borderRadius.md,

  margin: `0 ${theme.spacing(1.25)}`,

  ":after": {
    transition: 'opacity .3s ease',
    position: 'absolute',
    fontSize: theme.functions.pxToRem(13),
    right: '10px',
    content: "'Press to select'",
    opacity: 0,
  }

}))

export default IserMenuItem;
