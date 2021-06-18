import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface accountInitialStateParams {
  accessToken: string | null;
  isLoggingIn: boolean;
  role: string;
}

const accountInitialState: accountInitialStateParams = {
  accessToken: null,
  isLoggingIn: false,
  role: "admin",
};

interface logInPayload {
  accountLogin: string;
  accountPassword: string;
}

const accountSlice = createSlice({
  name: "accountSlice",
  initialState: accountInitialState,
  reducers: {
    logIn(state, action: PayloadAction<logInPayload>): void {
      state.isLoggingIn = true;
    },

    logInDone(state, action: PayloadAction<any>): void {
      console.log(`Action payload = ${action.payload.accessToken}`);
      state.accessToken = action.payload.accessToken;
      state.isLoggingIn = false;
    },

    logInFail(state): void {},
  },
});

const accountActionCreators = accountSlice.actions;
const { logIn, logInDone, logInFail } = accountActionCreators;
const accountReducer = accountSlice.reducer;

export { accountActionCreators };
export { logIn, logInDone, logInFail };
export type accountState = ReturnType<typeof accountReducer>;
export default accountReducer;
