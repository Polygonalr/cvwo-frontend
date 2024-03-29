import { showSuccessSnackbar, closeModal } from './uiActions';
import { Task } from '../types/taskTypes';
import { Tag } from '../types/tagTypes';
import * as client from '../../api/client';
import { RootState } from '../../state/store';
// eslint-disable-next-line import/named
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
// eslint-disable-next-line import/named
import { AnyAction } from 'redux';

export const fetchTasksStart = () => ({
    type: 'FETCH_TASKS_START',
});

export const fetchTaskSuccess = (tasks: Task[]) => ({
    type: 'FETCH_TASKS_SUCCESS',
    payload: tasks,
});

export const fetchTasksFailure = (error: string) => ({
    type: 'FETCH_TASKS_FAILURE',
    payload: error,
});

export const selectTask = (taskId: number) => ({
    type: 'SELECT_TASK',
    payload: taskId,
});

export const fetchTasksAction = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
    // Invoke API
    // TODO: Add error handling - 403 should be handled by bringing up the login prompt again
    return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>, getState: () => RootState): Promise<void> => {
        if (localStorage.getItem('token') !== null) {
            // if (getState().tasks.taskReducer.isLoading) {
            //     console.log('Already fetched tasks!');
            //     return new Promise<void>((resolve) => {
            //         resolve();
            //     });
            // }
            const accessToken = localStorage.getItem('token') || '';
            return new Promise<void>((resolve) => {
                dispatch(fetchTasksStart());
                console.log('Fetching tasks in progress');
                client.fetchTasks(accessToken).then((tasks) => {
                    if (tasks.message !== undefined) {
                        dispatch(fetchTasksFailure(tasks.message));
                    } else {
                        dispatch(fetchTaskSuccess(tasks));
                    }
                    resolve();
                });
            });
        } else {
            return new Promise<void>((resolve) => {
                resolve();
            });
        }
    };
};

export const addTaskAction = (
    title: string,
    description: string,
    tag_ids: number[],
): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
    // Invoke API
    return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>, getState: () => RootState): Promise<void> => {
        if (localStorage.getItem('token') !== null) {
            const accessToken = localStorage.getItem('token') || '';
            return new Promise<void>((resolve) => {
                dispatch(fetchTasksStart());
                console.log('Adding task in progress');
                client.addTask(accessToken, title, description, tag_ids).then((tasks) => {
                    // dispatch(fetchTaskSuccess(tasks));
                    dispatch(showSuccessSnackbar('Task added!'));
                    dispatch(fetchTasksAction());
                    dispatch(closeModal());
                    resolve();
                });
            });
        } else {
            return new Promise<void>((resolve) => {
                resolve();
            });
        }
    };
};

export const updateTaskAction = (
    taskId: number,
    title: string,
    description: string,
    status: number,
    tag_ids: number[],
): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
    return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>, getState: () => RootState): Promise<void> => {
        if (localStorage.getItem('token') !== null) {
            const accessToken = localStorage.getItem('token') || '';
            return new Promise<void>((resolve) => {
                console.log('Updating task in progress');
                client.updateTask(accessToken, taskId, title, description, status, tag_ids).then((tasks) => {
                    // dispatch(fetchTaskSuccess(tasks));
                    dispatch(showSuccessSnackbar('Task updated!'));
                    dispatch(fetchTasksAction());
                    dispatch(closeModal());
                    resolve();
                });
            });
        } else {
            return new Promise<void>((resolve) => {
                resolve();
            });
        }
    };
};

export const deleteTaskAction = (taskId: number): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
    return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>, getState: () => RootState): Promise<void> => {
        if (localStorage.getItem('token') !== null) {
            const accessToken = localStorage.getItem('token') || '';
            return new Promise<void>((resolve) => {
                console.log('Deleting task in progress');
                client.deleteTask(accessToken, taskId).then((tasks) => {
                    // dispatch(fetchTaskSuccess(tasks));
                    dispatch(showSuccessSnackbar('Task deleted!'));
                    dispatch(fetchTasksAction());
                    dispatch(closeModal());
                    resolve();
                });
            });
        } else {
            return new Promise<void>((resolve) => {
                resolve();
            });
        }
    };
};
