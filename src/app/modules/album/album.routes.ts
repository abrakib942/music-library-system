import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AlbumController } from './album.controller';
import { AlbumValidation } from './album.validation';

const router = express.Router();

router.post(
  '/create-album',
  auth(),
  validateRequest(AlbumValidation.createAlbumSchema),
  AlbumController.createAlbum
);
router.get('/', auth(), AlbumController.getAlbums);

router.get('/:id', auth(), AlbumController.getSingleAlbum);
router.patch(
  '/:id',
  auth(),
  validateRequest(AlbumValidation.updateAlbumSchema),
  AlbumController.updateAlbum
);
router.delete('/:id', auth(), AlbumController.deleteAlbum);

export const AlbumRoutes = router;
