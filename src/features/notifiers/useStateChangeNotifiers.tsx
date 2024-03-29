import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { VariantType } from 'notistack';
import { TFunction } from 'react-i18next'
import { Trans } from 'react-i18next';
import { AppDispatch } from "rootStore/store";
import { clearLogInStatus, clearProfileUpdateStatus } from "features/account/store/accountSlice";
import {
  clearFetchUsersStatus,
  clearDeleteUserStatus,
  clearBanUserStatus,
  clearUnbanUserStatus,
  clearChangeUserPermissionsStatus } from "features/iser/store/iserSlice";
import { REQUEST_STATUS } from "common/constants";
import { enqueueSnackbar } from "./store/notifiersSlice";

// ----------------------------------------------------------------------

interface StatetoSnackBarMap {
    triggerValue: RequestStatus,
    snackBarMessage: React.ReactNode,
    variant: VariantType,
    onExit?: () => void
}

export const getSignUpStateToSnackbarMap = (t: TFunction<['account', 'notifiers']>, userEmail: User['emailAddress']): Array<StatetoSnackBarMap> => [
    {
        triggerValue: REQUEST_STATUS.success,
        snackBarMessage: t('notification_msg_sign_up.sign_up_success', { ns: 'notifiers'}),
        variant: 'success'
    },
    {
        triggerValue: REQUEST_STATUS.failed,
        snackBarMessage: t('notification_msg_sign_up.sign_up_failed', { ns: 'notifiers'} ),
        variant: 'error'
    },
    {
      triggerValue: REQUEST_STATUS.forbidden,
      snackBarMessage: 
      (<Trans
        t={t}
        ns={['notifiers', 'account']}
        i18nKey={"notifiers:notification_msg_sign_up.sign_up_forbidden"}
        values={{ userEmail: userEmail}}
        components={{ bold: <strong/>}}
        />),
      variant: 'warning'
    },
]

export const getSignInStateSnackbarMap = (dispatch: AppDispatch, t: TFunction<['account', 'notifiers']>): Array<StatetoSnackBarMap> => [
    {
        triggerValue: REQUEST_STATUS.failed,
        snackBarMessage: t('notification_msg_sign_in.sign_in_failed', { ns: 'notifiers'}),
        variant: 'error',
        onExit: () => {
            dispatch(clearLogInStatus());
        }
    },
    {
        triggerValue: REQUEST_STATUS.unauthorised,
        snackBarMessage: t('notification_msg_sign_in.sign_in_unauthorised', { ns: 'notifiers'}),
        variant: 'error',
        onExit: () => {
            dispatch(clearLogInStatus());
        }
    },
    {
      triggerValue: REQUEST_STATUS.forbidden,
      snackBarMessage: t('notification_msg_sign_in.sign_in_forbidden', { ns: 'notifiers'}),
      variant: 'error',
      onExit: () => {
          dispatch(clearLogInStatus());
      }
  },
]

export const getProfileStateSnackbarMap = (dispatch: AppDispatch, t: TFunction<'notifiers'>): Array<StatetoSnackBarMap> => [
  {
      triggerValue: REQUEST_STATUS.success,
      snackBarMessage: t('notification_msg_profile_settings.profile_updated', { ns: 'notifiers'}),
      variant: 'success',
      onExit: () => {
          dispatch(clearProfileUpdateStatus());
      }
  },
  {
      triggerValue: REQUEST_STATUS.failed,
      snackBarMessage: t('notification_msg_profile_settings.profile_update_failed', {ns: 'notifiers'}),
      variant: 'error',
      onExit: () => {
          dispatch(clearProfileUpdateStatus());
      }
  },
]

export const getUsersProfileStateSnackbarMap = (t: TFunction<'notifiers'>, userEmail: User['emailAddress'], onExit: StatetoSnackBarMap['onExit']): Array<StatetoSnackBarMap> => [
  {
      triggerValue: REQUEST_STATUS.success,
      snackBarMessage: (<Trans
        t={t}
        ns='notifiers'
        i18nKey={"notification_msg_users.users_profile_updated"}
        values={{ userEmail: userEmail}}
        components={{ bold: <strong/>}}
        />),
      variant: 'success',
      onExit: onExit
  },
  {
      triggerValue: REQUEST_STATUS.unauthorised,
      snackBarMessage: t('notification_msg_profile_settings.users_profile_update_failed', {ns: 'notifiers'}),
      variant: 'error',
      onExit: onExit
  },
]

export const getDeleteUserStateSnackbarMap = (dispatch: AppDispatch, t: TFunction<['notifiers', 'users']>, userEmail: User['emailAddress']): Array<StatetoSnackBarMap> => [
  {
      triggerValue: REQUEST_STATUS.success,
      snackBarMessage: (<Trans
        t={t}
        ns={['notifiers', 'users']}
        i18nKey={"notification_msg_users.user_deleted"}
        values={{ userEmail: userEmail}}
        components={{ bold: <strong/>}}
        />),
      variant: 'warning',
      onExit: () => {
          dispatch(clearDeleteUserStatus());
      }
  },
    {
      triggerValue: REQUEST_STATUS.failed,
      snackBarMessage: t('notification_msg_users.user_delete_fail', { ns: 'notifiers'}),
      variant: 'error',
      onExit: () => {
          dispatch(clearDeleteUserStatus());
      }
  },
  {
    triggerValue: REQUEST_STATUS.unauthorised,
    snackBarMessage: t('notification_msg_users.user_delete_unauth', { ns: 'notifiers'}),
    variant: 'error',
    onExit: () => {
        dispatch(clearDeleteUserStatus());
    }
  },
  {
    triggerValue: REQUEST_STATUS.forbidden,
    snackBarMessage: t('notification_msg_users.user_delete_forbidden', { ns: 'notifiers'}),
    variant: 'warning',
    onExit: () => {
        dispatch(clearDeleteUserStatus());
  }
  }
]

