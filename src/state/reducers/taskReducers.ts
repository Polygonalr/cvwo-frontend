import { TaskState } from '../types/taskTypes';
import { combineReducers } from 'redux';

const initialState: TaskState = {
    tasks: [],
    isLoading: false,
    fetched: false,
};

export const taskReducer = (state: TaskState = initialState, action: any) => {
    switch (action.type) {
        case 'FETCH_TASKS_START': {
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'FETCH_TASKS_SUCCESS': {
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        }
        case 'FETCH_TASKS_FAILURE': {
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

export default combineReducers({ taskReducer });
