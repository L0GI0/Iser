import { combineEpics, createEpicMiddleware } from "redux-observable";
import {
  AccountEpicActions,
  accountEpic,
} from "features/account/store/accountEpic";
import { RootState } from "./rootReducer";

export const rootEpic = combineEpics(accountEpic);

type EpicMiddlewareRoot = AccountEpicActions;

// type EpicMiddlewareRoot =
//   | DashboardEpicsAction
//   | DocumentsEpicsAction
//   | PermitsEpicsAction
//   | UsersEpicsAction
//   | CurrentSessionEpicsAction
//   | LabelsEpicsAction
//   | UserRegistrationEpicsAction;

export const epicMiddleware =
  createEpicMiddleware<EpicMiddlewareRoot, EpicMiddlewareRoot, RootState>();
