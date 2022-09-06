import { combineEpics, createEpicMiddleware } from "redux-observable";
import {
  AccountEpicActions,
  accountEpic,
} from "features/account/store/accountEpic";
import {
  IserEpicActions, iserEpic
} from 'features/iser/store/iserEpic';
import { RootState } from "./rootReducer";

// ----------------------------------------------------------------------

export type RootActions = AccountEpicActions | IserEpicActions;

export const rootEpic = combineEpics<RootActions, RootActions, RootState>(accountEpic, iserEpic);

export const epicMiddleware =
  createEpicMiddleware<RootActions, RootActions, RootState>();
