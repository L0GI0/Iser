import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  reactiveStateDefaultValue,
} from "common/constants";
import { profileInitialState, userInitialState, RequestError } from 'rootStore/common';

// ----------------------------------------------------------------------

interface IserReactiveState {
  fetchUsers: ReactiveRequestState
  fetchUser: ReactiveRequestState<Pick<User, 'emailAddress'>>
  updateUser: ReactiveRequestState<Pick<User, 'emailAddress'>>
  deleteUser: ReactiveRequestState<Pick<User, 'emailAddress'>>,
  banUser: ReactiveRequestState<Pick<User, 'emailAddress'>>,
  unbanUser: ReactiveRequestState<Pick<User, 'emailAddress'>>
  changePermissions: ReactiveRequestState<Pick<User, 'emailAddress'>>
}

interface IserState {
  users: Account[],
  targetUser: Account,
  iserReactiveState: IserReactiveState
}

export const userRequestsDefaultState: ReactiveRequestState<Pick<User, 'emailAddress'>> = {
  ...reactiveStateDefaultValue,
  reqStatusResponse: {
    'emailAddress': ''
  }
}  

const accountInitialState: IserState = {
  users: [],
  targetUser: {...userInitialState, ...profileInitialState, userId: ''},
  iserReactiveState: {
    fetchUsers: reactiveStateDefaultValue,
    fetchUser: userRequestsDefaultState,
    updateUser: userRequestsDefaultState,
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

    fetchUser(state: IserState, action: PayloadAction<Pick<User, 'userId'>>) {
      state.iserReactiveState.fetchUser.isRequesting = true;
    },

    fetchUserDone(state: IserState, action: PayloadAction<{ user: Account}>) {
      state.iserReactiveState.fetchUser.isRequesting = false;
      state.targetUser = action.payload.user
    },

    fetchUserFail(state: IserState, action: PayloadAction<RequestError>) {
      state.iserReactiveState.fetchUser.reqStatus = action.payload.error.response.requestStatus;
      state.iserReactiveState.fetchUser.reqStatusResponse = action.payload.error.response.user;
      state.iserReactiveState.fetchUser.isRequesting = false;
    },

    updateUser(state: IserState, action: PayloadAction<Profile & {userId: User['userId']}>) {
      state.iserReactiveState.updateUser.isRequesting = true;
    },

    updateUserDone(state: IserState, action: PayloadAction<Profile>) {
      state.targetUser.firstName = action.payload.firstName;
      state.targetUser.lastName = action.payload.lastName;
      state.targetUser.gender = action.payload.gender;
      state.targetUser.birthDate = action.payload.birthDate;
      state.targetUser.location = action.payload.location;
      state.targetUser.language = action.payload.language;
      state.targetUser.role = action.payload.role;

      state.iserReactiveState.updateUser.isRequesting = false;
      state.iserReactiveState.updateUser.reqStatus = 'success'; 
    },

    updateUserFail(state: IserState, action: PayloadAction<RequestError>) {
      state.iserReactiveState.updateUser.isRequesting = false;
      state.iserReactiveState.updateUser.reqStatusResponse = action.payload.error.response.user;
      state.iserReactiveState.updateUser.reqStatus = action.payload.error.response.requestStatus;;
    },

    clearFetchUsersStatus(state: IserState) {
      state.iserReactiveState.fetchUsers.reqStatus = null;
    },

    deleteUser(state: IserState, action: PayloadAction<Pick<User, 'userId'>>){
      state.iserReactiveState.fetchUser.isRequesting = true;
    },

    userDeleted(state: IserState, action: PayloadAction<{ user: Pick<User, 'emailAddress'>}>) {
      state.iserReactiveState.deleteUser.reqStatusResponse = action.payload.user;
      state.iserReactiveState.deleteUser.reqStatus = 'success';
      state.iserReactiveState.deleteUser.isRequesting = false;
    },

    deleteUserFail(state: IserState, action: PayloadAction<RequestError>){
      state.iserReactiveState.deleteUser.reqStatus = action.payload.error.response?.requestStatus ?? 'failed';
      state.iserReactiveState.deleteUser.isRequesting = false;
    },

    clearDeleteUserStatus(state: IserState) {
      state.iserReactiveState.deleteUser.reqStatus = null;
      state.iserReactiveState.deleteUser.reqStatusResponse = null;
      state.iserReactiveState.deleteUser.isRequesting = false;
    },

    banUser(state: IserState, action: PayloadAction<Pick<User, 'userId'>>){
      state.iserReactiveState.banUser.isRequesting = true;
    },

    userBanned(state, action: PayloadAction<{ user: Pick<User, 'emailAddress'>}>) {
      state.iserReactiveState.banUser.reqStatusResponse = action.payload.user;
      state.iserReactiveState.banUser.reqStatus = 'success';
      state.iserReactiveState.banUser.isRequesting = false;
    },

    banUserFail(state: IserState, action: PayloadAction<RequestError>){
      state.iserReactiveState.banUser.reqStatus = action.payload.error.response?.requestStatus ?? 'failed';
      state.iserReactiveState.banUser.isRequesting = false;
    },

    clearBanUserStatus(state: IserState) {
      state.iserReactiveState.banUser.reqStatus = null;
      state.iserReactiveState.banUser.reqStatusResponse = null;
      state.iserReactiveState.banUser.isRequesting = false;
    },

    unbanUser(state: IserState, action: PayloadAction<Pick<User, 'userId'>>){
      state.iserReactiveState.unbanUser.isRequesting = true;
    },

    userUnbanned(state: IserState, action: PayloadAction<{ user: Pick<User, 'emailAddress'>}>) {
      state.iserReactiveState.unbanUser.reqStatusResponse = action.payload.user;
      state.iserReactiveState.unbanUser.reqStatus = 'success';
      state.iserReactiveState.unbanUser.isRequesting = false;
    },

    unbanUserFail(state: IserState, action: PayloadAction<RequestError>){
      state.iserReactiveState.unbanUser.reqStatus = action.payload.error.response?.requestStatus ?? 'failed';
      state.iserReactiveState.unbanUser.isRequesting = false;
    },

    clearUnbanUserStatus(state: IserState) {
      state.iserReactiveState.unbanUser.reqStatus = null;
      state.iserReactiveState.unbanUser.reqStatusResponse = null;
      state.iserReactiveState.unbanUser.isRequesting = true;
    },

    changeUserPermissions(state: IserState, action: PayloadAction<Pick<User, 'userId' | 'userType'>>){
      state.iserReactiveState.changePermissions.isRequesting = true;
    },

    userPermissionsChanged(state: IserState, action: PayloadAction<{ user: Pick<User, 'emailAddress'>}>) {
      state.iserReactiveState.changePermissions.reqStatusResponse = action.payload.user;
      state.iserReactiveState.changePermissions.reqStatus = 'success';
      state.iserReactiveState.changePermissions.isRequesting = false;
    },

    userPermissionChangeFailed(state: IserState, action: PayloadAction<RequestError>){
      state.iserReactiveState.changePermissions.reqStatus = action.payload.error.response?.requestStatus ?? 'failed';
      state.iserReactiveState.changePermissions.isRequesting = false;
    },

    clearChangeUserPermissionsStatus(state: IserState) {
      state.iserReactiveState.changePermissions.reqStatus = null;
      state.iserReactiveState.changePermissions.reqStatusResponse = null;
      state.iserReactiveState.changePermissions.isRequesting = false;
    },
},
});                                         

const iserActionCreators = iserSlice.actions;

const {
  fetchUsers,
  fetchUsersDone,
  fetchUsersFail,
  fetchUser,
  fetchUserDone,
  fetchUserFail,
  updateUser,
  updateUserDone,
  updateUserFail,
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
  fetchUser,
  fetchUserDone,
  fetchUserFail,
  updateUser,
  updateUserDone,
  updateUserFail,
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
