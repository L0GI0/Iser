import { of } from "rxjs";
import { Action, ActionCreator } from "@reduxjs/toolkit";
import { map, delay, concatMap, catchError, mergeMap } from "rxjs/operators";
import { TestScheduler } from "rxjs/testing";
import { ajax, AjaxResponse, AjaxError } from "rxjs/ajax";
import { Epic, ofType, combineEpics } from "redux-observable";

import {
  logIn,
  logInDone,
  logInFail,
  signUp,
  signUpDone,
  signUpFail,
  accountState,
  accountActionCreators,
  asyncActionCreators
} from "./accountSlice";
import { RootState } from "rootStore/rootReducer";
import { ajaxApi } from "common/api/ajaxApi";

type ActionFromCreator<C extends ActionCreator<unknown>> = ReturnType<C>;

type CaseReducerRecord = Record<string, ActionCreator<unknown>>;
export type ActionFromCaseReducerActions<R extends CaseReducerRecord> =
  ActionFromCreator<R[keyof R]>;

type LogInAction = ActionFromCreator<typeof logIn>;
type LogInCallbackActions = ActionFromCreator<
  typeof logInDone | typeof logInFail
>;

type AllLogInActions = LogInAction | LogInCallbackActions;

/* Input Stream Type, Output Stream Type, State related to the Epic dispatch */
export const logInEpic: Epic<AllLogInActions, LogInCallbackActions, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    /* All possible actions your app can dispatch, The types you want to filter for, The resulting action that match the above types*/
    ofType<AllLogInActions, typeof logIn.type, LogInAction>(logIn.type),
    mergeMap((action) => {
      const { email, password } = { email: action?.payload?.accountLogin, password: action?.payload?.accountPassword };
      return ajaxApi(state$)
        .post(`auth/login`, { email, password })
        .pipe(
          concatMap((ajaxResponse) => {
            return of(logInDone(ajaxResponse.response));
          }),
          catchError((error: AjaxError) => {
            return of(logInFail({error}));
          })
        );
    })
  );

type SignUpAction = ActionFromCreator<typeof signUp>;
type SignUpCallbackActions = ActionFromCreator<typeof signUpDone | typeof signUpFail>;
type AllSignUpActions = SignUpAction | SignUpCallbackActions;

/* Input Stream Type, Output Stream Type, State related to the Epic dispatch */
  export const signUpEpic: Epic<AllSignUpActions, SignUpCallbackActions, RootState> = (
    action$,
    state$
  ) =>
    action$.pipe(
      /* All possible actions your app can dispatch, The types you want to filter for, The resulting action that match the above types*/
      ofType<AllSignUpActions, typeof signUp.type, SignUpAction>(signUp.type),
      mergeMap((action) => {
        const { email, password } = { email: action?.payload?.accountLogin, password: action?.payload?.accountPassword };
        return ajaxApi(state$)
          .post(`users`, { email, password })
          .pipe(
            concatMap((ajaxResponse) => {
              return of(signUpDone(ajaxResponse.response));
            }),
            catchError((error: AjaxError) => {
              return of(signUpFail({error}));
            })
          );
      })
    );  

export type AccountEpicActions = ActionFromCaseReducerActions<
  typeof asyncActionCreators
>;

export const accountEpic = combineEpics(logInEpic, signUpEpic);
