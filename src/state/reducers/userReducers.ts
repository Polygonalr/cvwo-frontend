import { User, UserState } from '../types/userTypes';
import { combineReducers } from 'redux';

const initialState: UserState = {
    user: {
        username: '',
        name: '',
        role: -1,
    },
    isAuthenticated: false,
    isLoading: false,
};

export const userReducer = (state: UserState = initialState, action: any) => {
    switch (action.type) {
        case 'FETCH_USER_DATA_START': {
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'FETCH_USER_DATA_SUCCESS': {
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        }
        case 'FETCH_USER_DATA_FAILURE': {
            return {
                ...state,
                isLoading: false,
            };
        }
        default: {
            return state;
        }
    }
};

export default combineReducers({ userReducer });
