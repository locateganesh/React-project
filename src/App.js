
// import { Link } from 'react-router';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Home from './pages/home';
import Product from './pages/product';
import RootLayout from './Root';
import ErrorPage from './pages/Error';
import ProductDetails from './pages/ProductDetails';

// Create Wrapping layout
// Absolute path when start with / child paths
// const router = createBrowserRouter([
//   {
//     path:'/',
//     element: <RootLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {path: '/', element: <Home />},
//       {path: '/products', element: <Product /> },
//       {path: '/products/:productId', element: <ProductDetails /> }
//     ]
//   },
// ]);

// Relative path when start with / child paths
const router = createBrowserRouter([
  {
    path:'/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // {path: '', element: <Home />}, {/* this is fine */ }
      {index: true, element: <Home />}, // But this becomes default path to root / path.
      {path: 'products', element: <Product /> },
      {path: 'products/:productId', element: <ProductDetails /> }
    ]
  },
]);


// const router = createBrowserRouter([
//   {path: '/', element: <Home />},
//   {path: '/products', element: <Product /> }
// ]);


// Second Approach
// const routerDefinition = createRoutesFromElements(
//   <Route>
//     <Route path='/' element={<Home />} />
//     <Route path='/products' element={<Product />} />
//   </Route>
// );
// const router = createBrowserRouter(routerDefinition);

function App() {
  return <>
    {/* <header>
      <Link to='/'>Home</Link>
      <Link to='/products'>Products</Link>
    </header> */}
    <RouterProvider router={router} />
  </>;

  // react router < 6.4
  // <Route path="/">
  //   <Home />
  // </Route>
  // <Route path="/products">
  //   <Product />
  // </Route>

}

export default App;
