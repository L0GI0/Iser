import styled from "styled-components";
import { alpha } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import Iconify from "common/components/Iconify";
import Searchbar from "./components/Searchbar";
import LanguagePopover from "./components/LanguagePopover";
import AccountPopover from './components/AccountPopover'
import NotificationsPopover from './components/NotificationsPopover';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

interface IserAppBarProps {
  isSidebarOpen: boolean
}

const IserAppBarStyle = styled(AppBar)<IserAppBarProps>`
  backdrop-filter: blur(6px);
  box-shadow: none;
  -webkit-backdrop-filter: blur(6px);
  background-color: ${({ theme })  => alpha(theme.palette.background.default, 0.72)};
  ${({ theme, isSidebarOpen }) => isSidebarOpen && `${theme.breakpoints.up('lg')} {
    width: calc(100% - ${DRAWER_WIDTH + 1}px);
  `}
`

const IserToolbar = styled(Toolbar)(( { theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

const IconButtonStyle = styled(IconButton)(( { theme }) => ({
  marginRight: theme.spacing(1),
  color: theme.palette.text.primary,
}));

// ----------------------------------------------------------------------

interface DashboardNavbar {
  onTriggerSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function IserAppBar({ onTriggerSidebar, isSidebarOpen }: DashboardNavbar) {
  return (
    <IserAppBarStyle isSidebarOpen={isSidebarOpen}>
      <IserToolbar>
        <IconButtonStyle onClick={onTriggerSidebar}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButtonStyle>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
            <LanguagePopover />
            <NotificationsPopover />
            <AccountPopover />
        </Stack>
      </IserToolbar>
    </IserAppBarStyle>
  );
}

IserAppBar.whyDidYouRender = true;
