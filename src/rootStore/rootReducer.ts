import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "features/account/store/accountSlice";
import notifiersReducer from "features/notifiers/store/notifiersSlice";

// ----------------------------------------------------------------------

export const combinedReducer = combineReducers({
  accountReducer,
  notifiersReducer
});

export type RootState = ReturnType<typeof combinedReducer>;
