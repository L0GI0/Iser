import React from "react";
import styled from "styled-components";
import { BackdropProps } from "@material-ui/core";
import { LimitedBackdrop, SuccessIcon } from "./styledElements";
import RoundButton from '../RoundButton'


const ResultBlur = styled.div<BackdropProps>`
  opacity: ${(props) => props.open ? '0': '1'};
` 

interface ResultBackdropProps {
    onClose: () => void,
    resultText: string
}

const ResultBackdrop: React.FC<BackdropProps & ResultBackdropProps> = (props) => {

    const {open, resultText, onClose, children } = props 
    
    return (
    <React.Fragment>
        <LimitedBackdrop {...props} open={open}>
            <SuccessIcon/>
                { resultText }
            <RoundButton text="Close" onClick={onClose} color="primary"/>
        </LimitedBackdrop>
        <ResultBlur open={open}>
            {children}
        </ResultBlur>
    </React.Fragment>
    );
};

export default ResultBackdrop;
 