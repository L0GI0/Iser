
import React from "react";
import { Card } from "@mui/material";
import CardLabel from "./CardLabel";

// ----------------------------------------------------------------------

interface CardLabelProps {
  label: React.ReactNode;
}

const LabeledCard: React.FC<CardLabelProps>  = ({ label, children })  => {

  return (
  <Card>
    <CardLabel>
      { label }
    </CardLabel>
      { children }
  </Card>
  );
}

export default LabeledCard;
