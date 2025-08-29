import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

const API_URL = "Get is form firebase - react-redux-async";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async() => {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Could not fetch cart data!');
            }
            const data = await response.json();
            return data;
        }
        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }));
        } catch(error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data is failed!'
            }));
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data!'
            })
        );

        const sendRequest = async () => {
            const response = await fetch(API_URL, {
                method: 'PUT',
                body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity})
            });
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
        };
        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully!'
            }));
        } catch(error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data is failed!'
            }));
        }
    };
};