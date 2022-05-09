import { combineEpics, createEpicMiddleware } from "redux-observable";
import {
  AccountEpicActions,
  accountEpic,
} from "features/account/store/accountEpic";
import { RootState } from "./rootReducer";

// ----------------------------------------------------------------------

export const rootEpic = combineEpics(accountEpic);

type EpicMiddlewareRoot = AccountEpicActions;

export const epicMiddleware =
  createEpicMiddleware<EpicMiddlewareRoot, EpicMiddlewareRoot, RootState>();
