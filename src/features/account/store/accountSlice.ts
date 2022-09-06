import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AjaxError } from "rxjs/ajax";
import { PaletteMode } from '@mui/material';
import { Languages } from 'features/iser/dashboard/components/LanguagePopover';
import { GENDERS } from 'features/iser/profile/constants';

// ----------------------------------------------------------------------

export type AccountType = 'admin' | 'user'

interface AccountInitialStateParams {
  accessToken: string | null;
  accountType: AccountType;
  themeMode: PaletteMode;
}

export interface Profile {
  firstName: string,
  lastName: string,
  gender: typeof GENDERS[number],
  birthDate: Date | null,
  location: string,
  language: Languages
  role: string
}

export type RequestStatus = 'success' | 'unauthorized' | 'failed';

export const REQUEST_STATUS: Record<RequestStatus, RequestStatus> = {
  success: 'success',
  unauthorized: 'unauthorized',
  failed: 'failed'
}

interface AccountActionsState {
  isLoggedIn: boolean;
  accountEpicRequestError: string
  requestStatus: {
    signUp: RequestStatus | null,
    signIn: RequestStatus | null,
    profileUpdate: RequestStatus | null,
  },
}

interface ReactiveAccountState {
  isLoggingIn: boolean,
  isSigningUp: boolean,
  isUpdating: boolean,
}

interface SinInPayload {
  tokens: {
    accessToken: string;
    refreshToken: string;
  }
  profile: Profile
}

export interface AccountPayloadIn {
  accountLogin: string;
  accountPassword: string;
}


export interface AccountPayloadError {
  error: AjaxError;
}

const accountInitialState: AccountInitialStateParams & AccountActionsState & { accountReactiveState: ReactiveAccountState } & { profile: Profile } = {
  accessToken: null,
  accountType: 'user',
  isLoggedIn: false,
  accountReactiveState: {
    isSigningUp: false,
    isLoggingIn: false,
    isUpdating: false
  },
  accountEpicRequestError: "",
  requestStatus: {
    signUp: null,
    signIn: null,
    profileUpdate: null,
  },
  themeMode: 'light',
  
  profile: {
    firstName: "",
    lastName: "",
    gender: "Other",
    birthDate: new Date('01/01/1990'),
    location: "",
    language: "en-GB",
    role: ""
  }
};

const accountSlice = createSlice({
  name: "accountSlice",
  initialState: accountInitialState,
  reducers: {
    logIn(state, action: PayloadAction<AccountPayloadIn>) {
      state.requestStatus.signIn = null;
      state.accountReactiveState.isLoggingIn = true;
    },

    logInDone(state, action: PayloadAction<SinInPayload>) {
      state.accessToken = action.payload.tokens.accessToken;
      state.accountReactiveState.isLoggingIn = false;
      state.isLoggedIn = true;
      state.requestStatus.signIn = 'success';

      state.profile.firstName = action.payload.profile.firstName;
      state.profile.lastName = action.payload.profile.lastName;
      state.profile.gender = action.payload.profile.gender;
      state.profile.birthDate = action.payload.profile.birthDate;
      state.profile.location = action.payload.profile.location;
      state.profile.language = action.payload.profile.language;
      state.profile.role = action.payload.profile.role;
    },

    logInFail(state, action: PayloadAction<AccountPayloadError>){

      const signInError = action.payload.error;

      if(signInError.status === 401)
        state.requestStatus.signIn = 'unauthorized'
      else 
        state.requestStatus.signIn = 'failed';

      state.accountReactiveState.isLoggingIn = false;
    },

    signUp(state, action: PayloadAction<AccountPayloadIn & { accountType: AccountType } >) {
      state.requestStatus.signUp = null;
      state.accountReactiveState.isSigningUp = true;
    },

    signUpDone(state) {
      state.accountReactiveState.isSigningUp = false;
      state.requestStatus.signUp = 'success';
    },

    signUpFail(state, action: PayloadAction<AccountPayloadError>){
      state.accountReactiveState.isSigningUp = false;
      state.requestStatus.signUp = 'failed';
    },

    authenticate(state){
    },

    authenticated(state, action: PayloadAction<any>) {
    },

    logOut(state){
      state.isLoggedIn = false;
      state.accessToken = null;
    },

    refreshToken(state){
    },

    refreshTokenFailed(state, action: PayloadAction<AccountPayloadError>) {
    },

    refreshTokenDone(state, action: PayloadAction<SinInPayload>) {
      state.accessToken = action.payload.tokens.accessToken;
    },

    clearSignUpStatus(state) {
      state.requestStatus.signUp = null;
    },

    clearSignInStatus(state) {
      state.requestStatus.signIn = null;
    },

    clearProfileUpdateStatus(state) {
      state.requestStatus.profileUpdate = null;
    },

    updateProfile(state, action: PayloadAction<Profile>) {
      state.accountReactiveState.isUpdating = true;
    },

    profileUpdated(state, action: PayloadAction<Profile>) {
      state.accountReactiveState.isUpdating = false;
      state.profile.firstName = action.payload.firstName;
      state.profile.lastName = action.payload.lastName;
      state.profile.gender = action.payload.gender;
      state.profile.birthDate = action.payload.birthDate;
      state.profile.location = action.payload.location;
      state.profile.language = action.payload.language;
      state.profile.role = action.payload.role;

      state.requestStatus.profileUpdate = 'success';

    },

    profileUpdateFailed(state, action: PayloadAction<AccountPayloadError>) {
      state.accountReactiveState.isUpdating = false;
      state.requestStatus.profileUpdate = "failed";
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
  clearSignUpStatus,
  clearSignInStatus,
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
  setThemeMode } = accountActionCreators;

const logInActionCreators = { logIn: accountSlice.actions.logIn, logInDone: accountSlice.actions.logInDone, logInFail: accountSlice.actions.logInFail }
const signUpActionCreators = { signUp: accountSlice.actions.signUp, signUpDone: accountSlice.actions.signUpDone, signUpFail: accountSlice.actions.signUpFail }
const profileActionCreatos = { updateProfile: accountSlice.actions.updateProfile, profileUpdated: accountSlice.actions.profileUpdated, profileUpdateFailed: accountSlice.actions.profileUpdateFailed } 

const asyncActionCreators = { ...logInActionCreators, ...signUpActionCreators, ...profileActionCreatos, authenticate: accountSlice.actions.authenticate, refreshToken: accountSlice.actions.refreshToken}

const accountReducer = accountSlice.reducer;

export { asyncActionCreators }
export { accountActionCreators };
export { logIn,
  logInDone,
  logInFail,
  signUp,
  signUpDone,
  signUpFail,
  clearSignUpStatus,
  clearSignInStatus,
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
  setThemeMode };
export type accountState = ReturnType<typeof accountReducer>;
export default accountReducer;
