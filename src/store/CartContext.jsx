import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        // state.items.push(action.item);
        const existingCarItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const updatedItems = [...state.items];
        if (existingCarItemIndex > -1) {
            const existingItem = state.items[existingCarItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems[existingCarItemIndex] = updatedItem;
        } else {
            updatedItems.push({...action.item, quantity: 1});
        }
        return {...state, items: updatedItems};
    }
    if (action.type === 'REMOVE_ITEM') {
        const existingCarItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCarItemIndex];

        const updatedItems = [...state.items];

        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCarItemIndex, 1);
        } else {
            const updateItem = {...existingCartItem, quantity: existingCartItem.quantity - 1};
            updatedItems[existingCarItemIndex] = updateItem;
        }
        return {...state, items: updatedItems};
    }
    if (action.type === 'CLEAR_CART') {
        return {...state, items: []}
    }
    return state;
}

// React 19 and above doesn't remove .Provider
export function CartContextProvider({children}) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []});

    function addItem(item) {
        dispatchCartAction({type: 'ADD_ITEM', item});
    }
    function removeItem(id) {
        dispatchCartAction({type: 'REMOVE_ITEM', id})
    }

    function clearCart() {
        dispatchCartAction({type: 'CLEAR_CART' })
    }
    
    const cartContextValue = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    };

    // console.log(CartContext);

    return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>
}

export default CartContext;