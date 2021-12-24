import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "features/account/store/accountSlice";

export const combinedReducer = combineReducers({
  accountReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;
