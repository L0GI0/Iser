import { of, Observable, switchMap, defer } from "rxjs";
import { ActionCreator } from "@reduxjs/toolkit";
import { concatMap, catchError, mergeMap, takeUntil, take, mergeWith } from "rxjs/operators";
import { AjaxError } from "rxjs/ajax";
import { Epic, ofType, combineEpics, StateObservable } from "redux-observable";

import {
  logIn,
  logInDone,
  logInFail,
  signUp,
  signUpDone,
  signUpFail,
  authenticate,
  logOut,
  refreshToken,
  refreshTokenFailed,
  refreshTokenDone,
  authenticated,
} from "./accountSlice";
import { RootState } from "rootStore/rootReducer";
import { ajaxApi } from "common/api/ajaxApi";

// ----------------------------------------------------------------------

const authErrorHandler = (action$: Observable<any>, error: AjaxError, source: Observable<any>) => {
  if(error.status === 401 || error.status === 403) {
    return action$.pipe(
      ofType<AsyncAccountActions, typeof refreshTokenDone.type, RefreshTokenAction>(refreshTokenDone.type),
      takeUntil(action$.pipe(
        ofType((logOut.type))
      )),
      take(1),
      mergeMap(() => source),
      mergeWith(
        of(refreshToken())
      )
    )
  }
  else {
    return of(logOut());
  }
}

type ActionFromCreator<C extends ActionCreator<unknown>> = ReturnType<C>;

type CaseReducerRecord = Record<string, ActionCreator<unknown>>;
export type ActionFromCaseReducerActions<R extends CaseReducerRecord> =
  ActionFromCreator<R[keyof R]>;

type LogInAction = ActionFromCreator<typeof logIn>;
type LogInCallbackActions = ActionFromCreator<typeof logInDone | typeof logInFail
>;
type AllLogInActions = LogInAction | LogInCallbackActions;

type SignUpAction = ActionFromCreator<typeof signUp>;
type SignUpCallbackActions = ActionFromCreator<typeof signUpDone | typeof signUpFail>;
type SignUpActions = SignUpAction | SignUpCallbackActions;

type LogOutAction = ActionFromCreator<typeof logOut>;
type AuthenticateAction = ActionFromCreator<typeof authenticate>;
type SessionActions = LogOutAction | AuthenticateAction;

type RefreshTokenAction = ActionFromCreator<typeof refreshToken>
type RefreshTokenFailed = ActionFromCreator<typeof refreshTokenFailed>
type RefreshTokenDone = ActionFromCreator<typeof refreshTokenDone>
type RefreshTokenActions = RefreshTokenAction | RefreshTokenDone | RefreshTokenFailed


type AsyncAccountActions = SignUpActions | AllLogInActions | SessionActions | RefreshTokenActions

/* Input Stream Type, Output Stream Type, State related to the Epic dispatch */
export const logInEpic: Epic<AsyncAccountActions, AsyncAccountActions, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    /* All possible actions your app can dispatch, The types you want to filter for, The resulting action that match the above types*/
    ofType<AsyncAccountActions, typeof logIn.type, LogInAction>(logIn.type),
    mergeMap((action) => {
      const { accountLogin, accountPassword } = action?.payload;
      return ajaxApi(state$)
        .post(`auth/login`, { accountLogin, accountPassword })
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

  export const signUpEpic: Epic<AsyncAccountActions, AsyncAccountActions, RootState> = (
    action$: Observable<AsyncAccountActions>,
    state$: StateObservable<RootState>
  ) =>
    action$.pipe(
      ofType<AsyncAccountActions, typeof signUp.type, SignUpAction>(signUp.type),
      mergeMap((action) => {
        const { accountLogin, accountPassword, accountType } = action?.payload;
        return ajaxApi(state$)
          .post(`users`, { accountLogin, accountPassword, accountType })
          .pipe(
            concatMap((ajaxResponse) => {
              return of(signUpDone());
            }),
            catchError((error: AjaxError) => {
              return of(signUpFail({error}));
            })
          );
      })
    );  

export const authenticateEpic: Epic<AsyncAccountActions, AsyncAccountActions, RootState> = (
  action$: Observable<AsyncAccountActions>,
  state$: StateObservable<RootState>
  ) =>
    action$.pipe(
      ofType<AsyncAccountActions, typeof authenticate.type, AuthenticateAction>(authenticate.type),
      switchMap((action) => {
          return defer(() => ajaxApi(state$).get(`auth/authenticate`)).pipe(
            concatMap((ajaxResponse) => {
              return of(authenticated(ajaxResponse));
            }),
            catchError((error: AjaxError, source: Observable<any>) => {
              return authErrorHandler(action$, error, source)
            }),
          );     
      }),
    );

    export const refreshTokenEpic: Epic<AsyncAccountActions, AsyncAccountActions, RootState> = (action$: any, state$) =>
    action$.pipe(
      ofType<AsyncAccountActions, typeof refreshToken.type, RefreshTokenAction>(refreshToken.type),
      mergeMap((action) => {
          return ajaxApi(state$).get(`auth/refresh_token`).pipe(
            mergeMap((ajaxResponse) => {
              return of(refreshTokenDone(ajaxResponse.response));
            }),
            catchError((error: AjaxError) => {
              return of(logOut())
            }),
          );      
      }),
    );


export type AccountEpicActions = AsyncAccountActions

export const accountEpic: Epic<AsyncAccountActions, AsyncAccountActions, RootState> = combineEpics(signUpEpic, logInEpic, authenticateEpic, refreshTokenEpic);
