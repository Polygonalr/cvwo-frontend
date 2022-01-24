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
    selectedTags: [],
    selectedFilterTag: 0,
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
        case 'SET_SELECTED_TAGS': {
            return {
                ...state,
                selectedTags: action.payload,
            };
        }
        case 'SET_FILTERED_TAG': {
            return {
                ...state,
                selectedFilterTag: action.payload,
            };
        }
        case 'UNSET_FILTERED_TAG': {
            return {
                ...state,
                selectedFilterTag: 0,
            };
        }
        default: {
            return state;
        }
    }
};

export default combineReducers({ tagReducer });
