import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaletteMode } from '@mui/material';
import {
  reactiveStateDefaultValue,
} from "common/constants";
import { profileInitialState, userInitialState, RequestError } from 'rootStore/common';

// ----------------------------------------------------------------------

interface AccountReactiveState {
   logIn: ReactiveRequestState,
   signUp: ReactiveRequestState<Pick<User, 'emailAddress'>>,
   profileUpdate: ReactiveRequestState
}

interface AccountInitialStateParams {
  accessToken: string | null,
  themeMode: PaletteMode,
  profile: Profile,
  user: Omit<User, 'userId'>
}

interface AccountActionsState {
  isLoggedIn: boolean,
  accountReactiveState: AccountReactiveState
}

interface LogInPayload {
  tokens: {
    accessToken: string,
    refreshToken: string
  }
  account: Omit<Account, 'userId'>
}

export interface AccountPayloadIn {
  accountLogin: string,
  accountPassword: string
}



const accountInitialReactiveState = {
  logIn: reactiveStateDefaultValue,
  signUp: {
    ...reactiveStateDefaultValue,
    reqStatusResponse: {
      'emailAddress': ''
    }
  },
  profileUpdate: reactiveStateDefaultValue
}

type AccountState = AccountInitialStateParams & AccountActionsState & { accountReactiveState: AccountReactiveState } & { profile: Profile }

const accountInitialState: AccountState = {
  accessToken: null,
  isLoggedIn: false,
  accountReactiveState: accountInitialReactiveState,
  themeMode: 'light',
  profile: profileInitialState,
  user: userInitialState
};

const accountSlice = createSlice({
  name: "accountSlice",
  initialState: accountInitialState,
  reducers: {
    logIn(state: AccountState, action: PayloadAction<AccountPayloadIn>) {
      state.accountReactiveState.logIn.reqStatus = null;
      state.accountReactiveState.logIn.isRequesting = true;
    },

    logInDone(state: AccountState, action: PayloadAction<LogInPayload>) {
      state.accessToken = action.payload.tokens.accessToken;

      state.profile.firstName = action.payload.account.firstName;
      state.profile.lastName = action.payload.account.lastName;
      state.profile.gender = action.payload.account.gender;
      state.profile.birthDate = action.payload.account.birthDate;
      state.profile.location = action.payload.account.location;
      state.profile.language = action.payload.account.language;
      state.profile.role = action.payload.account.role;

      state.user.emailAddress = action.payload.account.emailAddress;
      state.user.userStatus = action.payload.account.userStatus;
      state.user.userType = action.payload.account.userType;
      
      state.accountReactiveState.logIn.reqStatus = "success";
      state.isLoggedIn = true;
      state.accountReactiveState.logIn.isRequesting = false;
    },

    logInFail(state: AccountState, action: PayloadAction<RequestError>){
      state.accountReactiveState.logIn.reqStatus = action.payload.error.response.requestStatus;
      state.accountReactiveState.logIn.isRequesting = false;
    },

    logInCancel(state: AccountState){
      state.accountReactiveState.logIn.isRequesting = false;
    },

    signUp(state: AccountState, action: PayloadAction<AccountPayloadIn & { userType: AccountType } >) {
      state.accountReactiveState.signUp.reqStatus = null;
      state.accountReactiveState.signUp.isRequesting = true;
    },

    signUpDone(state: AccountState) {
      state.accountReactiveState.signUp.isRequesting = false;
      state.accountReactiveState.signUp.reqStatus = 'success';
    },

    signUpFail(state: AccountState, action: PayloadAction<RequestError>){
      state.accountReactiveState.signUp.isRequesting = false;
      state.accountReactiveState.signUp.reqStatus = action.payload.error.response.requestStatus;
      state.accountReactiveState.signUp.reqStatusResponse = action.payload.error.response.user;
    },

    signUpCancel(state: AccountState){
      state.accountReactiveState.signUp.isRequesting = false;
    },

    authenticate(){
    },

    authenticated(state: AccountState, action: PayloadAction<any>) {
    },

    logOut(state){
      state.isLoggedIn = false;
      state.accessToken = null;
      state.accountReactiveState = accountInitialReactiveState;
    },

    refreshToken(){
    },

    refreshTokenFailed(state: AccountState) {
    },

    refreshTokenDone(state, action: PayloadAction<LogInPayload & { user: { userType: AccountType }}>) {
      state.accessToken = action.payload.tokens.accessToken;
      state.user.userType = action.payload.user.userType;
    },

    clearSignUpStatus(state: AccountState) {
      state.accountReactiveState.signUp.reqStatus = null;
    },

    clearLogInStatus(state: AccountState) {
      state.accountReactiveState.logIn.reqStatus = null;
    },

    clearProfileUpdateStatus(state: AccountState) {
      state.accountReactiveState.profileUpdate.reqStatus = null;
    },

    updateProfile(state: AccountState, action: PayloadAction<Profile>) {
      state.accountReactiveState.profileUpdate.isRequesting = true;
    },

    profileUpdated(state: AccountState, action: PayloadAction<Profile>) {
      state.profile.firstName = action.payload.firstName;
      state.profile.lastName = action.payload.lastName;
      state.profile.gender = action.payload.gender;
      state.profile.birthDate = action.payload.birthDate;
      state.profile.location = action.payload.location;
      state.profile.language = action.payload.language;
      state.profile.role = action.payload.role;

      state.accountReactiveState.profileUpdate.reqStatus = 'success';
      state.accountReactiveState.profileUpdate.isRequesting = false;
    },

    profileUpdateFailed(state: AccountState, action: PayloadAction<RequestError>) {
      state.accountReactiveState.profileUpdate.isRequesting= false;
      state.accountReactiveState.profileUpdate.reqStatus = "failed";
    },

    profileUpdateCancel(state: AccountState){
      state.accountReactiveState.profileUpdate.isRequesting = false;
      state.accountReactiveState.profileUpdate.reqStatus = null;
    },

    setThemeMode(state, action: PayloadAction<AccountInitialStateParams['themeMode']>) {
      state.themeMode = action.payload;
    }
  },
});                                         

