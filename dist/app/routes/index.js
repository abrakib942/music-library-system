"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const album_routes_1 = require("../modules/album/album.routes");
const artists_routes_1 = require("../modules/artists/artists.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const song_routes_1 = require("../modules/songs/song.routes");
const user_routes_1 = require("../modules/users/user.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        routes: auth_routes_1.AuthRoutes,
    },
    {
        path: '/users',
        routes: user_routes_1.UserRoutes,
    },
    {
        path: '/albums',
        routes: album_routes_1.AlbumRoutes,
    },
    {
        path: '/songs',
        routes: song_routes_1.SongRoutes,
    },
    {
        path: '/artists',
        routes: artists_routes_1.ArtistRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
