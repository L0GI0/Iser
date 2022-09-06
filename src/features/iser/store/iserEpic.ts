import { of} from "rxjs";
import { ActionCreator } from "@reduxjs/toolkit";
import { concatMap, catchError, mergeMap} from "rxjs/operators";
import { AjaxError } from "rxjs/ajax";
import { Epic, ofType, combineEpics } from "redux-observable";
import { RootState } from "rootStore/rootReducer";
import { ajaxApi } from "common/api/ajaxApi";
import { RootActions } from "rootStore/rootEpic";
import {
  fetchUsers,
  fetchUsersDone,
  fetchUsersFail
} from "./iserSlice";

// ----------------------------------------------------------------------

type ActionFromCreator<C extends ActionCreator<unknown>> = ReturnType<C>;

type CaseReducerRecord = Record<string, ActionCreator<unknown>>;
export type ActionFromCaseReducerActions<R extends CaseReducerRecord> =
  ActionFromCreator<R[keyof R]>;

type FetchUsersAction = ActionFromCreator<typeof fetchUsers>;
type FetchUsersCallbackActions = ActionFromCreator<typeof fetchUsersDone | typeof fetchUsersFail>;
type FetchUsersActions = FetchUsersAction | FetchUsersCallbackActions;

type AsyncIserActions = FetchUsersActions

export const fetchUsersEpic: Epic<RootActions, RootActions, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    ofType<RootActions, typeof fetchUsers.type, FetchUsersAction>(fetchUsers.type),
    mergeMap((action) => {
      return ajaxApi(state$)
        .get(`profile/all`)
        .pipe(
          concatMap((ajaxResponse) => {
            return of(fetchUsersDone(ajaxResponse.response));
          }),
          catchError((error: AjaxError) => {
            return of(fetchUsersFail({error}));
          })
        );
    })
  );

export type IserEpicActions = AsyncIserActions

export const iserEpic: Epic<RootActions, RootActions, RootState> = combineEpics(fetchUsersEpic);
