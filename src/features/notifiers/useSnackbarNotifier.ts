import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { RootState } from 'rootStore/rootReducer';
import { removeSnackbar, SnackBarKeyType } from './store/notifiersSlice'


const useSnackbarNotifier = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const notifications = useSelector((state: RootState) => state.notifiersReducer.notifications || []);

    const displayed = useRef<Array<SnackBarKeyType>>([])

    const storeDisplayed = (id: SnackBarKeyType) => {
        displayed.current = [...displayed.current, id];
    };

    const removeDisplayed = (id: SnackBarKeyType) => {
        displayed.current = [...displayed.current.filter(key => id !== key)];
    };

    React.useEffect(() => {

        console.log('Snackbar useEffect');

        notifications.forEach(({ message, options = {}, dismissed = false }) => {
            if (dismissed) {
                // dismiss snackbar using notistack
                closeSnackbar(options.key);
                return;
            }

            // do nothing if snackbar is already displayed
            if (displayed.current.includes(options.key)) return;

            // display snackbar using notistack
            enqueueSnackbar(message, {
                ...options,
                onClose: (event, reason, targetKey) => {
                    if (options.onClose) {
                        options.onClose(event, reason, targetKey);
                    }
                },
                onExited: (event, targetKey) => {
                    // remove this snackbar from redux store
                    dispatch(removeSnackbar(targetKey));
                    removeDisplayed(targetKey);
                },
            });

            // keep track of snackbars that we've displayed
            storeDisplayed(options.key);
        });
    }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);
};

export default useSnackbarNotifier;
