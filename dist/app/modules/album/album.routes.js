"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const album_controller_1 = require("./album.controller");
const album_validation_1 = require("./album.validation");
const router = express_1.default.Router();
router.post('/create-album', (0, auth_1.default)(), (0, validateRequest_1.default)(album_validation_1.AlbumValidation.createAlbumSchema), album_controller_1.AlbumController.createAlbum);
router.get('/', (0, auth_1.default)(), album_controller_1.AlbumController.getAlbums);
router.get('/:id', (0, auth_1.default)(), album_controller_1.AlbumController.getSingleAlbum);
router.patch('/:id', (0, auth_1.default)(), (0, validateRequest_1.default)(album_validation_1.AlbumValidation.updateAlbumSchema), album_controller_1.AlbumController.updateAlbum);
router.delete('/:id', (0, auth_1.default)(), album_controller_1.AlbumController.deleteAlbum);
exports.AlbumRoutes = router;
