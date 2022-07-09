import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import IserAppBar from './components/AppBar';
import DashboardSidebar from './components/DashboardSidebar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  backgroundColor: theme.palette.background.neutral,
  paddingTop: APP_BAR_MOBILE + 24,  
  paddingBottom: theme.spacing(10),
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <RootStyle>
      <IserAppBar onTriggerSidebar={() => setOpen((open) => !open)} isSidebarOpen={open}/>
      <DashboardSidebar isSidebarOpen={open} onCloseSidebar={() => setOpen(false)} onOpenSidebar={() => setOpen(true)}/>
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
