// eslint-disable-next-line import/named
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
// eslint-disable-next-line import/named
import { AnyAction } from 'redux';
import type { AppDispatch } from '../store';

export const showSuccessSnackbar = (message: string) => {
    return (dispatch: AppDispatch) => {
        dispatch({ type: 'SNACKBAR_SUCCESS', message });
    };
};

export const clearSnackbar = () => {
    return (dispatch: AppDispatch) => {
        dispatch({ type: 'SNACKBAR_CLEAR' });
    };
};
