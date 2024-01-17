import express from 'express';
import auth from '../../middlewares/auth';
import { ArtistController } from './artists.controller';

const router = express.Router();

router.post('/create-artist', auth(), ArtistController.createArtist);
router.get('/', auth(), ArtistController.getArtists);

router.get('/:id', auth(), ArtistController.getSingleArtist);
router.patch('/:id', auth(), ArtistController.updateArtist);
router.delete('/:id', auth(), ArtistController.deleteArtist);

export const ArtistRoutes = router;
