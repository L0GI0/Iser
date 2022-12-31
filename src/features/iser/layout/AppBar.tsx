import styled from "styled-components";
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import Iconify from "common/components/Iconify";
import { HEADER, SIDEBAR } from 'common/theme/config';
import Searchbar from "./components/Searchbar";
import LanguagePopover from "./components/LanguagePopover";
import AccountPopover from './components/AccountPopover'
import NotificationsPopover from './components/NotificationsPopover';
import stylesUtils from 'common/styles/stylesUtils';
import useResponsive from 'common/utils/useResponsive'; 

// ----------------------------------------------------------------------

interface IserAppBarStyleProps {
  isCollapse: boolean
}

const IserAppBarStyle = styled(AppBar)<IserAppBarStyleProps>(({theme, isCollapse}) => ({
    ...stylesUtils(theme).bgBlur(),
    boxShadow: 'none',
    height: HEADER.MOBILE_HEIGHT,
    zIndex: theme.zIndex.appBar + 1,
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shorter,
    }),
    [theme.breakpoints.up('lg')]: {
      height: HEADER.DESKTOP_HEIGHT,
      width: `calc(100% - ${SIDEBAR.WIDTH + 1}px)`,
      ...(isCollapse && {
        width: `calc(100% - ${SIDEBAR.COLLAPSE_WIDTH}px)`,
      })
    },
}))

const IserToolbar = styled(Toolbar)(( { theme }) => ({
  minHeight: HEADER.MOBILE_HEIGHT,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER.DESKTOP_HEIGHT,
    padding: theme.spacing(0, 5)
  }
}));

const IconButtonStyle = styled(IconButton)(( { theme }) => ({
  marginRight: theme.spacing(1),
  color: theme.palette.text.primary,
}));

// ----------------------------------------------------------------------

interface IserAppBarProps {
  onTriggerSidebar: () => void;
  isCollapse: boolean;
}

export default function IserAppBar({ onTriggerSidebar, isCollapse }: IserAppBarProps) {

  const isDesktop = useResponsive('up', 'lg');

  return (
    <IserAppBarStyle isCollapse={isCollapse}>
      <IserToolbar>
        {
          !isDesktop &&
          (<IconButtonStyle onClick={onTriggerSidebar}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonStyle>)
        }
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
