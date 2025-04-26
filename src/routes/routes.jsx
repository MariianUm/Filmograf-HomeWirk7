import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Favorites = lazy(() => import('./pages/Favorites'));
const AddMovie = lazy(() => import('./pages/AddMovie'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));
const EditMovie = lazy(() => import('./pages/EditMovie'));
const NotFound = lazy(() => import('./pages/NotFound'));

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/favorites',
    element: <Favorites />,
  },
  {
    path: '/add-movie',
    element: <AddMovie />,
  },
  {
    path: '/movie/:id',
    element: <MovieDetails />,
  },
  {
    path: '/edit-movie/:id',
    element: <EditMovie />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;