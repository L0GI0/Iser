
import React from "react";
import { Card, Typography, CardHeader, CardHeaderProps } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import CardLabel from "./CardLabel";

// ----------------------------------------------------------------------


const LabeledCard: React.FC<React.PropsWithChildren<CardHeaderProps>>  = ({ children, ...props })  => {
  return (
  <Card>
    <CardHeader sx={{ px: 0}} {...props}/>
    <CardContent>
      { children }
    </CardContent>
  </Card>
  );
}

export default LabeledCard;
