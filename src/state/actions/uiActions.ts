import type { AppDispatch } from '../store';

export const showSuccessSnackbar = (message: string) => {
    return (dispatch: AppDispatch) => {
        dispatch({ type: 'SNACKBAR_CLEAR' });
        dispatch({ type: 'SNACKBAR_SUCCESS', message });
    };
};

export const showErrorSnackbar = (message: string) => {
    return (dispatch: AppDispatch) => {
        dispatch({ type: 'SNACKBAR_CLEAR' });
        dispatch({ type: 'SNACKBAR_ERROR', message });
    };
};

export const clearSnackbar = () => {
    return (dispatch: AppDispatch) => {
        dispatch({ type: 'SNACKBAR_CLEAR' });
    };
};

export const openModal = (modal: string) => {
    return (dispatch: AppDispatch) => {
        dispatch({ type: 'OPEN_MODAL', modal });
    };
};

export const closeModal = () => {
    return (dispatch: AppDispatch) => {
        dispatch({ type: 'OPEN_MODAL', modal: '' });
    };
};
