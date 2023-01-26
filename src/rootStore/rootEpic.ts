import { combineEpics, createEpicMiddleware } from "redux-observable";
import {
  AccountEpicActions,
  accountEpic,
} from "features/account/store/accountEpic";
import { Subject, Observable, EMPTY } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators'
import {
  IserEpicActions, iserEpic
} from 'features/iser/store/iserEpic';
import { RootState } from "./rootReducer";

// ----------------------------------------------------------------------

export type RootActions = AccountEpicActions | IserEpicActions;

export const allActions$ = new Subject();

export const tapAllActions = (action$: Observable<RootActions>) =>
  action$.pipe(tap(allActions$), concatMap(() => EMPTY));

export const rootEpic = combineEpics<RootActions, RootActions, RootState>(accountEpic, iserEpic, tapAllActions);

export const epicMiddleware = createEpicMiddleware<RootActions, RootActions, RootState>();
