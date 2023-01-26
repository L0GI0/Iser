import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import {
  deleteUser,
  banUser,
  clearDeleteUserStatus,
  clearBanUserStatus,
  clearUnbanUserStatus,
  unbanUser,
  fetchUsers
} from 'features/iser/store/iserSlice';
import { triggerNotification } from "features/notifiers/store/notifiersSlice";
import Iconify from 'common/components/Iconify';
import AuthorisedFeature from 'common/components/AuthorisedFeature';
import ConfirmationDialog from '../../../../common/components/ConfirmationDialog';

// ----------------------------------------------------------------------

interface UserMoreMenuProps {
  userId: User['userId'],
  userStatus: User['userStatus'],
}

const UserMoreMenu: React.FC<UserMoreMenuProps> = ({ userId, userStatus }) => {
  const ref = useRef(null);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const { t } = useTranslation(['users', 'notifiers']);

  const onDeleteUser = async () => {
    dispatch(triggerNotification());
    dispatch(clearDeleteUserStatus());
    await dispatch(deleteUser({ userId: userId }));
    dispatch(fetchUsers())
    setIsOpen(false);
  }

  const onBanUser = async () => {
    dispatch(triggerNotification());
    dispatch(clearBanUserStatus());
    await dispatch(banUser({ userId: userId }));
    dispatch(fetchUsers())
    setIsOpen(false);
  }

  const onUnbanUser = async () => {
    dispatch(triggerNotification());
    dispatch(clearUnbanUserStatus());
    await dispatch(unbanUser({ userId: userId }));
    dispatch(fetchUsers())
    setIsOpen(false);
  }
  
  const onEditUser = () => {
    setIsOpen(false);
  }

  const onShowUser = () => {
    setIsOpen(false);
  }

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
          <MenuItem sx={{ color: 'error.main' }} onClick={() => setIsDeleteConfirmModalOpen(true)}>
            <ListItemIcon>
              <Iconify icon="heroicons-outline:user-remove" sx={{ color: 'error.main'}}/>
            </ListItemIcon>
            <ListItemText primary={t('table_users.table_cell_menu.delete')} primaryTypographyProps={{ variant: 'body1' }} />
          </MenuItem>
          <ConfirmationDialog
            dialogTitle={'Delete user'}
            dialogContent={"Once you delete the account, there is no going back. Please be certain."}
            dialogActions={{
              confirm: { text: 'Delete user', variant: 'outlined', color: 'error'},
              cancel: { text: 'Cancel', variant: 'text', color: 'warning' }
            }}
            dialogState={[isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen]}
            onConfirm={onDeleteUser}
          />
          </AuthorisedFeature>

        <AuthorisedFeature tooltipSettings={{placement: 'right'}}>
          {(userStatus === 'active') ?
          <MenuItem sx={{ color: 'warning.main' }} onClick={onBanUser}>
            <ListItemIcon>
              <Iconify icon="iconoir:remove-user" sx={{ color: 'warning.main'}}/>
            </ListItemIcon>
            <ListItemText primary={t('table_users.table_cell_menu.ban')} primaryTypographyProps={{ variant: 'body1' }} />
          </MenuItem> :
          <MenuItem sx={{ color: 'success.main' }} onClick={onUnbanUser}>
            <ListItemIcon>
              <Iconify icon="bx:user-check" sx={{ color: 'success.main'}}/>
            </ListItemIcon>
            <ListItemText primary={t('table_users.table_cell_menu.unban')} primaryTypographyProps={{ variant: 'body1' }} />
          </MenuItem>
          }
        </AuthorisedFeature>

        <AuthorisedFeature tooltipSettings={{placement: 'right'}}>
          <MenuItem component={RouterLink}  to={`/iser/users/edit/${userId}`} onClick={onEditUser}>
            <ListItemIcon>
              <Iconify icon="la:user-edit"/>
            </ListItemIcon>
            <ListItemText primary={t('table_users.table_cell_menu.edit')} primaryTypographyProps={{ variant: 'body1' }} />
          </MenuItem>
        </AuthorisedFeature>

        <MenuItem component={RouterLink} to={`/iser/users/${userId}`} onClick={onShowUser}>
            <ListItemIcon>
              <Iconify icon="carbon:user-avatar-filled-alt"/>
            </ListItemIcon>
            <ListItemText primary={t('table_users.table_cell_menu.show')} primaryTypographyProps={{ variant: 'body1' }} />
          </MenuItem>

      </Menu>
    </>
  );
}

export default UserMoreMenu;
