import { matchPath, useLocation } from 'react-router-dom';
import { Box, List } from '@mui/material';
import { NavigationItem } from 'features/iser/layout/NavConfig';
import NavItem from './components/NavItem';

interface NavSectionProps {
  navConfig: Array<NavigationItem>,
  isCollapse: boolean
}

export default function NavSection({ navConfig, isCollapse, ...other }: NavSectionProps) {
  const { pathname } = useLocation();
  const match = (path: string) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} isCollapse={isCollapse} disabled={item.disabled ?? false}/>
        ))}
      </List>
    </Box>
  );
}
