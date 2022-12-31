import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { SIDEBAR, HEADER } from 'common/theme/config';
import Box from "@mui/material/Box";
import IserAppBar from './AppBar';
import Sidebar from './Sidebar';
import useCollapseDrawer from './useColapseDrawer';

// ----------------------------------------------------------------------

const MainStyle = styled('main')<{collapseClick: boolean}>(({ theme, collapseClick }) => ({
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT + 24,
  paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: HEADER.DESKTOP_HEIGHT + 24,
    paddingBottom: HEADER.DESKTOP_HEIGHT + 24,
    width: `calc(100% - ${SIDEBAR.BASE_WIDTH}px)`,
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: SIDEBAR.COLLAPSE_WIDTH,
    }),
  },
}));

// ----------------------------------------------------------------------

export default function IserLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const { collapseClick, isCollapse } = useCollapseDrawer();

  const onCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <Box
      sx={{
        display: { lg: 'flex' },
        minHeight: { lg: 1 },
      }}
    >
      <IserAppBar isCollapse={isCollapse} onTriggerSidebar={() => setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen)}/>
      <Sidebar isSidebarOpen={isSidebarOpen} isCollapse={isCollapse} onCloseSidebar={onCloseSidebar}/>
      <MainStyle collapseClick={collapseClick}>
        <Outlet />
      </MainStyle>
      </Box>
  );
}

IserLayout.whyDidYouRender = true;
