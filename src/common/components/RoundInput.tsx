import styled from "styled-components";
import { TextField, InputAdornment, InputProps } from "@material-ui/core";
import React from "react";
import { TextFieldProps } from "material-ui";
import { withTheme } from "@material-ui/core/styles"

const TextInput = withTheme(styled(TextField)`
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

  fieldset {
    transition-propety: border-color color font-weight;
    transition-duration: .3s;
  }

  & .MuiInputLabel-animated {
    transition: color .2s cubic-bezier(0.0, 0, 0.2, 1) 0s, transform .2s cubic-bezier(0.0, 0, 0.2, 1) 0s, 
    font-weight .3s cubic-bezier(0.0, 0, 0.2, 1) 0s;
  }

  &&:hover {
    fieldset {
      border-color: ${(props) =>
        props.error ? props.theme.palette.error.main : props.theme.palette.primary.main};
    }
    border-color: ${(props) =>
      props.error ? props.theme.palette.error.main : props.theme.palette.primary.main};

    .MuiFormLabel-root {
      color: ${(props) => (props.error ? props.theme.palette.error.main : props.theme.palette.primary.main)};
    }
  }

  &&:focus-within {
    fieldset {
      border-color: ${(props) =>
        props.error ? props.theme.palette.error.main : props.theme.palette.primary.main};
    }

    .MuiFormLabel-root {
      border-color: ${(props) =>
        props.error ? props.theme.palette.error.main : props.theme.palette.primary.main};
      font-weight: bold;
    }
  }
`);

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
