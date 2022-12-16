import { SnackbarProvider, SnackbarProviderProps } from "notistack";
import styled from 'styled-components'
import useSnackbarNotifier from "features/notifiers/useSnackbarNotifier";
import React from "react";

const StyledSnackbarProvider = styled(SnackbarProvider)`
  &&.SnackbarItem-contentRoot {
    border-radius: 5em;
    white-space: pre-wrap;
  }
`

const NotifiersRoot: React.FC = () => {
  useSnackbarNotifier();
  return <></>
}

const EnhancedSnackbarProvider: React.FC<React.PropsWithChildren<SnackbarProviderProps>> = ({children, ...props}) => (
    <StyledSnackbarProvider {...props}>
      {children}
      <NotifiersRoot/>
    </StyledSnackbarProvider>)

export default EnhancedSnackbarProvider;
