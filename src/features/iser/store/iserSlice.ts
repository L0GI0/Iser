import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AjaxError } from "rxjs/ajax";

// ----------------------------------------------------------------------

interface ReactiveIserState {
  isFetchingUsers: boolean,
  isRemovingUser: boolean,
}

interface IserState {
  users: User[],
  iserReactiveState: ReactiveIserState,
  requestStatus: {
    fetchUsers: RequestStatus | null,
    deleteUser: RequestStatus | null,
    banUser: RequestStatus | null,
  },
}

export interface RequestError {
  error: AjaxError;
}

const accountInitialState: IserState = {
  users: [],
  iserReactiveState: {
    isFetchingUsers: false,
    isRemovingUser: false,
  },
  requestStatus: {
    fetchUsers:  null,
    deleteUser: null,
    banUser: null,
  },
};

const iserSlice = createSlice({
  name: "iserSlice",
  initialState: accountInitialState,
  reducers: {
    fetchUsers(state) {
      state.iserReactiveState.isFetchingUsers = true;
    },

    fetchUsersDone(state, action: PayloadAction<{ users: User[]}>) {
      state.iserReactiveState.isFetchingUsers = false;
      state.users = action.payload.users
    },

    fetchUsersFail(state, action: PayloadAction<RequestError>){
      state.iserReactiveState.isFetchingUsers = false;
    },

    clearFetchUsersStatus(state) {
      state.requestStatus.fetchUsers = null;
    },

    deleteUser(state, action: PayloadAction<Pick<User, 'userId'>>){
    },

    userDeleted(state, action: PayloadAction<any>) {
      state.requestStatus.deleteUser = 'success';
    },

    deleteUserFail(state, action: PayloadAction<RequestError>){
      state.requestStatus.deleteUser = action.payload.error.response?.requestStatus ?? 'failed';

    },

    clearDeleteUserStatus(state) {
      state.requestStatus.deleteUser = null;
    },

    banUser(state, action: PayloadAction<Pick<User, 'userId'>>){
    },

    userBanned(state, action: PayloadAction<any>) {
      state.requestStatus.banUser = 'success';
    },

    banUserFail(state, action: PayloadAction<RequestError>){
      state.requestStatus.banUser = action.payload.error.response?.requestStatus ?? 'failed';

    },

    clearBanUserStatus(state) {
      state.requestStatus.banUser = null;
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
  banUserFail } = iserActionCreators;

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
  banUserFail,
  clearFetchUsersStatus,
  };
export type iserState = ReturnType<typeof iserReducer>;
export default iserReducer;
