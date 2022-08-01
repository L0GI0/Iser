import { TextField, InputAdornment, InputProps } from "@mui/material";
import React from "react";
import { TextFieldProps } from "material-ui";
import styled from "styled-components";

// ----------------------------------------------------------------------

const TextInput = styled(TextField)`
  && {
    width: 100%;
    margin: 1.5em 0em;
  }

  .MuiInputBase-root {
    border-radius: 10em;
  }

  .MuiFormHelperText-root {
    position: absolute;
    bottom: -1.75em;
  }

  & .MuiInputLabel-animated {
    transition: color .2s cubic-bezier(0.0, 0, 0.2, 1) 0s, transform .2s cubic-bezier(0.0, 0, 0.2, 1) 0s, 
    font-weight .3s cubic-bezier(0.0, 0, 0.2, 1) 0s;
  }
  
  &&:hover {
    fieldset {
      ${( { error, theme }  ) => error && `border-color: ${theme.palette.error.main}`};
      ${( { theme, error }  ) => error && `box-shadow: ${theme.customShadows.action.error.hover}`};  
    }
    
    .MuiFormLabel-root {
      color: ${(props) => (props.error ? props.theme.palette.error.main : props.theme.palette.action.active)};
    }
  }

  &&:focus-within {
    fieldset {
      ${( { error, theme }  ) => error && `border-color: ${theme.palette.error.main} !important`};
      ${( { theme, error }  ) => error && `box-shadow: ${theme.customShadows.action.error.focus} !important`};  
    }
    
    .MuiFormLabel-root {
      border-color: ${(props) =>
        props.error ? props.theme.palette.error.main : props.theme.palette.action.active};
      font-weight: bold;
      color: ${(props) => (props.error ? props.theme.palette.error.main : props.theme.palette.action.active)};
    }
  }
`

// ----------------------------------------------------------------------

interface InputFieldProps {
  placeholder: string;
  postfixIcon?: React.SVGProps<SVGSVGElement>;
  errorMessage?: string;
  ref?: React.Ref<any>;
}

export type RoundInputType = InputFieldProps & TextFieldProps & InputProps;

const RoundInput: React.FC<RoundInputType> = ({
  placeholder,
  postfixIcon,
  errorMessage,
  ref,
  ...props
}: InputFieldProps) => {
  return (
    <TextInput
      inputRef={ref}
      variant="outlined"
      label={placeholder}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{postfixIcon}</InputAdornment>
        ),
      }}
      error={errorMessage ? true : false}
      helperText={errorMessage}
      {...props}
    />
  );
};

export default RoundInput;
