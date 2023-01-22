import { useEffect, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Drawer, Stack, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import useResponsive from 'common/utils/useResponsive';
import Scrollbar from 'common/components/Scrollbar';
import { SIDEBAR } from 'common/theme/config';
import stylesUtils from 'common/styles/stylesUtils';
import NavSection from './NavSection';
import getNavConfig from './NavConfig';
import useCollapseDrawer from './useColapseDrawer';
import CollapseButton from './components/CollapseButton';
import SidebarAccount from './components/SidebarAccount';
import SidebarFooter from './components/SidebarFooter';
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------

const SidebarContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

const SidebarScrollbar = styled(Scrollbar)`
  height: 100vh;
  & .simplebar-content {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`

const Logo = styled(Box).attrs({ component: 'img', src: "/static/iser-logo.png"})`
  width: 40px;
  height: 40px
`

// ----------------------------------------------------------------------

interface SidebarProps {
  isSidebarOpen: boolean,
  isCollapse: boolean,
  onCloseSidebar: () => void,
}

const  Sidebar = memo(({ isSidebarOpen, onCloseSidebar }: SidebarProps) => {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  const { t } = useTranslation('dashboard');

  useEffect(() => {
    if (isSidebarOpen) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, ]);

  const renderContent = (
    <SidebarScrollbar>
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          ...(isCollapse && { alignItems: 'center' }),
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link underline="none" component={RouterLink} to="/iser/analytics">
            <Logo />
          </Link>
          {isDesktop && !isCollapse && (
            <CollapseButton onToggleCollapse={onToggleCollapse} collapseClick={collapseClick} />
          )}
        </Stack>
      </Stack>

      <SidebarAccount isCollapse={isCollapse}/>

      <NavSection navConfig={getNavConfig(t)} isCollapse={isCollapse}/>

      <Box sx={{ flexGrow: 1 }} />

      {!isCollapse && <SidebarFooter t={t}/>}
        
    </SidebarScrollbar>
  );

  return (
    <SidebarContainer
    sx={{
      width: {
        lg: isCollapse ? SIDEBAR.COLLAPSE_WIDTH : SIDEBAR.WIDTH,
      },
      ...(collapseClick && {
        position: 'absolute',
      }),
    }}
  >
    {!isDesktop && (
      <Drawer open={isSidebarOpen} onClose={onCloseSidebar} PaperProps={{ sx: { width: SIDEBAR.WIDTH } }}>
        {renderContent}
      </Drawer>
    )}

    {isDesktop && (
      <Drawer
        open
        variant="persistent"
        onMouseEnter={onHoverEnter}
        onMouseLeave={onHoverLeave}
        PaperProps={{sx: (theme) => ({
          width: SIDEBAR.WIDTH,
          borderRightStyle: 'dashed',
          bgcolor: 'background.default',
          transition: theme.transitions.create('width', {
              duration: theme.transitions.duration.standard,
            }),
          ...(isCollapse && {
            width: SIDEBAR.COLLAPSE_WIDTH,
          }),
          ...(collapseHover && {
            ...stylesUtils(theme).bgBlur(),
            boxShadow: theme.customShadows.z24,
          }),
        })}}
      >
        {renderContent}
      </Drawer>
    )}
  </SidebarContainer>);
});

Sidebar.whyDidYouRender = true;

export default Sidebar;
