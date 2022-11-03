
import { Box, Typography, Switch, SwitchProps } from "@mui/material";
import React from "react";
import styled from "styled-components";

// ----------------------------------------------------------------------

export const SwitchBox = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: "center",
  paddingTop: spacing(1),
  paddingBottom: spacing(1),
  marginBottom: spacing(.25),
}))

export const SwitchBoxText = styled(Typography).attrs({variant: "subtitle1", fontWeight: 400, color: "text"})``

// ----------------------------------------------------------------------

interface SwitchInputProps extends SwitchProps {
  text?: React.ReactNode
  mt?: number
}

const SwitchInput: React.FC<SwitchInputProps> = ({ text, mt, ...other}) => {
  return (
  <SwitchBox mt={mt ?? .25}>
    <Box >
      <Switch { ...other } />
    </Box>
    <Box ml={2}>
      <SwitchBoxText>
        { text }
      </SwitchBoxText>
    </Box>
  </SwitchBox>
  )
}

export default SwitchInput