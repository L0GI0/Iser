import React from "react";
import { Box, FormLabel, TextFieldProps, FormControl } from "@mui/material";
import styled from "styled-components";
import IserTextInput from 'common/components/inputs/IserTextInput';

// ----------------------------------------------------------------------

export const StaticFormLabel = styled(FormLabel)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontSize: theme.functions.pxToRem(14),
  fontWeight: 900
}))

// ----------------------------------------------------------------------

const FormInput: React.FC<TextFieldProps> = ({label, children, ...other}: TextFieldProps) => {
  
  return (
      <Box display="flex" flexDirection="column" justifyContent="end" height="100%">
        { label && <StaticFormLabel> { label } </StaticFormLabel> }
        <FormControl> { children ? children : <IserTextInput {...other}/> } </FormControl>
      </Box>)
}

export default FormInput;
