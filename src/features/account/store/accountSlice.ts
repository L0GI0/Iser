import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VariantType, useSnackbar } from 'notistack';
import { stat } from "fs";
import { AjaxError } from "rxjs/ajax";

interface accountInitialStateParams {
  accessToken: string | null;
  role: string;
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
}

interface SinInPayload {
  accessToken: string;
}

export interface AccountPayloadIn {
  accountLogin: string;
  accountPassword: string;
}

export interface AccountPayloadOut {
  error: AjaxError;
}


const accountInitialState: accountInitialStateParams & AccountActionsState = {
  accessToken: null,
  role: "admin",
  isLoggedIn: false,
  isLoggingIn: false,
  isFetching: false,
  accountEpicRequestError: "",
  requestStatus: {
    signUp: null,
    signIn: null,
  }
};

const accountSlice = createSlice({
  name: "accountSlice",
  initialState: accountInitialState,
  reducers: {
    logIn(state, action: PayloadAction<AccountPayloadIn>): void {
      state.requestStatus.signIn = null;
      state.isLoggingIn = true;
    },

    logInDone(state, action: PayloadAction<SinInPayload>): void {
      state.accessToken = action.payload.accessToken;
      state.isLoggingIn = false;
      state.isLoggedIn = true;
      state.requestStatus.signIn = 'success';

    },

    logInFail(state, action: PayloadAction<AccountPayloadOut>): void {

      const signInError = action.payload.error;

      console.log(`Log in failed = ${JSON.stringify(signInError)}`)

      if(signInError.status === 401)
        state.requestStatus.signIn = 'unauthorized'
      else 
        state.requestStatus.signIn = 'failed';

      state.isLoggingIn = false;

    },

    signUp(state, action: PayloadAction<AccountPayloadIn>): void {
      state.requestStatus.signUp = null;
      state.isFetching = true;
    },

    signUpDone(state, action: PayloadAction<any>): void {
      state.isFetching = false;
      state.requestStatus.signUp = 'success';
    },

    signUpFail(state, action: PayloadAction<AccountPayloadOut>): void {
      // state.accountEpicRequestError = action.payload.message;
      state.isFetching = false;
      state.requestStatus.signUp = 'failed';
    },

    clearRequestStatus(state): void {
      state.requestStatus.signUp = null;
      state.requestStatus.signIn = null;
    },

    clearSignUpStatus(state): void {
      state.requestStatus.signUp = null;
    },

    clearSignInStatus(state): void {
      state.requestStatus.signIn = null;
    }
  },
});

const accountActionCreators = accountSlice.actions;

const { logIn, logInDone, logInFail, signUp, signUpDone, signUpFail, clearRequestStatus, clearSignUpStatus, clearSignInStatus } = accountActionCreators;

const logInActionCreators = { logIn: accountSlice.actions.logIn, logInDone: accountSlice.actions.logInDone, logInFail: accountSlice.actions.logInDone}
const signUpActionCreators = { signUp: accountSlice.actions.signUp, signUpDone: accountSlice.actions.signUpDone, signUpFail: accountSlice.actions.signUpDone}

const asyncActionCreators = { ...logInActionCreators, ...signUpActionCreators}

const accountReducer = accountSlice.reducer;

export { asyncActionCreators }
export { accountActionCreators };
export { logIn, logInDone, logInFail, signUp, signUpDone, signUpFail, clearRequestStatus,  clearSignUpStatus, clearSignInStatus  };
export type accountState = ReturnType<typeof accountReducer>;
export default accountReducer;
