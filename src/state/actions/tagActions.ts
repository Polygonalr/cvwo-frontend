import { showSuccessSnackbar } from './uiActions';
import { Tag, Color } from '../types/tagTypes';
import * as client from '../../api/client';
import { RootState } from '../store';
// eslint-disable-next-line import/named
import { AnyAction } from 'redux';
// eslint-disable-next-line import/named
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import type { AppDispatch } from '../store';

export const fetchTagsStart = () => ({
    type: 'FETCH_TAGS_START',
});

export const fetchTagsFailure = (error: string) => ({
    type: 'FETCH_TAGS_FAILURE',
    payload: error,
});

export const fetchTagsSuccess = (tags: Tag[]) => ({
    type: 'FETCH_TAGS_SUCCESS',
    payload: tags,
});

export const fetchColorsStart = () => ({
    type: 'FETCH_COLORS_START',
});

export const fetchColorsFailure = (error: string) => ({
    type: 'FETCH_COLORS_FAILURE',
    payload: error,
});

export const fetchColorsSuccess = (colors: Color[]) => ({
    type: 'FETCH_COLORS_SUCCESS',
    payload: colors,
});

export const setSelectedTags = (tags: number[]) => ({
    type: 'SET_SELECTED_TAGS',
    payload: tags,
});

export const fetchTagsAction = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
    // Invoke API
    return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>, getState: () => RootState): Promise<void> => {
        if (localStorage.getItem('token') !== null) {
            // if (getState().tags.tagReducer.fetched) {
            //     console.log('Already fetched tags!');
            //     return new Promise<void>((resolve) => {
            //         resolve();
            //     });
            // }
            const accessToken = localStorage.getItem('token') || '';
            return new Promise<void>((resolve) => {
                dispatch(fetchTagsStart());
                console.log('Fetching tags in progress');
                client.fetchTags(accessToken).then((tags) => {
                    dispatch(fetchTagsSuccess(tags));
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

export const addTagAction = (
    name: string,
    color: number,
): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
    // Invoke API
    return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        if (localStorage.getItem('token') !== null) {
            const accessToken = localStorage.getItem('token') || '';
            return new Promise<void>((resolve) => {
                dispatch(fetchTagsStart());
                console.log('Adding tag in progress');
                client.addTag(accessToken, name, color).then((tags) => {
                    dispatch(fetchTagsAction());
                    dispatch(showSuccessSnackbar('Successfully added tag!'));
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

export const fetchColorsAction = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
    // Invoke API
    return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>, getState: () => RootState): Promise<void> => {
        if (localStorage.getItem('token') !== null) {
            // if (getState().tags.tagReducer.fetched) {
            //     console.log('Already fetched colors!');
            //     return new Promise<void>((resolve) => {
            //         resolve();
            //     });
            // }
            const accessToken = localStorage.getItem('token') || '';
            return new Promise<void>((resolve) => {
                dispatch(fetchColorsStart());
                console.log('Fetching colors in progress');
                client.fetchColors(accessToken).then((colors) => {
                    dispatch(fetchColorsSuccess(colors));
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
