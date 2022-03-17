import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "rootStore/store"
import { enqueueSnackbar } from './store/notifiersSlice'
import { clearSignInStatus, clearSignUpStatus } from "features/account/store/accountSlice"
import { VariantType } from 'notistack';
import { REQUEST_STATUS } from 'features/account/store/accountSlice'

interface StatetoSnackBarMap {
    statePath: string,
    triggerValue: any,
    snackBarMessage: string
    variant: VariantType
    onExit?: () => void
}

export const getSignUpStateToSnackbarMap = (dispatch: AppDispatch): Array<StatetoSnackBarMap> => [
    {
        statePath: 'accountReducer.requestStatus.signUp',
        triggerValue: REQUEST_STATUS.failed,
        snackBarMessage: 'Registraction failed',
        variant: 'error'
    },
    {
        statePath: 'accountReducer.requestStatus.signUp',
        triggerValue: REQUEST_STATUS.success,
        snackBarMessage: 'Registraction successful',
        variant: 'success'
    },
]

export const getSignInStateSnackbarMap = (dispatch: AppDispatch): Array<StatetoSnackBarMap> => [
    {
        statePath: 'accountReducer.requestStatus.signIn',
        triggerValue: REQUEST_STATUS.failed,
        snackBarMessage: 'Unable to log in',
        variant: 'error',
        onExit: () => {
            dispatch(clearSignInStatus());
        }
    },
    {
        statePath: 'accountReducer.requestStatus.signIn',
        triggerValue: REQUEST_STATUS.unauthorized,
        snackBarMessage: 'Invalid username or password',
        variant: 'error',
        onExit: () => {
            dispatch(clearSignInStatus());
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

// export default useStateChangeNotifiers;