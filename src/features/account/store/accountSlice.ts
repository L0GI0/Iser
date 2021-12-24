import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface accountInitialStateParams {
  accessToken: string | null;
  role: string;
}

interface accountActionsState {
  isFetching: boolean;
  isLoggingIn: boolean;
  accountEpicRequestError: string
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
  isLoggingIn: false,
  isFetching: false,
  role: "admin",
  accountEpicRequestError: ""
};

const accountSlice = createSlice({
  name: "accountSlice",
  initialState: accountInitialState,
  reducers: {
    logIn(state, action: PayloadAction<accountPayloadIn>): void {
      state.isLoggingIn = true;
    },

    logInDone(state, action: PayloadAction<accountPayloadIn & sinInPayload & accountPayloadOut>): void {
      console.log(`Action payload = ${action.payload.accessToken}`);
      state.accessToken = action.payload.accessToken;
      state.isLoggingIn = false;
    },

    logInFail(state, action: PayloadAction<accountPayloadIn & sinInPayload & accountPayloadOut>): void {},

    signUp(state, action: PayloadAction<accountPayloadIn>): void {
      console.log('signUp action dispatched');
      state.isFetching = true;
    },

    signUpDone(state, action: PayloadAction<accountPayloadIn & accountPayloadOut>): void {
      state.isFetching = false;
    },

    signUpFail(state, action: PayloadAction<accountPayloadIn & accountPayloadOut>): void {
      state.accountEpicRequestError = action.payload.error;
      state.isFetching = false;
    },
  },
});

const accountActionCreators = accountSlice.actions;
const { logIn, logInDone, logInFail, signUp, signUpDone, signUpFail } = accountActionCreators;
const accountReducer = accountSlice.reducer;

export { accountActionCreators };
export { logIn, logInDone, logInFail, signUp, signUpDone, signUpFail };
export type accountState = ReturnType<typeof accountReducer>;
export default accountReducer;