export const getBanUserStateSnackbarMap = (dispatch: AppDispatch, t: TFunction<['notifiers', 'users']>, userEmail: User['emailAddress']): Array<StatetoSnackBarMap> => [
  {
      triggerValue: REQUEST_STATUS.success,
      snackBarMessage: (<Trans
        t={t}
        ns={['notifiers', 'users']}
        i18nKey={"notification_msg_users.user_banned"}
        values={{ userEmail: userEmail}}
        components={{ bold: <strong/>}}
        />),
      variant: 'warning',
      onExit: () => {
          dispatch(clearBanUserStatus());
      }
  },
    {
      triggerValue: REQUEST_STATUS.forbidden,
      snackBarMessage: t('notification_msg_users.user_ban_forbidden', { ns: 'notifiers'}),
      variant: 'warning',
      onExit: () => {
          dispatch(clearBanUserStatus());
    }
  },
  {
    triggerValue: REQUEST_STATUS.unauthorised,
    snackBarMessage: t('notification_msg_users.user_ban_unauth', { ns: 'notifiers'}),
    variant: 'error',
    onExit: () => {
        dispatch(clearBanUserStatus());
    }
  },
]

export const getUnbanUserStateSnackbarMap = (dispatch: AppDispatch, t: TFunction<['notifiers', 'users']>, userEmail: User['emailAddress']): Array<StatetoSnackBarMap> => [
  {
      triggerValue: REQUEST_STATUS.success,
      snackBarMessage: (<Trans
        t={t}
        ns={['notifiers', 'users']}
        i18nKey={"notification_msg_users.user_unbanned"}
        values={{ userEmail: userEmail}}
        components={{ bold: <strong/>}}
        />),
      variant: 'success',
      onExit: () => {
          dispatch(clearUnbanUserStatus());
      }
  },
    {
      triggerValue: REQUEST_STATUS.failed,
      snackBarMessage: t('notification_msg_users.user_unban_fail', { ns: 'notifiers'}),
      variant: 'error',
      onExit: () => {
          dispatch(clearUnbanUserStatus());
      }
  },
  {
    triggerValue: REQUEST_STATUS.unauthorised,
    snackBarMessage: t('notification_msg_users.user_unban_unauth', { ns: 'notifiers'}),
    variant: 'error',
    onExit: () => {
        dispatch(clearUnbanUserStatus());
    }
  },
]

export const getChangeUserPermissionsStateSnackbarMap = (dispatch: AppDispatch, t: TFunction<['notifiers', 'users']>, userEmail: User['emailAddress']): Array<StatetoSnackBarMap> => [
  {
      triggerValue: REQUEST_STATUS.success,
      snackBarMessage: (<Trans
        t={t}
        ns={['notifiers', 'users']}
        i18nKey={"notification_msg_users.user_permissions_changed"}
        values={{ userEmail: userEmail}}
        components={{ bold: <strong/>}}
        />),
      variant: 'success',
      onExit: () => {
          dispatch(clearChangeUserPermissionsStatus());

      }
  },
    {
    triggerValue: REQUEST_STATUS.failed,
      snackBarMessage: t('notification_msg_users.user_permissions_change_fail', { ns: 'notifiers'}),
      variant: 'error',
      onExit: () => {
        dispatch(clearChangeUserPermissionsStatus());
      }
  },
  {
    triggerValue: REQUEST_STATUS.unauthorised,
    snackBarMessage: t('notification_msg_users.user_permissions_change_unauth', { ns: 'notifiers'}),
    variant: 'error',
    onExit: () => {
      dispatch(clearChangeUserPermissionsStatus());
    }
  },
  {
    triggerValue: REQUEST_STATUS.forbidden,
    snackBarMessage: t('notification_msg_users.user_permissions_change_forbidden', { ns: 'notifiers'}),
    variant: 'error',
    onExit: () => {
      dispatch(clearChangeUserPermissionsStatus());
    }
  }
]

export const getUsersTableStateSnackbarMap = (dispatch: AppDispatch, t: TFunction<['notifiers']>): Array<StatetoSnackBarMap> => [
    {
      triggerValue: REQUEST_STATUS.failed,
      snackBarMessage: t('notification_msg_users.users_fetch_failed', { ns: 'notifiers'}),
      variant: 'error',
      onExit: () => {
          dispatch(clearFetchUsersStatus());
      }
    },
]


export const useStateChangeNotifier = (observedState: any, stateToSnackbarMap: Array<StatetoSnackBarMap>) => {
    const dispatch = useDispatch()

    useEffect(() => {
        stateToSnackbarMap.forEach((targetState: StatetoSnackBarMap) => {
            if(observedState === targetState.triggerValue){
                dispatch(enqueueSnackbar({
                    message: targetState.snackBarMessage,
                    options: {
                        variant: targetState.variant,
                        onExit: targetState.onExit,
                    }
                }))
            }
        })

    }, [dispatch, observedState]) 
    
}