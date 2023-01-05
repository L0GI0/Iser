import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  reactiveStateDefaultValue,
} from "common/constants";
import { AjaxError } from "rxjs/ajax";

// ----------------------------------------------------------------------

interface IserReactiveState {
  fetchUsers: ReactiveRequestState
  deleteUser: ReactiveRequestState<Pick<User, 'emailAddress'>>,
  banUser: ReactiveRequestState<Pick<User, 'emailAddress'>>,
  unbanUser: ReactiveRequestState<Pick<User, 'emailAddress'>>
  changePermissions: ReactiveRequestState<Pick<User, 'emailAddress'>>
}

interface IserState {
  users: Account[],
  iserReactiveState: IserReactiveState
}

export interface RequestError {
  error: AjaxError
}

export const userRequestsDefaultState: ReactiveRequestState<Pick<User, 'emailAddress'>> = {
  ...reactiveStateDefaultValue,
  reqStatusResponse: {
    'emailAddress': ''
  }
}  

const accountInitialState: IserState = {
  users: [],
  iserReactiveState: {
    fetchUsers: reactiveStateDefaultValue,
    deleteUser: userRequestsDefaultState,
    banUser: userRequestsDefaultState,
    unbanUser: userRequestsDefaultState,
    changePermissions: userRequestsDefaultState
  }
};

const iserSlice = createSlice({
  name: "iserSlice",
  initialState: accountInitialState,
  reducers: {
    fetchUsers(state: IserState) {
      state.iserReactiveState.fetchUsers.isRequesting = true;
    },

    fetchUsersDone(state: IserState, action: PayloadAction<{ users: Account[]}>) {
      state.iserReactiveState.fetchUsers.isRequesting = false;
      state.users = action.payload.users
    },

    fetchUsersFail(state: IserState) {
      state.iserReactiveState.fetchUsers.isRequesting = false;
      state.iserReactiveState.fetchUsers.reqStatus = 'failed';

    },

    clearFetchUsersStatus(state: IserState) {
      state.iserReactiveState.fetchUsers.reqStatus = null;
    },

    deleteUser(state: IserState, action: PayloadAction<Pick<User, 'userId'>>){},

    userDeleted(state: IserState, action: PayloadAction<{ user: Pick<User, 'emailAddress'>}>) {
      state.iserReactiveState.deleteUser.reqStatusResponse = action.payload.user;
      state.iserReactiveState.deleteUser.reqStatus = 'success';
    },

    deleteUserFail(state: IserState, action: PayloadAction<RequestError>){
      state.iserReactiveState.deleteUser = action.payload.error.response?.requestStatus ?? 'failed';
    },

    clearDeleteUserStatus(state: IserState) {
      state.iserReactiveState.deleteUser.reqStatus = null;
      state.iserReactiveState.deleteUser.reqStatusResponse = null;
    },

    banUser(state: IserState, action: PayloadAction<Pick<User, 'userId'>>){},

    userBanned(state, action: PayloadAction<{ user: Pick<User, 'emailAddress'>}>) {
      state.iserReactiveState.banUser.reqStatusResponse = action.payload.user;
      state.iserReactiveState.banUser.reqStatus = 'success';
    },

    banUserFail(state: IserState, action: PayloadAction<RequestError>){
      state.iserReactiveState.banUser.reqStatus = action.payload.error.response?.requestStatus ?? 'failed';
    },

    clearBanUserStatus(state: IserState) {
      state.iserReactiveState.banUser.reqStatus = null;
      state.iserReactiveState.banUser.reqStatusResponse = null;
    },

    unbanUser(state: IserState, action: PayloadAction<Pick<User, 'userId'>>){},

    userUnbanned(state: IserState, action: PayloadAction<{ user: Pick<User, 'emailAddress'>}>) {
      state.iserReactiveState.unbanUser.reqStatusResponse = action.payload.user;
      state.iserReactiveState.unbanUser.reqStatus = 'success';
    },

    unbanUserFail(state: IserState, action: PayloadAction<RequestError>){
      state.iserReactiveState.unbanUser.reqStatus = action.payload.error.response?.requestStatus ?? 'failed';

    },

    clearUnbanUserStatus(state: IserState) {
      state.iserReactiveState.unbanUser.reqStatus = null;
      state.iserReactiveState.unbanUser.reqStatusResponse = null;
    },

    changeUserPermissions(state: IserState, action: PayloadAction<Pick<User, 'userId' | 'userType'>>){},

    userPermissionsChanged(state: IserState, action: PayloadAction<{ user: Pick<User, 'emailAddress'>}>) {
      state.iserReactiveState.changePermissions.reqStatusResponse = action.payload.user;
      state.iserReactiveState.changePermissions.reqStatus = 'success';
    },

    userPermissionChangeFailed(state: IserState, action: PayloadAction<RequestError>){
      state.iserReactiveState.changePermissions.reqStatus = action.payload.error.response?.requestStatus ?? 'failed';

    },

    clearChangeUserPermissionsStatus(state: IserState) {
      state.iserReactiveState.changePermissions.reqStatus = null;
      state.iserReactiveState.changePermissions.reqStatusResponse = null;
    },
},
});                                         

const iserActionCreators = iserSlice.actions;

const {
  fetchUsers,
  fetchUsersDone,
  fetchUsersFail,
  clearFetchUsersStatus,
  deleteUser,
  userDeleted,
  deleteUserFail,
  clearDeleteUserStatus,
  banUser,
  userBanned,
  banUserFail,
  clearBanUserStatus,
  unbanUser,
  userUnbanned,
  unbanUserFail,
  clearUnbanUserStatus,
  changeUserPermissions,
  userPermissionsChanged,
  userPermissionChangeFailed,
  clearChangeUserPermissionsStatus
} = iserActionCreators;

const fetchUsersActionCreators = {
  fetchUsers: iserSlice.actions.fetchUsers,
  fetchUsersDone: iserSlice.actions.fetchUsersDone,
  fetchUsersFail: iserSlice.actions.fetchUsersFail,
deleteUser: iserSlice.actions.deleteUser,
  userDeleted: iserSlice.actions.userDeleted,
  deleteUserFail: iserSlice.actions.deleteUserFail
}

const asyncActionCreators = { ...fetchUsersActionCreators }

const iserReducer = iserSlice.reducer;

export { asyncActionCreators }
export { iserActionCreators };
export { 
  fetchUsers,
  fetchUsersDone,
  fetchUsersFail,
  deleteUser,
  userDeleted,
  deleteUserFail,
  clearDeleteUserStatus,
  banUser,
  userBanned,
  clearBanUserStatus,
  banUserFail,
  clearFetchUsersStatus,
  unbanUser,
  userUnbanned,
  unbanUserFail,
  clearUnbanUserStatus,
  changeUserPermissions,
  userPermissionsChanged,
  userPermissionChangeFailed,
  clearChangeUserPermissionsStatus
  };
export type iserState = ReturnType<typeof iserReducer>;
export default iserReducer;
