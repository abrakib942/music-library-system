import express from 'express';
import auth from '../../middlewares/auth';
import { SongController } from './song.controller';

const router = express.Router();

router.post('/create-song', auth(), SongController.createSong);

router.get('/', auth(), SongController.getAllSongs);

router.get('/:album_id', auth(), SongController.getSongsByAlbum);
router.get('/:id', auth(), SongController.getSingleSong);

router.patch('/:id', auth(), SongController.updateSong);
router.delete('/:id', auth(), SongController.deleteSong);

export const SongRoutes = router;
