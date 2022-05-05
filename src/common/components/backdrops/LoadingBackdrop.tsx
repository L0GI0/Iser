import React from "react";
import styled from "styled-components";
import { BackdropProps } from "@mui/material";
import { CircularProgress } from 'material-ui-core'
import { LimitedBackdrop } from "./styledElements";

const SpinBlur = styled.div<BackdropProps>`
  opacity: ${(props) => props.open ? '.3': '1'};
`

const LoadingBackdrop: React.FC<BackdropProps> = ({open, children, ...props}) => {
  return (
    <React.Fragment>
        <LimitedBackdrop open={open} {...props}>
            <CircularProgress />
        </LimitedBackdrop>
        <SpinBlur open={open}>
            {children}
        </SpinBlur>
    </React.Fragment>
  );
};

export default LoadingBackdrop;
 