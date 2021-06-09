import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface accountInitialStateParams {
  accessToken: string | null;
  isLoggingIn: boolean;
}

const accountInitialState: accountInitialStateParams = {
  accessToken: null,
  isLoggingIn: false,
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
      console.log(
        `User ${action.payload.accountLogin} logging = ${state.isLoggingIn}`
      );
    },

    logInDone(state): void {
      state.accessToken = "loggedIn";
      state.isLoggingIn = false;
      console.log("Log in done");
      console.log(`Is logging = ${state.isLoggingIn}`);
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
