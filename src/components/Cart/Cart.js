import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  // console.log(cart);
  // if (cart.quantity === 0) {
  //   return null
  // }
  return (
      <Card className={classes.cart}>
        <h2>Your Shopping Cart</h2>
        <ul>
          {cartItems.map(cart => (
            <CartItem
              key={cart.id}
              item={{ 
                id: cart.id,
                title: cart.title, 
                quantity: cart.quantity, 
                total: cart.totalAmount, 
                price: cart.price 
              }}
            />
          ))}
          
        </ul>
      </Card> 
  );
};

export default Cart;
