import { TaskState } from '../types/taskTypes';
import { combineReducers } from 'redux';

const initialState: TaskState = {
    tasks: [],
    isLoading: false,
    fetched: false,
    selectedTask: 1,
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
                tasks: action.payload,
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
        case 'SELECT_TASK': {
            return {
                ...state,
                selectedTask: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default combineReducers({ taskReducer });
