import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice(({
    name:         'user',
    initialState: {},
    reducers:     {
        setSession(state, action) {
            state.session = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        logout(state) {
            state.session = null;
            state.user    = null;
        },
    },
}))

export default userSlice;
export const userActions = userSlice.actions;
