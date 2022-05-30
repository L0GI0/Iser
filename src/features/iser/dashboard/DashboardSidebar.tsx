import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styled from 'styled-components'
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
import account from '_mocks/account';
import useResponsive from 'common/utils/useResponsive';
import Scrollbar from 'common/components/Scrollbar';
import Iconify from "common/components/Iconify";
import NavSection from './NavSection';
import getNavConfig from './NavConfig';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

interface RootStyleProps {
  isSidebarOpen: boolean
} 

const RootStyle = styled('div')<RootStyleProps>(({ isSidebarOpen }) => ({
  ...(isSidebarOpen && {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  }),
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
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

interface DashboardSidebarProps {
  isSidebarOpen: boolean,
  onCloseSidebar: () => void,
  onOpenSidebar: () => void
}

export default function DashboardSidebar({ isSidebarOpen, onCloseSidebar, onOpenSidebar }: DashboardSidebarProps) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  const { t } = useTranslation('dashboard');

  useEffect(() => {
    if (isSidebarOpen && !isDesktop) {
      onCloseSidebar();
    }

    if(!isSidebarOpen && isDesktop){
      onOpenSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isDesktop]);

  const renderContent = (
    <SidebarScrollbar>
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
       < Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {account.displayName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={getNavConfig(t)} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <Box
            component="img"
            src="/static/illustrations/illustration_logio_av.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              {t('contact_section.text_contact_me')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Michal Pabjan
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              048 721 546 994
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
          <Button sx={{ margin: 0 }}startIcon={<Iconify icon={'akar-icons:github-fill'} />} href="https://github.com/L0GI0" target="_blank" variant="contained">
            Github
          </Button>
          <Button startIcon={<Iconify icon={'akar-icons:linkedin-box-fill'}/>}href="" target="_blank" variant="contained">
            Linkedin
          </Button>
          </Box>

        </Stack>
      </Box>

    </SidebarScrollbar>
  );

  return (
    <RootStyle isSidebarOpen={isSidebarOpen}>
      {!isDesktop && (
        <Drawer
          open={isSidebarOpen}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open={isSidebarOpen}
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
