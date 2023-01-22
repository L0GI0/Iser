import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { useTranslation, TFunction } from 'react-i18next';
import Scrollbar from 'common/components/Scrollbar';
import Iconify from 'common/components/Iconify';
import SearchNotFound from 'common/components/SearchNotFound';
import { RootState } from 'rootStore/rootReducer';
import LoadingBackdrop from 'common/components/backdrops/LoadingBackdrop';
import AuthorisedFeature from 'common/components/AuthorisedFeature';
import { fetchUsers } from 'features/iser/store/iserSlice';
import UserListToolbar from './UserListToolbar';
import UserListHead from './UsersListHead';
import { UserListHeadProps } from './UsersListHead';
import UserTableRow from './UserTableRow';

// ----------------------------------------------------------------------

export interface TableHeadType {
  id: keyof Account | 'name',
  label: string,
  alignRight: boolean
};

export const getUserTableHead= (t: TFunction<['users', 'notifiers']>): TableHeadType[]  => (
  [
    { id: 'emailAddress', label: t('table_users.table_head.table_column.email'), alignRight: false },
    { id: 'name', label: t('table_users.table_head.table_column.full_name'), alignRight: false },
    { id: 'role', label: t('table_users.table_head.table_column.role'), alignRight: false },
    { id: 'language', label: t('table_users.table_head.table_column.language'), alignRight: false },
    { id: 'location', label: t('table_users.table_head.table_column.location'), alignRight: false },
    { id: 'userType', label: t('table_users.table_head.table_column.type'), alignRight: false },
    { id: 'userStatus', label: t('table_users.table_head.table_column.status'), alignRight: false },
  ]
)

type Comparator = (a: Account, b: Account, orderBy?: keyof Omit<Account, 'birthDate'>) => number;

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

function getComparator(order: UserListHeadProps['order'], orderBy: keyof Omit<Account, 'birthDate'>) {
  return order === 'desc'
    ? (a: Account, b: Account) => descendingComparator(a, b, orderBy)
    : (a: Account, b: Account) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array: Account[], comparator: Comparator, query: string) {
  const stabilizedThis = array.map((el: Account, index: number): [Account, number] => [el, index]);
  stabilizedThis.sort((a: [Account, number], b: [Account, number]) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user: Account) => {
      if(_user.firstName)
        return _user.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.emailAddress.toLowerCase().indexOf(query.toLowerCase()) !== -1;;
      
      return _user.emailAddress.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    })
  }
  return stabilizedThis.map((el: [Account, number]) => el[0]);
}

const UsersTable = () => {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<UserListHeadProps['order']>('asc');

  const [selected, setSelected] = useState<Array<string>>([]);

  const [orderBy, setOrderBy] = useState<keyof Omit<Account, 'birthDate'>>('firstName');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();

  const { t } = useTranslation(['users', 'notifiers']);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [])

  const { users, iserReactiveState: { fetchUsers: { isRequesting } } } = useSelector((state: RootState) => state.iserReducer);

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = users.map((user: Account) => user.userId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleRowSelect = (event: any, userId: string) => {
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
      <Container maxWidth={false}>
          <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
            <Typography variant='h4' gutterBottom>
              { t('label_users_screen') }
            </Typography>
            <AuthorisedFeature>
              <Button variant='contained' component={RouterLink} to='#' startIcon={<Iconify icon='ri:user-add-line' />}>
                { t('button_add_user') }
              </Button>
            </AuthorisedFeature>
          </Stack>

          <Card sx={{ padding: 0 }}>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <LoadingBackdrop open={isRequesting}>
            <Scrollbar>
              <TableContainer>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={getUserTableHead(t)}
                    rowCount={users.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: Account) => {
                      const { userId } = row;
                      const isItemSelected = selected.indexOf(userId) !== -1;
                      return (
                        <UserTableRow user={row} isItemSelected={isItemSelected} handleRowSelect={handleRowSelect}/>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={9} />
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
              </LoadingBackdrop>
          </Card>
      </Container>
  );
}

UsersTable.whyDidYouRender = true;

export default UsersTable;
