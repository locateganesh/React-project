import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { 
    items: [],
    totalQuantity: 0,
    totalAmount: 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        addItemToCart(state, action) {
            // console.log(state, action.payload);
            // state.title = action.payload.title;
            // state.price = action.payload.price;
            // state.quantity++;
            // state.total = state.price * state.quantity;
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalAmount: newItem.price,
                    title: newItem.title,
                })
            } else {
                existingItem.quantity++;
                existingItem.totalAmount = existingItem.totalAmount + newItem.price;
            }
        },
        // increaseQuantity(state) {
        //     state.quantity++;
        //     state.total = state.price * state.quantity;
        // },
        removeItemToCart(state, action) {
            // state.quantity--;
            // state.total = state.price * state.quantity;
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id); 
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalAmount = existingItem.totalAmount - existingItem.price;
            }
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;