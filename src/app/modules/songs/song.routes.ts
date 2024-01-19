import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SongController } from './song.controller';
import { SongValidation } from './song.validation';

const router = express.Router();

router.post(
  '/create-song',
  auth(),
  validateRequest(SongValidation.createSongSchema),
  SongController.createSong
);

router.get('/', auth(), SongController.getAllSongs);

router.get('/:album_id', auth(), SongController.getSongsByAlbum);
// router.get('/:id', auth(), SongController.getSingleSong);

router.patch(
  '/:id',
  auth(),
  validateRequest(SongValidation.updateSongSchema),
  SongController.updateSong
);
router.delete('/:id', auth(), SongController.deleteSong);

export const SongRoutes = router;
