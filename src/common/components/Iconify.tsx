import { Icon, IconifyIcon } from '@iconify/react';
import { Box } from '@mui/material';
import { SxProps } from '@mui/system';

// ----------------------------------------------------------------------

interface IconifyProps {
  icon: IconifyIcon | string,
  sx?: SxProps
}

export default function Iconify({ icon, sx, ...other }: IconifyProps) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}