import { showErrorSnackbar, showSuccessSnackbar } from './uiActions';
import { User } from '../types/userTypes';
import * as client from '../../api/client';
import { RootState } from '../../state/store';
// eslint-disable-next-line import/named
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
// eslint-disable-next-line import/named
import { AnyAction } from 'redux';

export const fetchUserStart = () => ({
    type: 'FETCH_USER_DATA_START',
});

export const fetchUserSuccess = (user: User) => ({
    type: 'FETCH_USER_DATA_SUCCESS',
    payload: user,
});

export const fetchUserFailure = (error: string) => ({
    type: 'FETCH_USER_DATA_FAILURE',
    payload: error,
});

export const fetchUserAction = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
    // Invoke API
    // TODO: Add error handling - 403 should be handled by bringing up the login prompt again
    return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>, getState: () => RootState): Promise<void> => {
        if (localStorage.getItem('token') !== null) {
            if (getState().user.userReducer.isLoading || getState().user.userReducer.isAuthenticated) {
                console.log('Already fetched user data!');
                return new Promise<void>((resolve) => {
                    resolve();
                });
            }
            const accessToken = localStorage.getItem('token') || '';
            return new Promise<void>((resolve) => {
                dispatch(fetchUserStart());
                console.log('Fetching in progress');
                client.fetchUserData(accessToken).then((userData) => {
                    dispatch(fetchUserSuccess(userData));
                    dispatch(showSuccessSnackbar('Automatically logged in as ' + userData.username + '!'));
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

export const submitCredentialsAction = (
    username: string,
    password: string,
): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
    // Invoke API
    // TODO: Add error handling - Wrong credentials should display an error
    return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>, getState: () => RootState): Promise<void> => {
        if (getState().user.userReducer.isLoading || getState().user.userReducer.isAuthenticated) {
            console.log('yea fetched');
            return;
        }
        return new Promise<void>((resolve) => {
            dispatch(fetchUserStart());
            console.log('Fetching in progress');
            client.submitCredentials(username, password).then((userData) => {
                if (userData === undefined) {
                    dispatch(fetchUserFailure('Username or password is incorrect.'));
                    dispatch(showErrorSnackbar('Username or password is incorrect.'));
                } else {
                    dispatch(fetchUserSuccess(userData));
                    dispatch(showSuccessSnackbar('Successfully logged in as ' + userData.username + '!'));
                }
                resolve();
            });
        });
    };
};

// export const setAuthenticatedTest = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
//     return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>, getState: () => RootState): Promise<void> => {
//         return new Promise<void>((resolve) => {
//             dispatch(fetchUserSuccess({ username: 'test', name: 'test', role: 1 }));
//         });
//     };
// };
