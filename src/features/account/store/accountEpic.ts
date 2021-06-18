import { of } from "rxjs";
import { Action, ActionCreator } from "@reduxjs/toolkit";
import { map, delay, concatMap, catchError, mergeMap } from "rxjs/operators";
import { TestScheduler } from "rxjs/testing";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { Epic, ofType, combineEpics } from "redux-observable";

import {
  logIn,
  logInDone,
  logInFail,
  accountState,
  accountActionCreators,
} from "./accountSlice";
import { RootState } from "../../../rootStore/rootReducer";
import { ajaxApi } from "../../../common/api/ajaxApi";

type ActionFromCreator<C extends ActionCreator<unknown>> = ReturnType<C>;

type CaseReducerRecord = Record<string, ActionCreator<unknown>>;
export type ActionFromCaseReducerActions<R extends CaseReducerRecord> =
  ActionFromCreator<R[keyof R]>;

type LogInAction = ActionFromCreator<typeof logIn>;
type LogInCallbackAction = ActionFromCreator<
  typeof logInDone | typeof logInFail
>;

type AllLogInActions = LogInAction | LogInCallbackAction;

export const logInEpic: Epic<AllLogInActions, AllLogInActions, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    ofType<AllLogInActions, LogInAction>(logIn.type),
    mergeMap(() => {
      const { email, password } = { email: "bob@email.com", password: "bob" };
      return ajaxApi(state$)
        .post(`auth/login`, { email, password })
        .pipe(
          concatMap((ajaxResponse) => {
            return of(logInDone(ajaxResponse.response));
          }),
          catchError((error) => {
            return of(logInFail());
          })
        );
    })
  );

export type AccountEpicActions = ActionFromCaseReducerActions<
  typeof accountActionCreators
>;

export const accountEpic = combineEpics(logInEpic);
