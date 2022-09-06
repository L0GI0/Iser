import { filter } from 'lodash';
import { useEffect, useState } from 'react';
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
import Label from 'common/components/Label';
import Scrollbar from 'common/components/Scrollbar';
import Iconify from 'common/components/Iconify';
import SearchNotFound from 'common/components/SearchNotFound';
import { RootState } from 'rootStore/rootReducer';
import LoadingBackdrop from 'common/components/backdrops/LoadingBackdrop';
import { User as IserUser } from 'features/iser/store/iserSlice';
import { languages } from 'features/iser/dashboard/components/LanguagePopover'
import { useTranslation, TFunction } from 'react-i18next';
import UserListToolbar from './UserListToolbar';
import UserMoreMenu from './UserMoreMenu';
import UserListHead from './UsersListHead';
import { UserListHeadProps } from './UsersListHead';

// ----------------------------------------------------------------------

export interface TableHeadType {
  id: keyof IserUser,
  label: string,
  alignRight: boolean
};

const ISER_USERS_TABLE_HEAD: TableHeadType[] = [
  { id: 'firstName', label: 'First Name', alignRight: false },
  { id: 'lastName', label: 'Last Name', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'language', label: 'Language', alignRight: false },
  { id: 'location', label: 'Location', alignRight: false },
  { id: 'userType', label: 'Type', alignRight: false },
  { id: 'userStatus', label: 'Status', alignRight: false },
];

export const getIserUserTableHead= (t: TFunction<'users'>): TableHeadType[]  => (
  [
    { id: 'firstName', label: t('table_users.table_head.table_column.first_name'), alignRight: false },
    { id: 'lastName', label: t('table_users.table_head.table_column.last_name'), alignRight: false },
    { id: 'role', label: t('table_users.table_head.table_column.role'), alignRight: false },
    { id: 'language', label: t('table_users.table_head.table_column.language'), alignRight: false },
    { id: 'location', label: t('table_users.table_head.table_column.location'), alignRight: false },
    { id: 'userType', label: t('table_users.table_head.table_column.location'), alignRight: false },
    { id: 'userStatus', label: t('table_users.table_head.table_column.status'), alignRight: false },
  ]
)

type Comparator = (a: IserUser, b: IserUser, orderBy?: keyof Omit<IserUser, 'birthDate'>) => number;

const descendingComparator: Comparator = (a, b, orderBy = 'firstName') => {

  if(a[orderBy] && b[orderBy]){
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
  }
  return 0;
}

function getComparator(order: UserListHeadProps['order'], orderBy: keyof Omit<IserUser, 'birthDate'>) {
  return order === 'desc'
    ? (a: IserUser, b: IserUser) => descendingComparator(a, b, orderBy)
    : (a: IserUser, b: IserUser) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array: IserUser[], comparator: Comparator, query: string) {
  const stabilizedThis = array.map((el: IserUser, index: number): [IserUser, number] => [el, index]);
  stabilizedThis.sort((a: [IserUser, number], b: [IserUser, number]) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el: [IserUser, number]) => el[0]);
}

const UsersTable = () => {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<UserListHeadProps['order']>('asc');

  const [selected, setSelected] = useState<Array<string>>([]);

  const [orderBy, setOrderBy] = useState<keyof Omit<IserUser, 'birthDate'>>('firstName');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { users, iserReactiveState: { areUsersFetching } } = useSelector((state: RootState) => state.iserReducer);

  const { t } = useTranslation('users');

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = users.map((user) => user.userId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, userId: string) => {
    const selectedIndex = selected.indexOf(userId);
    let newSelected: Array<string> = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, userId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event: any) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
      <Container>
        <LoadingBackdrop open={areUsersFetching}>
          <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
            <Typography variant='h4' gutterBottom>
              { t('label_users_screen') }
            </Typography>
            <Button variant='contained' component={RouterLink} to='#' startIcon={<Iconify icon='eva:plus-fill' />}>
              { t('button_add_user') }
            </Button>
          </Stack>

          <Card sx={{ padding: 0 }}>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={getIserUserTableHead(t)}
                    rowCount={users.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: IserUser) => {
                      const { userId, userType, userStatus, firstName, lastName, role, location, language } = row;
                      const isItemSelected = selected.indexOf(userId) !== -1;

                      return (
                        <TableRow
                          hover
                          key={userId}
                          tabIndex={-1}
                          role='checkbox'
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding='checkbox' >
                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, userId)} />
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            <Stack direction='row' alignItems='center' spacing={2}>
                              <Avatar alt={firstName} src={'/static/mock-images/avatars/avatar_1.jpg'} />
                              <Typography variant='subtitle2' noWrap>
                                {firstName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align='left'>{ lastName }</TableCell>
                          <TableCell align='left'>{ role }</TableCell>
                          <TableCell align='center'>{ 
                            <Box component='img' alt={languages[language].label} sx={{ width: 24 }} src={languages[language].icon} />}
                          </TableCell>
                        <TableCell align='left'>{ location }</TableCell>
                          <TableCell align='left'>
                             <Label variant='outlined' color={(userType === 'admin' && 'warning') || 'info'}>
                              <Typography variant='body2' >
                                { userType }
                              </Typography>
                            </Label>
                          </TableCell>
                          <TableCell align='left'>
                            <Label variant='filled' color={(userStatus === 'banned' && 'error') || 'success'}>
                              <Typography variant='button' >
                                { userStatus }
                              </Typography>
                            </Label>
                          </TableCell>

                          <TableCell align='right'>
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align='center' colSpan={9} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              labelRowsPerPage={t('table_users.table_pagination.text_rows_per_page')}
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </LoadingBackdrop>
      </Container>
  );
}

export default UsersTable;