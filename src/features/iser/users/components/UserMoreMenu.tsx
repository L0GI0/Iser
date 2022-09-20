import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { deleteUser, banUser } from 'features/iser/store/iserSlice';
import { triggerNotification } from "features/notifiers/store/notifiersSlice";
import { getDeleteUserStateSnackbarMap, getBanUserStateSnackbarMap, useStateChangeNotifier } from 'features/notifiers/useStateChangeNotifiers';
import { RootState } from 'rootStore/rootReducer';
import Iconify from 'common/components/Iconify';
import AuthorisedFeature from 'common/components/AuthorisedFeature';

// ----------------------------------------------------------------------

interface UserMoreMenuProps {
  userId: User['userId'];
  userEmail: User['emailAddress']
}

const UserMoreMenu: React.FC<UserMoreMenuProps> = ({ userId, userEmail}) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const { t } = useTranslation(['users', 'notifiers']);

  const onDeleteUser = () => {
    dispatch(triggerNotification());
    dispatch(deleteUser({ userId: userId }));
    setIsOpen(false);
  }

  const onBanUser = () => {
    dispatch(triggerNotification());
    dispatch(banUser({ userId: userId }));
    setIsOpen(false);
  }
  
  const onEditUser = () => {
    setIsOpen(false);
  }

  const onShowUser = () => {
    setIsOpen(false);
  }

  const { requestStatus} = useSelector((state: RootState) => state.iserReducer);

  useStateChangeNotifier(requestStatus.deleteUser, getDeleteUserStateSnackbarMap(dispatch, t, userEmail));
  useStateChangeNotifier(requestStatus.banUser, getBanUserStateSnackbarMap(dispatch, t, userEmail));

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
      }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <AuthorisedFeature tooltipSettings={{placement: 'right'}}>
          <MenuItem sx={{ color: 'error.main' }} onClick={onDeleteUser}>
            <ListItemIcon>
              <Iconify icon="eva:trash-2-outline" sx={{ color: 'error.main'}}/>
            </ListItemIcon>
            <ListItemText primary={t('table_users.table_cell_menu.delete')} primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
          </AuthorisedFeature>

        <AuthorisedFeature tooltipSettings={{placement: 'right'}}>
          <MenuItem sx={{ color: 'warning.main' }} onClick={onBanUser}>
            <ListItemIcon>
              <Iconify icon="ion:ban-sharp" sx={{ color: 'warning.main'}}/>
            </ListItemIcon>
            <ListItemText primary={t('table_users.table_cell_menu.ban')} primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        </AuthorisedFeature>

        <AuthorisedFeature tooltipSettings={{placement: 'right'}}>
          <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={onEditUser}>
            <ListItemIcon>
              <Iconify icon="eva:edit-fill"/>
            </ListItemIcon>
            <ListItemText primary={t('table_users.table_cell_menu.edit')} primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        </AuthorisedFeature>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={onShowUser}>
            <ListItemIcon>
              <Iconify icon="eva:person-fill"/>
            </ListItemIcon>
            <ListItemText primary={t('table_users.table_cell_menu.show')} primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>

      </Menu>
    </>
  );
}

export default UserMoreMenu;
