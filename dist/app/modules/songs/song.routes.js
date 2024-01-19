"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const song_controller_1 = require("./song.controller");
const song_validation_1 = require("./song.validation");
const router = express_1.default.Router();
router.post('/create-song', (0, auth_1.default)(), (0, validateRequest_1.default)(song_validation_1.SongValidation.createSongSchema), song_controller_1.SongController.createSong);
router.get('/', (0, auth_1.default)(), song_controller_1.SongController.getAllSongs);
router.get('/:album_id', (0, auth_1.default)(), song_controller_1.SongController.getSongsByAlbum);
// router.get('/:id', auth(), SongController.getSingleSong);
router.patch('/:id', (0, auth_1.default)(), (0, validateRequest_1.default)(song_validation_1.SongValidation.updateSongSchema), song_controller_1.SongController.updateSong);
router.delete('/:id', (0, auth_1.default)(), song_controller_1.SongController.deleteSong);
exports.SongRoutes = router;
