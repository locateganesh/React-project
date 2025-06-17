import { useContext, useState, useActionState } from "react";
import Modal from "../../UI/Modal";
import CartContext from "../../store/CartContext";
import { currencyFormatter } from '../../utils/formatting';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import UserProgressContext from "../../store/UserProgressContext";
import useHttp from '../../hooks/useHttp';
import Error from "../Error/Error.jsx";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: {}
};

export default function Checkout() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const { data, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', [], requestConfig);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    const handleClose = () => {
        userProgressCtx.hideCheckout();
    }

    const handleFinish = () => {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        setIsSubmitted(false);
        clearData();
        // console.log(cartCtx);
    }
    /*
    const handleSubmit = async (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }));
        setIsSubmitted(true);
    }
    */
    // via form action
    async function checkoutAction(prevState, fd) {
        const customerData = Object.fromEntries(fd.entries());
        await sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }));
        setIsSubmitted(true);
    }

    const [formState, formAction, pending] = useActionState(checkoutAction, null); // second argument is initial form state which is null.

    let actions = <><Button type="button" textOnly onClick={handleClose}>Close</Button><Button>Submit Order</Button></>;

    if (pending) {
        actions = <span>Sending form data...</span>;
    }

    if (data && !error && isSubmitted) {
        return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>We will get back to you via email within few minutes.</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
    }

    return <Modal className="checkout" open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        {/* <form onSubmit={handleSubmit}> */}
        <form action={formAction}>
            <Input label="Full Name" id="name" type="text" />
            <Input label="Email Address" id="email" type="email" />
            <Input label="Street" id="street" type="text" />
            <div className="control-row">
                <Input label="Pincode" id="postal-code" type="number" />
                <Input label="City" id="city" type="text" />
            </div>
            {error && <Error title="Failed to submit order" message={error} />}
            <p className="modal-actions">
                {actions}
            </p>
        </form>
    </Modal>
}