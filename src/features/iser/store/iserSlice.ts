import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AjaxError } from "rxjs/ajax";
import { PaletteMode } from '@mui/material';
import { AccountType } from 'features/account/store/accountSlice'
import { Profile } from 'features/account/store/accountSlice';

// ----------------------------------------------------------------------

interface ReactiveIserState {
  areUsersFetching: boolean,
}

type UserStatus = 'active' | 'banned';

export interface User extends Profile {
  userId: string,
  emailAddress : string,
  userStatus: UserStatus,
  userType: AccountType,
}

interface IserState {
  users: User[],
  iserReactiveState: ReactiveIserState
}

export interface RequestError {
  error: AjaxError;
}

const accountInitialState: IserState = {
  users: [],
  iserReactiveState: {
    areUsersFetching: false
  }
};

const iserSlice = createSlice({
  name: "iserSlice",
  initialState: accountInitialState,
  reducers: {
    fetchUsers(state) {
      state.iserReactiveState.areUsersFetching = true;
    },

    fetchUsersDone(state, action: PayloadAction<{ users: User[]}>) {
      state.iserReactiveState.areUsersFetching = false;
      state.users = action.payload.users
    },

    fetchUsersFail(state, action: PayloadAction<RequestError>){
      state.iserReactiveState.areUsersFetching = false;
    },
  },
});                                         

const iserActionCreators = iserSlice.actions;

const {
  fetchUsers,
  fetchUsersDone,
  fetchUsersFail } = iserActionCreators;

const fetchUsersActionCreators = { fetchUsers: iserSlice.actions.fetchUsers, fetchUsersDone: iserSlice.actions.fetchUsersDone, fetchUsersFail: iserSlice.actions.fetchUsersFail }

const asyncActionCreators = { ...fetchUsersActionCreators }

const iserReducer = iserSlice.reducer;

export { asyncActionCreators }
export { iserActionCreators };
export { 
  fetchUsers,
  fetchUsersDone,
  fetchUsersFail };
export type iserState = ReturnType<typeof iserReducer>;
export default iserReducer;
