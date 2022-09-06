import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Iconify from 'common/components/Iconify';

// ----------------------------------------------------------------------

const UserMoreMenu: React.FC = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation('users');

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
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline"/>
          </ListItemIcon>
          <ListItemText primary={t('table_users.table_cell_menu.delete')} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill"/>
          </ListItemIcon>
          <ListItemText primary={t('table_users.table_cell_menu.edit')} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserMoreMenu;
