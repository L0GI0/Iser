
import React from "react";
import { Card, Typography } from "@mui/material";
import CardLabel from "./CardLabel";

// ----------------------------------------------------------------------

interface CardLabelProps {
  label: React.ReactNode;
  description?: React.ReactNode
}

const LabeledCard: React.FC<React.PropsWithChildren<CardLabelProps>>  = ({ label, description, children })  => {

  return (
  <Card>
    <CardLabel description={description}>
      { label }
    </CardLabel>
    <Typography>
    </Typography>
      { children }
  </Card>
  );
}

export default LabeledCard;
