import { createBrowserRouter } from 'react-router-dom';
import Home from './routes/home-page/Home';
import VideoPlayer from './component/VideoPlayerBar/VideoPlayer';
import Layout from './routes/layout-page/Layout';
import Category from './routes/category-page/Category';
import Account from './routes/account-page/Account';
import ErrorPage from './routes/error-page/ErrorPage'; 
import CancelAccount from './routes/cancel-account-page/CancelAccount';
import CancelReason from './routes/cancel-reason-page/CancelReason';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'video/:id',
        element: <VideoPlayer />,
      },
      {
        path: 'category/:id',
        element: <Category />,
      },
      {
        path: 'category/:id/instructor/:instructorId',
        element: <Category />,
      },
      {
        path: 'category/:id/duration/:duration',
        element: <Category />,
      },
      {
        path: 'category/:id/instructor/:instructorId/duration/:duration',
        element: <Category />,
      },
      {
        path: 'account',
        element: <Account />,
      },

      {
        path: '/account/cancel',
        element: <CancelAccount />,
      },
      {
        path: '/account/cancel/reason',
        element: <CancelReason />,
      },
      // {
      //   path: '*',
      //   element: <ErrorPage />, 
      // },
    ],
  },
]);