const accountActionCreators = accountSlice.actions;

const {
  logIn,
  logInDone,
  logInFail,
  logInCancel,
  signUp,
  signUpDone,
  signUpFail,
  signUpCancel,
  clearSignUpStatus,
  clearLogInStatus,
  clearProfileUpdateStatus,
  authenticate,
  logOut,
  refreshToken,
  refreshTokenFailed,
  refreshTokenDone,
  authenticated,
  updateProfile,
  profileUpdated,
  profileUpdateFailed,
  profileUpdateCancel,
  setThemeMode } = accountActionCreators;

const logInActionCreators = { logIn: accountSlice.actions.logIn, logInDone: accountSlice.actions.logInDone, logInFail: accountSlice.actions.logInFail }
const signUpActionCreators = { signUp: accountSlice.actions.signUp, signUpDone: accountSlice.actions.signUpDone, signUpFail: accountSlice.actions.signUpFail }
const profileActionCreatos = { updateProfile: accountSlice.actions.updateProfile, profileUpdated: accountSlice.actions.profileUpdated, profileUpdateFailed: accountSlice.actions.profileUpdateFailed } 

const asyncActionCreators = {
  ...logInActionCreators,
  ...signUpActionCreators,
  ...profileActionCreatos,
  authenticate: accountSlice.actions.authenticate,
  refreshToken: accountSlice.actions.refreshToken,
  logOut: accountSlice.actions.logOut
}

const accountReducer = accountSlice.reducer;

export { asyncActionCreators }
export { accountActionCreators };
export { 
  logIn,
  logInDone,
  logInFail,
  logInCancel,
  signUp,
  signUpDone,
  signUpFail,
  signUpCancel,
  clearSignUpStatus,
  clearLogInStatus,
  clearProfileUpdateStatus,
  profileUpdateCancel,
  authenticate, 
  logOut,
  refreshToken,
  refreshTokenFailed,
  refreshTokenDone,
  authenticated,
  updateProfile,
  profileUpdated,
  profileUpdateFailed,
  setThemeMode
};
export type accountState = ReturnType<typeof accountReducer>;
export default accountReducer;
