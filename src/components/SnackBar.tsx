// TODO: TBH I should use react-toastify for this instead of mui's snackbar. Time is not a luxury here.
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { clearSnackbar } from '../state/actions/uiActions';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
// eslint-disable-next-line import/named
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SuccessSnackbar() {
    const dispatch = useDispatch();

    const snackbarState = useAppSelector((state) => state.ui.uiReducer);

    function handleClose() {
        dispatch(clearSnackbar());
    }

    return (
        <Snackbar open={snackbarState.successSnackbarOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {snackbarState.successSnackbarMessage}
            </Alert>
        </Snackbar>
    );
}
