import { Toolbar, Box, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment } from '@mui/material';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Iconify from 'common/components/Iconify';
import AuthorisedFeature from 'common/components/AuthorisedFeature';

// ----------------------------------------------------------------------

interface UsersToolbarProps {
  areUsersSelected: boolean
}

const UserListToolbarContainer = styled(Toolbar)<UsersToolbarProps>(({ theme, areUsersSelected }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
  ...(areUsersSelected && {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.lighter
  })
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320 },
}));

// ----------------------------------------------------------------------

interface UserListToolbarProps {
  numSelected: number,
  filterName: string,
  onFilterName: (event: any) => void
}

const UserListToolbar: React.FC<UserListToolbarProps> = ({ numSelected, filterName, onFilterName }) => {

  const { t } = useTranslation("users");

  return (
    <UserListToolbarContainer areUsersSelected={numSelected > 0}>
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} {' '} {t('table_users.table_toolbar.text_selcted_users')} 
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder={t('table_users.table_toolbar.input_search_user')}
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      <Box sx={{ mr: 2 }}>  
        { numSelected > 0 ? (
          <AuthorisedFeature>
            <Tooltip title={t('table_users.table_toolbar.tooltip_delete_selected_users')}>
              <IconButton>
                <Iconify sx={{ color: 'primary.main' }}icon="eva:trash-2-fill" />
              </IconButton>
            </Tooltip>
          </AuthorisedFeature>
        ) : (
          <Tooltip title={t('table_users.table_toolbar.tooltip_filter_list')} >
            <IconButton>
              <Iconify icon="ic:round-filter-list" />
            </IconButton>
          </Tooltip>)}
      </Box>
    </UserListToolbarContainer>
  );
}

export default UserListToolbar;