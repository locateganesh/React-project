import { createSlice } from "@reduxjs/toolkit"; 

const initialAuthSatte = {
    isAuthenticated: false
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthSatte,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;