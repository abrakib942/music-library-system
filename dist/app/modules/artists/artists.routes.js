"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const artists_controller_1 = require("./artists.controller");
const router = express_1.default.Router();
router.post('/create-artist', (0, auth_1.default)(), artists_controller_1.ArtistController.createArtist);
router.get('/', (0, auth_1.default)(), artists_controller_1.ArtistController.getArtists);
router.get('/:id', (0, auth_1.default)(), artists_controller_1.ArtistController.getSingleArtist);
router.patch('/:id', (0, auth_1.default)(), artists_controller_1.ArtistController.updateArtist);
router.delete('/:id', (0, auth_1.default)(), artists_controller_1.ArtistController.deleteArtist);
exports.ArtistRoutes = router;
