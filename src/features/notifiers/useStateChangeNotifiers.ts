import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "rootStore/store"
import { enqueueSnackbar } from './store/notifiersSlice'
import { clearSignInStatus, clearProfileUpdateStatus } from "features/account/store/accountSlice"
import { VariantType } from 'notistack';
import { REQUEST_STATUS } from 'features/account/store/accountSlice'
import { TFunction } from 'react-i18next'

// ----------------------------------------------------------------------

interface StatetoSnackBarMap {
    statePath: string,
    triggerValue: any,
    snackBarMessage: string
    variant: VariantType
    onExit?: () => void
}

export const getSignUpStateToSnackbarMap = (t: TFunction<['account', 'notifiers']>): Array<StatetoSnackBarMap> => [
    {
        statePath: 'accountReducer.requestStatus.signUp',
        triggerValue: REQUEST_STATUS.success,
        snackBarMessage: t('notification_msg_sign_up.sign_up_success', { ns: 'notifiers'}),
        variant: 'success'
    },
    {
        statePath: 'accountReducer.requestStatus.signUp',
        triggerValue: REQUEST_STATUS.failed,
        snackBarMessage: t('notification_msg_sign_up.sign_up_failed', { ns: 'notifiers'} ),
        variant: 'error'
    },
]

export const getSignInStateSnackbarMap = (dispatch: AppDispatch, t: TFunction<['account', 'notifiers']>): Array<StatetoSnackBarMap> => [
    {
        statePath: 'accountReducer.requestStatus.signIn',
        triggerValue: REQUEST_STATUS.failed,
        snackBarMessage: t('notification_msg_sign_in.sign_in_failed', { ns: 'notifiers'}),
        variant: 'error',
        onExit: () => {
            dispatch(clearSignInStatus());
        }
    },
    {
        statePath: 'accountReducer.requestStatus.signIn',
        triggerValue: REQUEST_STATUS.unauthorized,
        snackBarMessage: t('notification_msg_sign_in.sign_in_unauthorized', { ns: 'notifiers'}),
        variant: 'error',
        onExit: () => {
            dispatch(clearSignInStatus());
        }
    },
]

export const getProfileStateSnackbarMap = (dispatch: AppDispatch, t: TFunction<['notifiers']>): Array<StatetoSnackBarMap> => [
  {
      statePath: 'accountReducer.requestStatus.profileUpdate',
      triggerValue: REQUEST_STATUS.success,
      snackBarMessage: t('notification_msg_profile_settings.profile_updated', { ns: 'notifiers'}),
      variant: 'success',
      onExit: () => {
          dispatch(clearProfileUpdateStatus());
      }
  },
  {
      statePath: 'accountReducer.requestStatus.profileUpdate',
      triggerValue: REQUEST_STATUS.unauthorized,
      snackBarMessage: t('notification_msg_profile_settings.profile_update_failed', { ns: 'notifiers'}),
      variant: 'error',
      onExit: () => {
          dispatch(clearProfileUpdateStatus());
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