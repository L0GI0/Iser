import React, { useEffect } from "react";
import styled from "styled-components";
import { BackdropProps, Container } from "@mui/material";
import { ReactiveContainer } from 'common/components/styledElements'
import { BorderFlexLimitedBackdrop, SuccessIcon, ResultHeader, ResultDescription, InformationIcon, AppWarningIcon, ErrorIcon } from "./styledElements";
import RoundButton from '../RoundButton'

// ----------------------------------------------------------------------

const ResultBlur = styled.div<BackdropProps>`
  opacity: ${(props) => props.open ? '0': '1'};
` 

// ----------------------------------------------------------------------

export type ResultVariant = 'success' | 'info' | 'warning' | 'error' ;

export const RESULT_VARIANTS: Record<ResultVariant, ResultVariant> = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}

interface ResultBackdropProps {
  resultText: string,
  descriptionText?: string,
  variant?: ResultVariant,
  onClose: () => void,
}

const getVariant = (variant: ResultVariant): React.ReactElement => {
  if(variant === 'success')
      return <SuccessIcon/>
    
  if(variant === 'info')
      return <InformationIcon/>

  if(variant === 'warning')
      return <AppWarningIcon/>
    
  if(variant === 'error')
      return <ErrorIcon/>

  return <InformationIcon/>
}

const ResultBackdrop: React.FC<BackdropProps & ResultBackdropProps> = ({open, variant = 'info', resultText, descriptionText, onClose, children, ...props}) => {
  return (
    <ReactiveContainer>
      <BorderFlexLimitedBackdrop open={open} {...props }>
          {getVariant(variant)}
          <ResultHeader> {resultText} </ResultHeader>
          { descriptionText && <ResultDescription> { descriptionText } </ResultDescription> }
          <RoundButton text="Close" onClick={onClose} color="primary"/>
      </BorderFlexLimitedBackdrop>
      <ResultBlur open={open}>
        {children}
      </ResultBlur>
    </ReactiveContainer>
  );
};

export default ResultBackdrop;
 