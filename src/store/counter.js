import { createSlice } from "@reduxjs/toolkit"; 

const initialCounterState = { 
    counter:0, 
    showCounter: true
};

const counterSlide = createSlice({
    name: "counter", // Every slice needs a name, it can be any name.
    initialState: initialCounterState,
    reducers: { // Reducer is required in every slice.
        increment(state) { // You can directly override state in redux toolkit. Because redux toolkit handles state overriding itself.
            state.counter++;
        }, 
        decrement(state) {
            state.counter--;
        },
        incerase(state, action) {
            state.counter = state.counter + action.payload; 
        },
        toggle(state) {
            state.showCounter = !state.showCounter;
        }
    }
});

export const counterActions = counterSlide.actions;
export default counterSlide.reducer;
