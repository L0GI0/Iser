import { useEffect, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import styled from 'styled-components'
import { NavigationItem } from 'features/iser/layout/NavConfig'
import Iconify from 'common/components/Iconify';

// ----------------------------------------------------------------------

interface ListItemProps {
  isOpen: boolean
}

const ListItem = styled((props) => <ListItemButton disableGutters {...props} />)<ListItemProps>(({ theme, isOpen }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  ...(isOpen && {
    color: theme.palette.action.active,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  })
}));

const ListItemIconStyle = styled(ListItemIcon)`
  svg {
    width: 22px;
    height: 22px;
  }
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center
`

// ----------------------------------------------------------------------

interface NavItemProps { 
  item: NavigationItem,
  active: (path: string) => boolean,
  isCollapse: boolean,
}

const NavItem = ({ item, active, isCollapse }: NavItemProps) => {

  const isActiveRoot = active(item.path);

  const { title, path, icon, info, children } = item;

  const [open, setOpen] = useState(isActiveRoot);

  useEffect(() => {
      setOpen(isActiveRoot)
  }, [active])

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    return (
      <>
        <ListItem
          isOpen={open}
          onClick={handleOpen}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify
            icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item: NavigationItem) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItem
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: (theme) => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItem
      component={RouterLink}
      to={path}
      isOpen={open}>
        <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
        {!isCollapse && (
        <>
          <ListItemText disableTypography primary={title} />
          { info && info }
        </>)}
    </ListItem>
  );
}

export default NavItem;
