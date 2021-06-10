import { useRef, useEffect } from "react";
import styled from "styled-components";
import { TextField, InputAdornment, InputProps } from "@material-ui/core";
import React from "react";
import { TextFieldProps } from "material-ui";

const TextInput = styled(TextField)`
  && {
    width: 100%;
    outline: none;
    border-color: ${(props) =>
      props.error ? "#ff0f0f" : "rgba(85, 52, 235, 255)"};
    transition: all 0.3s;
    margin: 1.5em 0em;
  }

  .MuiInputBase-root {
    border-radius: 10em;
  }

  .MuiFormHelperText-root {
    position: absolute;
    bottom: -1.75em;
  }

  &&:hover {
    fieldset {
      border-color: ${(props) =>
        props.error ? "#ff0f0f" : "rgba(92, 58, 252, 255)"};
    }
    border-color: ${(props) =>
      props.error ? "#ff0f0f" : "rgba(92, 58, 252, 255)"};
  }

  &&:focus-within {
    fieldset {
      border-color: ${(props) =>
        props.error ? "#ff0f0f" : "rgba(92, 58, 252, 255)"};
    }

    label {
      border-color: ${(props) =>
        props.error ? "#ff0f0f" : "rgba(92, 58, 252, 255)"};
    }
  }
`;

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
