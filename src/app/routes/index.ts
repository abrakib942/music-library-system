import express from 'express';
import { AlbumRoutes } from '../modules/album/album.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/users/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/albums',
    routes: AlbumRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
