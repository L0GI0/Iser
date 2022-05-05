import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OptionsObject, SnackbarMessage } from 'notistack';


export type SnackBarType = {
  message: SnackbarMessage, 
  options: OptionsObject,
  dismissed?: boolean,
}

export type SnackBarKeyType = SnackBarType['options']['key'];

interface NotifiersState {
  notifications: Array<SnackBarType>
  viewed: Array<number>,
  notificationId: number
}

const notifiersInitialState: NotifiersState = {
  notifications: [],
  viewed: [],
  notificationId: 1,
}

const notifiersSlice = createSlice({
  name: "notifiersSlice",
  initialState: notifiersInitialState,
  reducers: {
    closeSnackbar(state: NotifiersState, action: PayloadAction<SnackBarKeyType>) {

        const targetSnackBarKey = action.payload;

        state.notifications = state.notifications.map(notification => (
            (notification.options.key === targetSnackBarKey)
                ? { ...notification, dismissed: true }
                : { ...notification }
        ))
    },

    removeSnackbar(state: NotifiersState, action: PayloadAction<SnackBarKeyType>) {
      const targetSnackBarKey = action.payload;

      state.notifications = state.notifications.filter(notification => (
        notification.options.key !== targetSnackBarKey
      ))
    },

    triggerNotification(state: NotifiersState) {
      state.notificationId += 1;
    },

    enqueueSnackbar: {
      reducer: (state: NotifiersState, action: PayloadAction<SnackBarType>) => {

        if(state.viewed.some((viewed: number) => { 
          return viewed === state.notificationId })){
            return
        }

        state.notifications.forEach((notificaiton: SnackBarType) => { 
          console.log(`Notification id = ${notificaiton.options.key}`)
        });

        const newSnackBar: SnackBarType = Object.assign({ ...action.payload});
        
        console.log(`Key when enqueuing snackbar = ${state.notificationId}`)
        state.notifications.push({ ...newSnackBar, options: {
          key: state.notificationId,
          variant: newSnackBar.options.variant,
          onExit: newSnackBar.options.onExit,
          defaultValue: ''
        }});

        state.viewed.push(state.notificationId)
      },
      prepare: (notification: SnackBarType) => {

        const dismissed = notification?.dismissed || false;
        const key = notification.options && notification.options.key;

        console.log(`Key in prepare = ${key}`)

        return { payload: {
          ...notification,
          options: {
            ...notification.options,
            defaultValue: ''
          },
          dismissed
          }, 
        }
      },
    },
  },
});

const notifiersActionCreators = notifiersSlice.actions;

const { closeSnackbar, removeSnackbar, enqueueSnackbar, triggerNotification } = notifiersActionCreators;

const notifiersReducer = notifiersSlice.reducer;

export { notifiersActionCreators };
export { closeSnackbar, removeSnackbar, enqueueSnackbar, triggerNotification };
export type notifierState = ReturnType<typeof notifiersReducer>;
export default notifiersReducer;
