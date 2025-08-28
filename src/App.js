import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
// import dotenv from 'dotenv';

// dotenv.config();

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const isCartVisible = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(()=>{
    const fetchAPi = async() => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!'
      }));
      const response = await fetch('https://react-redux-async-755dc-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
      });
      if (!response.ok) {
        throw new Error('Something went wrong!');
        
      }
      // const responseData = await response.json();
      // console.log(responseData);

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully!'
      }));
    }

    if (isInitial) {
      isInitial = false;
      return;
    }

    fetchAPi().catch(error => {
      dispatch(uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data is failed!'
        }));
    })
  },[cart, dispatch]);

  // console.log(process.env.REACT_APP_API);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
    
  );
}

export default App;
