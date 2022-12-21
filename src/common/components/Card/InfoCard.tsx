
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { Box, Typography } from '@mui/material';
import Iconify from "../Iconify";
import AuthorisedFeature from "../AuthorisedFeature";

// ----------------------------------------------------------------------

interface InfoCardProps<InfoType extends string> {
  title: React.ReactNode,
  info: Record<InfoType, any>
  action?: {
    route: string,
    tooltip: string,
    icon: string,
    authorised?: boolean
  }
}

function InfoCard<InfoType extends string> ({ title, info, action }: InfoCardProps<InfoType>){
  const labels: (keyof InfoType)[] = [];
  const values: any[] = [];

  Object.keys(info).forEach((el) => {
    const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));

    if (uppercaseLetter) {

      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement as keyof InfoType);
    } else {
      labels.push(el as keyof InfoType);
    }
});

  Object.values(info).forEach((el) => values.push(el));

  const renderItems = labels.map((label, key) => (
    <Box key={label as string} display="flex" alignItems="center" maxWidth='100%' py={1} pr={2}>
      <Typography variant="subtitle1" display="block" fontWeight="bold" textTransform="capitalize" pr={1}>
        {label}:
      </Typography>
      <Typography variant="subtitle1" maxWidth="85%" color="grey.500">
        {values[key]}
      </Typography>
    </Box>
  ));

  const actionIcon =  action &&
  <Typography component={Link} to={action.route} variant="body2" color="secondary">
    <Tooltip title={action.tooltip} placement="top">
      <span>
        <Iconify icon={action.icon}/>
      </span>
    </Tooltip>
  </Typography>

  return (
    <Card sx={{ height: "100%" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <Typography variant="h5" fontWeight="medium" textTransform="capitalize">
          {title}
        </Typography>
        { action && (
          action.authorised ?
          <AuthorisedFeature>
            {actionIcon}
          </AuthorisedFeature> :
          {actionIcon}
        )}
      </Box>
      <Box p={2}>
        <Box>
          <Divider />
        </Box>
        <Box>
          {renderItems}
        </Box>
      </Box>
    </Card>
  );
}

export default InfoCard;
