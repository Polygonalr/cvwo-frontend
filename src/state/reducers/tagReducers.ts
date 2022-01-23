import { TagState } from '../types/tagTypes';
import { combineReducers } from 'redux';

const initialState: TagState = {
    tags: [],
    colors: [
        {
            id: 1,
            hex: '#ffffff',
        },
    ],
    isLoading: false,
    fetched: false,
};

export const tagReducer = (state: TagState = initialState, action: any) => {
    switch (action.type) {
        case 'FETCH_TAGS_START': {
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'FETCH_TAGS_SUCCESS': {
            return {
                ...state,
                tags: action.payload,
                isLoading: false,
                fetched: true,
            };
        }
        case 'FETCH_TAGS_FAILURE': {
            return {
                ...state,
                isLoading: false,
            };
        }
        case 'FETCH_COLORS_START': {
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'FETCH_COLORS_SUCCESS': {
            return {
                ...state,
                colors: action.payload,
            };
        }
        case 'FETCH_COLORS_FAILURE': {
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

export default combineReducers({ tagReducer });
