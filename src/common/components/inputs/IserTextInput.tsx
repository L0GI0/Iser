import { TextField } from "@mui/material";
import styled from 'styled-components';

// ----------------------------------------------------------------------

const IserTextInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    height: theme.functions.pxToRem(40)
  },
}))

export default IserTextInput;