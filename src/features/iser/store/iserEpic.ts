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
  banUserFail,
  unbanUser,
  userUnbanned,
  unbanUserFail,
  changeUserPermissions,
  userPermissionsChanged,
  userPermissionChangeFailed,
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

type UnbanUserAction = ActionFromCreator<typeof unbanUser>;
type UnbanUserCallbackActions = ActionFromCreator<typeof userUnbanned | typeof unbanUserFail>;
type UnBanUserActions = UnbanUserAction | UnbanUserCallbackActions;

type ChangeUserPermissionsAction = ActionFromCreator<typeof changeUserPermissions>;
type ChangeUserPermissionCallbackActions = ActionFromCreator<typeof userPermissionsChanged | typeof userPermissionChangeFailed>;
type ChangeUserPermissionsActions = ChangeUserPermissionsAction | ChangeUserPermissionCallbackActions;

type AsyncIserActions = FetchUsersActions | DeleteUserActions | BanUserActions | UnBanUserActions | ChangeUserPermissionsActions;

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

    export const unbanUserEpic: Epic<RootActions, RootActions, RootState> = (
      action$,
      state$
    ) =>
      action$.pipe(
        ofType<RootActions, typeof unbanUser.type, UnbanUserAction>(unbanUser.type),
        mergeMap((action) => {
          const { userId } = action?.payload;
          
          return ajaxApi(state$)
            .put(`users/unban/${userId}`)
            .pipe(
              concatMap((ajaxResponse) => {
                return of(userUnbanned(ajaxResponse.response), fetchUsers());
              }),
              catchError((error: AjaxError) => {
                return of(unbanUserFail({error}));
              })
            );
        })
      );

      export const changeUserPermissionsEpic: Epic<RootActions, RootActions, RootState> = (
        action$,
        state$
      ) =>
        action$.pipe(
          ofType<RootActions, typeof changeUserPermissions.type, ChangeUserPermissionsAction>(changeUserPermissions.type),
          mergeMap((action) => {
            const { userId, userType } = action?.payload;
            
            return ajaxApi(state$)
              .put(`users/permissions/${userId}`, { targetUserType: userType})
              .pipe(
                concatMap((ajaxResponse) => {
                  return of(userPermissionsChanged(ajaxResponse.response), fetchUsers());
                }),
                catchError((error: AjaxError) => {
                  return of(userPermissionChangeFailed({error}));
                })
              );
          })
        );

export type IserEpicActions = AsyncIserActions

export const iserEpic: Epic<RootActions, RootActions, RootState> = combineEpics(
  fetchUsersEpic, deleteUserEpic, banUserEpic, unbanUserEpic, changeUserPermissionsEpic);
