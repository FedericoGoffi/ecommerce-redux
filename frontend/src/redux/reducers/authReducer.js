import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        }
    }
});

export const { setCredentials, logout } = authReducer.actions;
export default authReducer.reducer;