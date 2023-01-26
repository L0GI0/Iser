import { of, Observable, defer } from "rxjs";
import { concatMap, catchError, mergeMap} from "rxjs/operators";
import { AjaxError } from "rxjs/ajax";
import { Epic, ofType, combineEpics } from "redux-observable";
import { RootState } from "rootStore/rootReducer";
import { ajaxApi } from "common/api/ajaxApi";
import { RootActions } from "rootStore/rootEpic";
import { ActionFromCreator } from "rootStore/common";
import {
  fetchUsers,
  fetchUsersDone,
  fetchUsersFail,
  fetchUser,
  fetchUserDone,
  fetchUserFail,
  updateUser,
  updateUserDone,
  updateUserFail,
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
import { authErrorHandler } from 'features/account/store/accountEpic';

// ----------------------------------------------------------------------

type FetchUsersAction = ActionFromCreator<typeof fetchUsers>;
type FetchUsersCallbackActions = ActionFromCreator<typeof fetchUsersDone | typeof fetchUsersFail>;
type FetchUsersActions = FetchUsersAction | FetchUsersCallbackActions;

type FetchUserAction = ActionFromCreator<typeof fetchUser>;
type FetchUserCallbackActions = ActionFromCreator<typeof fetchUserDone | typeof fetchUserFail>;
type FetchUserActions = FetchUserAction | FetchUserCallbackActions;

type UpdateUserAction = ActionFromCreator<typeof updateUser>;
type UpdateUserCallbackActions = ActionFromCreator<typeof updateUserDone | typeof updateUserFail>;
type UpdateUserActions = UpdateUserAction | UpdateUserCallbackActions;

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

type AsyncIserActions = FetchUsersActions | FetchUserActions | UpdateUserActions | DeleteUserActions | BanUserActions | UnBanUserActions | ChangeUserPermissionsActions;

export const fetchUsersEpic: Epic<RootActions, RootActions, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    ofType<RootActions, typeof fetchUsers.type, FetchUsersAction>(fetchUsers.type),
    mergeMap(() => {
      return defer(() => ajaxApi(state$)
        .get(`profile/all`))
        .pipe(
          concatMap((ajaxResponse) => {
            return of(fetchUsersDone(ajaxResponse.response));
          }),
          catchError((error: AjaxError, source: Observable<any>) => {
            return authErrorHandler(action$, error, source, fetchUsersFail);
          }),
        );
    })
  );

export const fetchUserEpic: Epic<RootActions, RootActions, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    ofType<RootActions, typeof fetchUser.type, FetchUserAction>(fetchUser.type),
    mergeMap((action: FetchUserAction) => {
      const { userId } = action?.payload;
      
      return defer(() => ajaxApi(state$)
        .get(`users/${userId}`))
        .pipe(
          concatMap((ajaxResponse) => {
            return of(fetchUserDone(ajaxResponse.response));
          }),
          catchError((error: AjaxError, source: Observable<any>) => {
            return authErrorHandler(action$, error, source, fetchUserFail)
          })
        );
    })
  );

export const updateUserEpic: Epic<RootActions, RootActions, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    ofType<RootActions, typeof updateUser.type, UpdateUserAction>(updateUser.type),
    mergeMap((action: UpdateUserAction) => {
      const { userId } = action?.payload;
      return defer(() => ajaxApi(state$)
        .post(`profile/${userId}`, {  ...action?.payload }))
        .pipe(
          concatMap((ajaxResponse) => {
            return of(updateUserDone(ajaxResponse.response));
          }),
          catchError((error: AjaxError, source: Observable<any>) => {
            return authErrorHandler(action$, error, source, updateUserFail)
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
    mergeMap((action: DeleteUserAction) => {
      const { userId } = action?.payload;
      
      return defer(() => ajaxApi(state$)
        .delete(`users/${userId}`))
        .pipe(
          concatMap((ajaxResponse) => {
            return of(userDeleted(ajaxResponse.response));
          }),
          catchError((error: AjaxError, source: Observable<any>) => {
            return authErrorHandler(action$, error, source, deleteUserFail)
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
    mergeMap((action: BanUserAction) => {
      const { userId } = action?.payload;
      
      return defer(() => ajaxApi(state$)
        .put(`users/ban/${userId}`))
        .pipe(
          concatMap((ajaxResponse) => {
            return of(userBanned(ajaxResponse.response));
          }),
          catchError((error: AjaxError, source: Observable<any>) => {
            return authErrorHandler(action$, error, source, banUserFail)
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
      mergeMap((action: UnbanUserAction) => {
        const { userId } = action?.payload;
        
        return defer(() => ajaxApi(state$)
          .put(`users/unban/${userId}`))
          .pipe(
            concatMap((ajaxResponse) => {
              return of(userUnbanned(ajaxResponse.response));
            }),
            catchError((error: AjaxError, source: Observable<any>) => {
              return authErrorHandler(action$, error, source, unbanUserFail)
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
        mergeMap((action: ChangeUserPermissionsAction) => {
          const { userId, userType } = action?.payload;
          
          return defer(() => ajaxApi(state$)
            .put(`users/permissions/${userId}`, { targetUserType: userType}))
            .pipe(
              concatMap((ajaxResponse) => {
                return of(userPermissionsChanged(ajaxResponse.response));
              }),
              catchError((error: AjaxError, source: Observable<any>) => {
                return authErrorHandler(action$, error, source, userPermissionChangeFailed)
              })
            );
        })
      );

export type IserEpicActions = AsyncIserActions

export const iserEpic: Epic<RootActions, RootActions, RootState> = combineEpics(
  fetchUsersEpic, fetchUserEpic, updateUserEpic, deleteUserEpic, banUserEpic, unbanUserEpic, changeUserPermissionsEpic);
