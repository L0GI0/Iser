import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'rootStore/rootReducer'
import { useStateChangeNotifier } from 'features/notifiers/useStateChangeNotifiers';
import {
  getUsersTableStateSnackbarMap,
  getDeleteUserStateSnackbarMap,
  getBanUserStateSnackbarMap,
  getUnbanUserStateSnackbarMap,
  getChangeUserPermissionsStateSnackbarMap
} from 'features/notifiers/useStateChangeNotifiers';
import {
  Outlet
} from "react-router-dom";
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const UsersRoute = (): JSX.Element => {

  const { iserReactiveState } = useSelector((state: RootState) => state.iserReducer);
  const dispatch = useDispatch()
  const { t } = useTranslation(['users', 'notifiers']);

  useStateChangeNotifier(
    iserReactiveState.fetchUsers.reqStatus,
    getUsersTableStateSnackbarMap(dispatch, t));
  
  useStateChangeNotifier(
    iserReactiveState.deleteUser.reqStatus,
    getDeleteUserStateSnackbarMap(dispatch, t, iserReactiveState.deleteUser.reqStatusResponse?.emailAddress ?? 'unknown')
    );
    
  useStateChangeNotifier(iserReactiveState.banUser.reqStatus,
    getBanUserStateSnackbarMap(dispatch, t, iserReactiveState.banUser.reqStatusResponse?.emailAddress ?? 'unknown')
    );

  useStateChangeNotifier(iserReactiveState.unbanUser.reqStatus,
    getUnbanUserStateSnackbarMap(dispatch, t, iserReactiveState.unbanUser.reqStatusResponse?.emailAddress ?? 'unknown')
    );

  useStateChangeNotifier(iserReactiveState.changePermissions.reqStatus,
    getChangeUserPermissionsStateSnackbarMap(dispatch, t, iserReactiveState.changePermissions.reqStatusResponse?.emailAddress ?? 'unknown')
    );
    

  return <Outlet />
};

UsersRoute.whyDidYouRender = true;

export default UsersRoute;
