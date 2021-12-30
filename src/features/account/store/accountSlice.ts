import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VariantType, useSnackbar } from 'notistack';
import { stat } from "fs";

interface accountInitialStateParams {
  accessToken: string | null;
  role: string;
}

type RequestStatus = 'SUCCESS' | 'UNAUTHORIZED' | 'FAIL';

const REQUEST_STATUS: Record<string, RequestStatus> = {
 success: 'SUCCESS',
 unauth: 'UNAUTHORIZED',
 fail: 'FAIL'
}

interface accountActionsState {
  isFetching: boolean;
  isLoggingIn: boolean;
  accountEpicRequestError: string
  requestStatus: RequestStatus | null
}

interface sinInPayload {
  accessToken: string;
}

export interface accountPayloadIn {
  accountLogin: string;
  accountPassword: string;
}

export interface accountPayloadOut {
  error: string;
}


const accountInitialState: accountInitialStateParams & accountActionsState = {
  accessToken: null,
  role: "admin",

  isLoggingIn: false,
  isFetching: false,
  accountEpicRequestError: "",
  requestStatus: null
};

const accountSlice = createSlice({
  name: "accountSlice",
  initialState: accountInitialState,
  reducers: {
    logIn(state, action: PayloadAction<accountPayloadIn>): void {
      state.isLoggingIn = true;
    },

    logInDone(state, action: PayloadAction<accountPayloadIn & sinInPayload & accountPayloadOut>): void {
      state.accessToken = action.payload.accessToken;
      state.isLoggingIn = false;
    },

    logInFail(state, action: PayloadAction<accountPayloadIn & sinInPayload & accountPayloadOut>): void {},

    signUp(state, action: PayloadAction<accountPayloadIn>): void {
      console.log('signUp action dispatched');
      state.isFetching = true;
      console.log(`isFetching = ${state.isFetching}`)
    },

    signUpDone(state, action: PayloadAction<accountPayloadIn & accountPayloadOut>): void {
      state.isFetching = false;
      console.log(`isFetching in done = ${state.isFetching}`)
      state.requestStatus = 'SUCCESS';
    },

    signUpFail(state, action: PayloadAction<accountPayloadIn & accountPayloadOut>): void {
      state.accountEpicRequestError = action.payload.error;
      state.isFetching = false;
      state.requestStatus = 'FAIL';
      console.log(`isFetching in fail = ${state.isFetching}`)
    },

    clearRequestStatus(state): void {
      state.requestStatus = null;
    }
  },
});

const accountActionCreators = accountSlice.actions;

const { logIn, logInDone, logInFail, signUp, signUpDone, signUpFail, clearRequestStatus } = accountActionCreators;

const logInActionCreators = { logIn: accountSlice.actions.logIn, logInDone: accountSlice.actions.logInDone, logInFail: accountSlice.actions.logInDone}
const signUpActionCreators = { signUp: accountSlice.actions.signUp, signUpDone: accountSlice.actions.signUpDone, signUpFail: accountSlice.actions.signUpDone}

const asyncActionCreators = { ...logInActionCreators, ...signUpActionCreators}

const accountReducer = accountSlice.reducer;

export { asyncActionCreators }
export { accountActionCreators };
export { logIn, logInDone, logInFail, signUp, signUpDone, signUpFail, clearRequestStatus };
export type accountState = ReturnType<typeof accountReducer>;
export default accountReducer;
