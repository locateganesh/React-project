import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui-slice';

const CartButton = () => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector(state => state.cart.totalQuantity);

  const handleCartToggle = () => {
    dispatch(uiActions.toggle());
  }
  // console.log(cart);
  return (
    <button className={classes.button} onClick={handleCartToggle}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity || 0}</span>
    </button>
  );
};

export default CartButton;
