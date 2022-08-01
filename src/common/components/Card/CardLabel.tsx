import React from "react";
import { Box, Typography } from "@mui/material";
import styled from 'styled-components';

// ----------------------------------------------------------------------

export const CardLabelText = styled(Typography).attrs({variant: "h5", fontWeight: "medium", textTransform: "capitalize"})``

// ----------------------------------------------------------------------

interface CardLabelProps {
  children: React.ReactNode;
}

const CardLabel: React.FC<CardLabelProps>  = ({ children })  => {

  return (
    <Box sx={{ pt: 2, mb: 4 }}>
    <CardLabelText fontWeight="medium" textTransform="capitalize">
      { children }
    </CardLabelText>
  </Box>
  );
}

export default CardLabel;
