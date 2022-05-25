import styled from "styled-components";
import { alpha } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import Iconify from "common/components/Iconify";
import Searchbar from "./Searchbar";
import LanguagePopover from "./LanguagePopover";
import AccountPopover from './AccountPopover'

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const IserAppBarStyle = styled(AppBar)`
  backdrop-filter: blur(6px);
  box-shadow: none;
  -webkit-backdrop-filter: blur(6px);
  background-color: ${({ theme })  => alpha(theme.palette.background.default, 0.72)};
  ${({ theme }) => theme.breakpoints.up('lg')} {
    width: calc(100% - ${DRAWER_WIDTH + 1}px);
  }
`

const IserToolbar = styled(Toolbar)(( { theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));
   
const SidebarIconButtonStyle = styled(IconButton)(( { theme }) => ({
  marginRight: theme.spacing(1),
  color: theme.palette.text.primary,
  [theme.breakpoints.up('lg')]: {
    display: 'none'
  }
}));

// ----------------------------------------------------------------------

interface DashboardNavbar {
  onOpenSidebar: () => void;
}

export default function IserAppBar({ onOpenSidebar }: DashboardNavbar) {
  return (
    <IserAppBarStyle>
      <IserToolbar>
        <SidebarIconButtonStyle onClick={onOpenSidebar}>
          <Iconify icon="eva:menu-2-fill" />
        </SidebarIconButtonStyle>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
           <LanguagePopover />
           <AccountPopover />
        </Stack>
      </IserToolbar>
    </IserAppBarStyle>
  );
}
