import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AjaxError } from "rxjs/ajax";
import { PaletteMode } from '@mui/material';
import {
  reactiveStateDefaultValue,
} from "common/constants";
import { LANGUAGES } from 'common/constants';
import { USER_TYPE, USER_STATUS } from '../contants';
import { GENDER } from 'features/iser/profile/constants';

// ----------------------------------------------------------------------

interface AccountReactiveState {
   logIn: ReactiveRequestState,
   signUp: ReactiveRequestState,
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


export interface AccountPayloadError {
  error: AjaxError
}

export const userInitialState = {
    emailAddress: '',
    userType: USER_TYPE.user,
    userStatus: USER_STATUS.active
}

export const profileInitialState = {
    firstName: "",
    lastName: "",
    gender: GENDER.other,
    birthDate: new Date('01/01/1990'),
    location: "",
    language: LANGUAGES["en-GB"].value,
    role: ""
}

const accountInitialReactiveState = {
  logIn: reactiveStateDefaultValue,
  signUp: reactiveStateDefaultValue,
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

    logInFail(state: AccountState, action: PayloadAction<AccountPayloadError>){
      state.accountReactiveState.logIn.reqStatus = action.payload.error.response.requestStatus;
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

    signUpFail(state: AccountState, action: PayloadAction<AccountPayloadError>){
      state.accountReactiveState.signUp.isRequesting = false;
      state.accountReactiveState.signUp.reqStatus = 'failed';
    },

    signUpCancel(){

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

    refreshTokenFailed(state: AccountState, action: PayloadAction<AccountPayloadError>) {
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
      state.accountReactiveState.profileUpdate.isRequesting = false;
      state.profile.firstName = action.payload.firstName;
      state.profile.lastName = action.payload.lastName;
      state.profile.gender = action.payload.gender;
      state.profile.birthDate = action.payload.birthDate;
      state.profile.location = action.payload.location;
      state.profile.language = action.payload.language;
      state.profile.role = action.payload.role;

      state.accountReactiveState.profileUpdate.reqStatus = 'success';

    },

    profileUpdateFailed(state: AccountState, action: PayloadAction<AccountPayloadError>) {
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
export { logIn,
  logInDone,
  logInFail,
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
  setThemeMode };
export type accountState = ReturnType<typeof accountReducer>;
export default accountReducer;
