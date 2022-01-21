import { UiState } from '../types/uiTypes';
import { combineReducers } from 'redux';

const initialState: UiState = {
    snackbarOpen: false,
    snackbarType: 'success',
    snackbarMessage: '',
};

const uiReducer = (state: UiState = initialState, action: any) => {
    switch (action.type) {
        case 'SNACKBAR_SUCCESS':
            return {
                ...state,
                snackbarOpen: true,
                snackbarType: 'success',
                snackbarMessage: action.message,
            };
        case 'SNACKBAR_ERROR':
            return {
                ...state,
                snackbarOpen: true,
                snackbarType: 'error',
                snackbarMessage: action.message,
            };
        case 'SNACKBAR_CLEAR':
            return {
                ...state,
                snackbarOpen: false,
            };
        default:
            return state;
    }
};

export default combineReducers({ uiReducer });
