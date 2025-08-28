const { createSlice, configureStore } = require("@reduxjs/toolkit");

const initialCartState = { 
    title: '', 
    quantity: 0,
    total: 0,
    price: 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        addTocart(state, action) {
            // console.log(state, action.payload);
            state.title = action.payload.title;
            state.price = action.payload.price;
            state.quantity++;
            state.total = state.price * state.quantity;
        },
        increaseQuantity(state) {
            state.quantity++;
            state.total = state.price * state.quantity;
        },
        decreaseQuantity(state) {
            state.quantity--;
            state.total = state.price * state.quantity;
        }
    }
});

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer
    }
});

export const cartActions = cartSlice.actions;
export default store;