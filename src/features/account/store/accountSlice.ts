import { createSlice, PayloadAction, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { VariantType, useSnackbar } from 'notistack';
import { stat } from "fs";
import { AjaxError } from "rxjs/ajax";

type AccountType = 'admin' | 'user'

interface AccountInitialStateParams {
  accessToken: string | null;
  accountType: AccountType;
}

export type RequestStatus = 'success' | 'unauthorized' | 'failed';

export const REQUEST_STATUS: Record<RequestStatus, RequestStatus> = {
  success: 'success',
  unauthorized: 'unauthorized',
  failed: 'failed'
}

interface AccountActionsState {
  isFetching: boolean;
  isLoggingIn: boolean;
  isLoggedIn: boolean;
  accountEpicRequestError: string
  requestStatus: {
    signUp: RequestStatus | null,
    signIn: RequestStatus | null
  }
  users: any,
}

interface SinInPayload {
  accessToken: string;
}

export interface AccountPayloadIn {
  accountLogin: string;
  accountPassword: string;
}



export interface AccountPayloadError {
  error: AjaxError;
}


const accountInitialState: AccountInitialStateParams & AccountActionsState = {
  accessToken: null,
  accountType: 'user',
  isLoggedIn: false,
  isLoggingIn: false,
  isFetching: false,
  accountEpicRequestError: "",
  requestStatus: {
    signUp: null,
    signIn: null,
  },
  users: null,
};

const accountSlice = createSlice({
  name: "accountSlice",
  initialState: accountInitialState,
  reducers: {
    logIn(state, action: PayloadAction<AccountPayloadIn>) {
      state.requestStatus.signIn = null;
      state.isLoggingIn = true;
    },

    logInDone(state, action: PayloadAction<SinInPayload>) {
      state.accessToken = action.payload.accessToken;
      state.isLoggingIn = false;
      state.isLoggedIn = true;
      state.requestStatus.signIn = 'success';
      console.log(`Log in done = the access token is = ${state.accessToken}`)
    },

    logInFail(state, action: PayloadAction<AccountPayloadError>){

      const signInError = action.payload.error;

      console.log(`Log in failed = ${JSON.stringify(signInError)}`)

      if(signInError.status === 401)
        state.requestStatus.signIn = 'unauthorized'
      else 
        state.requestStatus.signIn = 'failed';

      state.isLoggingIn = false;

    },

    signUp(state, action: PayloadAction<AccountPayloadIn & { accountType: AccountType } >) {
      state.requestStatus.signUp = null;
      state.isFetching = true;
    },

    signUpDone(state) {
      state.isFetching = false;
      state.requestStatus.signUp = 'success';
    },

    signUpFail(state, action: PayloadAction<AccountPayloadError>){
      // state.accountEpicRequestError = action.payload.message;
      state.isFetching = false;
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
      console.log(`Refreshing the token`);
    },

    refreshTokenFailed(state, action: PayloadAction<AccountPayloadError>) {
    },

    refreshTokenDone(state, action: PayloadAction<SinInPayload>) {
      console.log(`Prev token = ${state.accessToken}`)
      state.accessToken = action.payload.accessToken;
      console.log(`New token = ${action.payload.accessToken}`)
      console.log(`Token refreshed`);
    },

    clearSignUpStatus(state) {
      state.requestStatus.signUp = null;
    },

    clearSignInStatus(state) {
      state.requestStatus.signIn = null;
    }
  },
});

const accountActionCreators = accountSlice.actions;

const { logIn, logInDone, logInFail, signUp, signUpDone, signUpFail, clearSignUpStatus, clearSignInStatus, authenticate, logOut, refreshToken, refreshTokenFailed, refreshTokenDone, authenticated } = accountActionCreators;

const logInActionCreators = { logIn: accountSlice.actions.logIn, logInDone: accountSlice.actions.logInDone, logInFail: accountSlice.actions.logInDone }
const signUpActionCreators = { signUp: accountSlice.actions.signUp, signUpDone: accountSlice.actions.signUpDone, signUpFail: accountSlice.actions.signUpDone }

const asyncActionCreators = { ...logInActionCreators, ...signUpActionCreators, authenticate: accountSlice.actions.authenticate, refreshToken: accountSlice.actions.refreshToken}

const accountReducer = accountSlice.reducer;

export { asyncActionCreators }
export { accountActionCreators };
export { logIn, logInDone, logInFail, signUp, signUpDone, signUpFail,  clearSignUpStatus, clearSignInStatus, authenticate, logOut, refreshToken, refreshTokenFailed, refreshTokenDone, authenticated };
export type accountState = ReturnType<typeof accountReducer>;
export default accountReducer;
