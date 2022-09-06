import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "features/account/store/accountSlice";
import iserReducer from "features/iser/store/iserSlice";
import notifiersReducer from "features/notifiers/store/notifiersSlice";

// ----------------------------------------------------------------------

export const combinedReducer = combineReducers({
  accountReducer,
  iserReducer,
  notifiersReducer
});

export type RootState = ReturnType<typeof combinedReducer>;
