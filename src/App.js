import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Blog page is not required initially. So it should be lazy loaded.
// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';

const BlogPage = lazy(() => import('./pages/Blog'));
const PostPage = lazy(() => import('./pages/Post'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          // { index: true, element: <BlogPage />, loader: postsLoader },
          { 
            index: true, 
            element: <Suspense fallback={<p>Loading...</p>}><BlogPage /></Suspense>, 
            loader: () => import('./pages/Blog').then(module => module.loader()) 
          },
          // { 
          //   path: ':id', 
          //   element: <PostPage />, 
          //   loader: postLoader 
          // },
          { 
            path: ':id', 
            element: <Suspense fallback={<p>Loading...</p>}><PostPage /></Suspense>, 
            loader: (meta) =>  import('./pages/Post').then(module => module.loader(meta))
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
