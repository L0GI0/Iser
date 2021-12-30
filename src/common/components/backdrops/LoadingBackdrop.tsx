import React from "react";
import styled from "styled-components";
import { BackdropProps } from "@material-ui/core";
import { CircularProgress } from '@material-ui/core'
import { LimitedBackdrop } from "./styledElements";

const SpinBlur = styled.div<BackdropProps>`
  opacity: ${(props) => props.open ? '.3': '1'};
`

const LoadingBackdrop: React.FC<BackdropProps> = ({open, children}) => {
  return (
    <React.Fragment>
        <LimitedBackdrop open={open}>
            <CircularProgress />
        </LimitedBackdrop>
        <SpinBlur open={open}>
            {children}
        </SpinBlur>
    </React.Fragment>
  );
};

export default LoadingBackdrop;
 