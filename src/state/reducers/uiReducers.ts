import { UiState } from '../types/uiTypes';
import { combineReducers } from 'redux';

const initialState: UiState = {
    successSnackbarOpen: false,
    errorSnackbarOpen: false,
    infoSnackbarOpen: false,
    successSnackbarMessage: '',
};

const uiReducer = (state: UiState = initialState, action: any) => {
    switch (action.type) {
        case 'SNACKBAR_SUCCESS':
            return {
                ...state,
                successSnackbarOpen: true,
                successSnackbarMessage: action.message,
            };
        case 'SNACKBAR_CLEAR':
            return {
                ...state,
                successSnackbarOpen: false,
                errorSnackbarOpen: false,
                infoSnackbarOpen: false,
            };
        default:
            return state;
    }
};

export default combineReducers({ uiReducer });
