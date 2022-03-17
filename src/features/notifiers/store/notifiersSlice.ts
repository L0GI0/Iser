import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VariantType, useSnackbar, OptionsObject, SnackbarMessage } from 'notistack';
import { stat } from "fs";
import { random } from "lodash";
import { Options } from "pretty-format";


type WritableType<T> = { -readonly [P in keyof T]: T[P] }


type DeepWritableType<T> = { -readonly [P in keyof T]: DeepWritableType<T[P]> }

export type SnackBarType = {
  message: SnackbarMessage, 
  options: OptionsObject,
  dismissed?: boolean,
}

export type SnackBarKeyType = SnackBarType['options']['key'];

interface NotifiersInitialState {
  notifications: Array<SnackBarType>
}

const notifiersInitialState: NotifiersInitialState = {
  notifications: []
}

const notifiersSlice = createSlice({
  name: "notifiersSlice",
  initialState: notifiersInitialState,
  reducers: {
    closeSnackbar(state, action: PayloadAction<SnackBarKeyType>): void {

        const targetSnackBarKey = action.payload;

        state.notifications = state.notifications.map(notification => (
            (notification.options.key === targetSnackBarKey)
                ? { ...notification, dismissed: true }
                : { ...notification }
        ))
    },

    removeSnackbar(state, action: PayloadAction<SnackBarKeyType>): void {
      const targetSnackBarKey = action.payload;

      state.notifications = state.notifications.filter(notification => (
        notification.options.key !== targetSnackBarKey
      ))

    },

    enqueueSnackbar: {
      reducer: (state, action: PayloadAction<SnackBarType>) => {

        const newSnackBar: SnackBarType = Object.assign({ ...action.payload});

        state.notifications.push({ ...newSnackBar, options: {
          key: newSnackBar.options.key,
          variant: newSnackBar.options.variant,
          onExit: newSnackBar.options.onExit,
          defaultValue: ''
        }});


      },
      prepare: (notification: SnackBarType) => {

        const dismissed = notification?.dismissed || false;
        const key = notification.options && notification.options.key;



        return { payload: {
          ...notification,
          options: {
            ...notification.options,
            key: key ?? new Date().getTime() + Math.random(),
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

const { closeSnackbar, removeSnackbar, enqueueSnackbar} = notifiersActionCreators;

const notifiersReducer = notifiersSlice.reducer;

export { notifiersActionCreators };
export { closeSnackbar, removeSnackbar, enqueueSnackbar };
export type notifierState = ReturnType<typeof notifiersReducer>;
export default notifiersReducer;
