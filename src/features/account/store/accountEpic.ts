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
  signUp,
  signUpDone,
  signUpFail,
  accountState,
  accountActionCreators,
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

type AllLogInActions = LogInAction | LogInCallbackActions; /* this should be intersecftion not unon !?*/

/* Input Stream Type, Output Stream Type, State related to the Epic dispatch */
export const logInEpic: Epic<AllLogInActions, AllLogInActions, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    /* All possible actions your app can dispatch, The types you want to filter for, The resulting action that match the above types*/
    ofType<AllLogInActions, typeof logIn.type, LogInCallbackActions>(logIn.type),
    mergeMap((action) => {
      console.log(`Action payload = ${action?.payload?.error}`)
      const { email, password } = { email: action?.payload?.accountLogin, password: action?.payload?.accountPassword };
      return ajaxApi(state$)
        .post(`auth/login`, { email, password })
        .pipe(
          concatMap((ajaxResponse) => {
            return of(logInDone(ajaxResponse.response));
          }),
          catchError((error) => {
            return of(logInFail(error));
          })
        );
    })
  );

type SignUpAction = ActionFromCreator<typeof signUp>;
type SignUpCallbackActions = ActionFromCreator<typeof signUpDone | typeof signUpFail>;
type AllSignUpActions = SignUpAction | SignUpCallbackActions;

/* Input Stream Type, Output Stream Type, State related to the Epic dispatch */
  export const signUpEpic: Epic<AllSignUpActions, AllSignUpActions, RootState> = (
    action$,
    state$
  ) =>
    action$.pipe(
      /* All possible actions your app can dispatch, The types you want to filter for, The resulting action that match the above types*/
      ofType<AllSignUpActions, typeof signUp.type, SignUpCallbackActions>(signUp.type),
      mergeMap((action) => {
        console.log('SIGN UP EPIC!')
        const { email, password } = { email: action?.payload?.accountLogin, password: action?.payload?.accountPassword };
        return ajaxApi(state$)
          .post(`users`, { email, password })
          .pipe(
            concatMap((ajaxResponse) => {
              return of(logInDone(ajaxResponse.response));
            }),
            catchError((error) => {
              return of(logInFail(error));
            })
          );
      })
    );  

export type AccountEpicActions = ActionFromCaseReducerActions<
  typeof accountActionCreators
>;

export const accountEpic = combineEpics(logInEpic, signUpEpic);
