import express from 'express';
import auth from '../../middlewares/auth';
import { AlbumController } from './album.controller';

const router = express.Router();

router.post('/create-album', auth(), AlbumController.createAlbum);
router.get('/', auth(), AlbumController.getAlbums);

router.get('/:id', auth(), AlbumController.getSingleAlbum);
router.patch('/:id', auth(), AlbumController.updateAlbum);
router.delete('/:id', auth(), AlbumController.deleteAlbum);

export const AlbumRoutes = router;
