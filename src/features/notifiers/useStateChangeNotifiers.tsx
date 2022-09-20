import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { VariantType } from 'notistack';
import { TFunction } from 'react-i18next'
import { Trans } from 'react-i18next';
import { AppDispatch } from "rootStore/store";
import { clearSignInStatus, clearProfileUpdateStatus } from "features/account/store/accountSlice";
import { clearFetchUsersStatus, clearDeleteUserStatus } from "features/iser/store/iserSlice";
import { REQUEST_STATUS } from "common/constants";
import { enqueueSnackbar } from "./store/notifiersSlice";

// ----------------------------------------------------------------------

interface StatetoSnackBarMap {
    triggerValue: any,
    snackBarMessage: React.ReactNode,
    variant: VariantType
    onExit?: () => void
}

export const getSignUpStateToSnackbarMap = (t: TFunction<['account', 'notifiers']>): Array<StatetoSnackBarMap> => [
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
]

export const getSignInStateSnackbarMap = (dispatch: AppDispatch, t: TFunction<['account', 'notifiers']>): Array<StatetoSnackBarMap> => [
    {
        triggerValue: REQUEST_STATUS.failed,
        snackBarMessage: t('notification_msg_sign_in.sign_in_failed', { ns: 'notifiers'}),
        variant: 'error',
        onExit: () => {
            dispatch(clearSignInStatus());
        }
    },
    {
        triggerValue: REQUEST_STATUS.unauthorised,
        snackBarMessage: t('notification_msg_sign_in.sign_in_unauthorised', { ns: 'notifiers'}),
        variant: 'error',
        onExit: () => {
            dispatch(clearSignInStatus());
        }
    },
    {
      triggerValue: REQUEST_STATUS.forbidden,
      snackBarMessage: t('notification_msg_sign_in.sign_in_forbidden', { ns: 'notifiers'}),
      variant: 'error',
      onExit: () => {
          dispatch(clearSignInStatus());
      }
  },
]

export const getProfileStateSnackbarMap = (dispatch: AppDispatch, t: TFunction<['notifiers']>): Array<StatetoSnackBarMap> => [
  {
      triggerValue: REQUEST_STATUS.success,
      snackBarMessage: t('notification_msg_profile_settings.profile_updated', { ns: 'notifiers'}),
      variant: 'success',
      onExit: () => {
          dispatch(clearProfileUpdateStatus());
      }
  },
  {
      triggerValue: REQUEST_STATUS.unauthorised,
      snackBarMessage: t('notification_msg_profile_settings.profile_update_failed', {ns: 'notifiers'}),
      variant: 'error',
      onExit: () => {
          dispatch(clearProfileUpdateStatus());
      }
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
      variant: 'success',
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
      variant: 'success',
      onExit: () => {
          dispatch(clearDeleteUserStatus());
      }
  },
    {
      triggerValue: REQUEST_STATUS.failed,
      snackBarMessage: t('notification_msg_users.user_ban_fail', { ns: 'notifiers'}),
      variant: 'error',
      onExit: () => {
          dispatch(clearDeleteUserStatus());
      }
  },
  {
    triggerValue: REQUEST_STATUS.unauthorised,
    snackBarMessage: t('notification_msg_users.user_ban_unauth', { ns: 'notifiers'}),
    variant: 'error',
    onExit: () => {
        dispatch(clearDeleteUserStatus());
    }
  },
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