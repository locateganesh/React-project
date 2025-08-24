// import { createStore } from 'redux';
// import { createReducer } from "@reduxjs/toolkit"; // for reducer 
import { configureStore } from "@reduxjs/toolkit"; // but createSlice is more powerful.

import counterReducer from './counter';
import authReducer from './auth';

const store = configureStore({
    // reducer: counterSlide.reducer // when only slide is present
    reducer: {
        // counter: counterSlide.reducer,
        counter: counterReducer,
        auth: authReducer
    }
});


export default store;