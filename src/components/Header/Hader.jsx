import { useContext } from 'react';
import logoImage from '../../assets/logo.jpg';
import Button from '../../UI/Button.jsx';
import CartContext from '../../store/CartContext.jsx';
import UserProgressContext from '../../store/UserProgressContext.jsx';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const totalCartItem = cartCtx.items.reduce((totalNumberofItems, item) => {
        return totalNumberofItems + item.quantity;
    }, 0);

    const handleShowCart = () => {
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title"> 
                <img src={logoImage} alt="React food Restourant" />
                <h1>React Food</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalCartItem})</Button>
            </nav>
        </header>
    )
}