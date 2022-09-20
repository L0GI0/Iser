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
  fetchUsersFail,
  deleteUser,
  userDeleted,
  deleteUserFail,
  banUser,
  userBanned,
  banUserFail
} from "./iserSlice";

// ----------------------------------------------------------------------

type ActionFromCreator<C extends ActionCreator<unknown>> = ReturnType<C>;

type CaseReducerRecord = Record<string, ActionCreator<unknown>>;
export type ActionFromCaseReducerActions<R extends CaseReducerRecord> =
  ActionFromCreator<R[keyof R]>;

type FetchUsersAction = ActionFromCreator<typeof fetchUsers>;
type FetchUsersCallbackActions = ActionFromCreator<typeof fetchUsersDone | typeof fetchUsersFail>;
type FetchUsersActions = FetchUsersAction | FetchUsersCallbackActions;

type DeleteUserAction = ActionFromCreator<typeof deleteUser>;
type DeleteUserCallbackActions = ActionFromCreator<typeof userDeleted | typeof deleteUserFail>;
type DeleteUserActions = DeleteUserAction | DeleteUserCallbackActions;

type BanUserAction = ActionFromCreator<typeof banUser>;
type BanUserCallbackActions = ActionFromCreator<typeof userBanned | typeof banUserFail>;
type BanUserActions = BanUserAction | BanUserCallbackActions;

type AsyncIserActions = FetchUsersActions | DeleteUserActions | BanUserActions;

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

  export const deleteUserEpic: Epic<RootActions, RootActions, RootState> = (
    action$,
    state$
  ) =>
    action$.pipe(
      ofType<RootActions, typeof deleteUser.type, DeleteUserAction>(deleteUser.type),
      mergeMap((action) => {
        const { userId } = action?.payload;
        
        return ajaxApi(state$)
          .delete(`users/${userId}`)
          .pipe(
            concatMap((ajaxResponse) => {
              return of(userDeleted(ajaxResponse.response), fetchUsers());
            }),
            catchError((error: AjaxError) => {
              return of(deleteUserFail({error}));
            })
          );
      })
    );

  export const banUserEpic: Epic<RootActions, RootActions, RootState> = (
    action$,
    state$
  ) =>
    action$.pipe(
      ofType<RootActions, typeof banUser.type, BanUserAction>(banUser.type),
      mergeMap((action) => {
        const { userId } = action?.payload;
        
        return ajaxApi(state$)
          .put(`users/ban/${userId}`)
          .pipe(
            concatMap((ajaxResponse) => {
              return of(userBanned(ajaxResponse.response), fetchUsers());
            }),
            catchError((error: AjaxError) => {
              return of(banUserFail({error}));
            })
          );
      })
    );

export type IserEpicActions = AsyncIserActions

export const iserEpic: Epic<RootActions, RootActions, RootState> = combineEpics(fetchUsersEpic, deleteUserEpic, banUserEpic);
