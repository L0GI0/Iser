import SimpleBarReact from 'simplebar-react';
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import 'simplebar-react/dist/simplebar.min.css';

// ----------------------------------------------------------------------

const SimpleBarWrapper = styled('div')(() => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
}));

const IserSimpleBar = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    '&.simplebar-visible:before': {
      opacity: 1,
    },
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10,
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6,
  },
  '& .simplebar-mask': {
    zIndex: 'inherit',
  },
}));

// ----------------------------------------------------------------------

interface ScrollbarProps extends SimpleBarReact.Props {
  sx?: any,
}

export default function Scrollbar({ children, sx, ...other }: ScrollbarProps) {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx}} {...other}>
        {children}
      </Box>
    );
  }
  
  return (
    <SimpleBarWrapper>
      <IserSimpleBar timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </IserSimpleBar>
    </SimpleBarWrapper>
  );
}
