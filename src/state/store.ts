import userReducers from './reducers/userReducers';
import uiReducers from './reducers/uiReducers';
import taskReducers from './reducers/taskReducers';
// eslint-disable-next-line import/named
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

export const store = configureStore({
    reducer: {
        user: userReducers,
        ui: uiReducers,
        tasks: taskReducers,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export default store;
