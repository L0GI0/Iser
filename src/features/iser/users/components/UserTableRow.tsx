import { ChangeEvent } from 'react';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { useTranslation, TFunction } from 'react-i18next';
import Label from 'common/components/Label';
import Scrollbar from 'common/components/Scrollbar';
import Iconify from 'common/components/Iconify';
import SearchNotFound from 'common/components/SearchNotFound';
import { RootState } from 'rootStore/rootReducer';
import LoadingBackdrop from 'common/components/backdrops/LoadingBackdrop';
import { LANGUAGES } from 'common/constants';
import AuthorisedFeature from 'common/components/AuthorisedFeature';
import { fetchUsers } from 'features/iser/store/iserSlice';
import UserListToolbar from './UserListToolbar';
import UserMoreMenu from './UserMoreMenu';
import UserListHead from './UsersListHead';
import { UserListHeadProps } from './UsersListHead';

// ----------------------------------------------------------------------

interface UserTableRowProps {
  user: Account,
  isItemSelected: boolean,
  handleRowSelect: (event: ChangeEvent<HTMLInputElement>, userId: Account['userId']) => void
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user: { userId, firstName, lastName, emailAddress, role, location, language, userType, userStatus},
  isItemSelected,
  handleRowSelect
}) => {



  return (<>
  <TableRow
    hover
    key={userId}
    tabIndex={-1}
    role='checkbox'
    selected={isItemSelected}
    aria-checked={isItemSelected}
  >
    <TableCell padding='checkbox' >
      <Checkbox checked={isItemSelected} onChange={(event) => handleRowSelect(event, userId)} />
    </TableCell>
    <TableCell component='th' scope='row' sx={{maxWidth: '600px'}} >
      <Stack direction='row' alignItems='center' spacing={2}>
        <Avatar alt={firstName} src={'/static/mock-images/avatars/avatar_1.jpg'} />
        <Typography variant='subtitle2' noWrap>
          { emailAddress }
        </Typography>
      </Stack>
    </TableCell>
    <TableCell align='left'>{ (firstName ?? '') + ' ' + (lastName ?? '') }</TableCell>
    <TableCell align='left'>{ role }</TableCell>
    <TableCell align='center'>{ 
      <Box component='img' alt={language && LANGUAGES[language].label} sx={{ width: 24 }} src={language && LANGUAGES[language].icon} />}
    </TableCell>
  <TableCell align='left'>{ location }</TableCell>
    <TableCell align='left'>
      <Label skinVariant='outlined' color={(userType === 'admin' && 'warning') || 'info'}>
        <Typography variant='label' >
          { userType }
          </Typography>
      </Label>
  </TableCell>
    <TableCell align='left'>
      <Label color={(userStatus === 'banned' && 'error') || 'success'}>
        <Typography variant='label' >
          { userStatus }
        </Typography>
      </Label>
    </TableCell>
    <TableCell align='right'>
      <UserMoreMenu
        userId={userId}
        userStatus={userStatus}/>
    </TableCell>
  </TableRow>
  </>)
}

export default UserTableRow;
