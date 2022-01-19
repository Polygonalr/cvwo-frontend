import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        initialised: false,
        user: {
            username: '',
            name: '',
            role: -1,
        },
    },
    reducers: {
        setLoggedIn: (state, action) => {
            state.initialised = true;
            state.user = action.payload;
        },
    },
});

export default userSlice.reducer;
