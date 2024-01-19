"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistModel = void 0;
const db_1 = __importDefault(require("../../db/db"));
function createArtist(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('INSERT INTO artists(name) VALUES($1) RETURNING *', [name]);
        return result.rows[0];
    });
}
function getArtists() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `SELECT * FROM artists
    INNER JOIN album_artists ON artists.id = album_artists.artist_id

    `;
        // const query = `SELECT * FROM album_artists
        //   JOIN artists ON album_artists.artist_id = artists.id
        //   JOIN albums ON album_artists.album_id = albums.id
        //   `;
        const result = yield db_1.default.query(query);
        return result.rows;
    });
}
function getSingleArtist(artistId) {
    return __awaiter(this, void 0, void 0, function* () {
        const artistResult = yield db_1.default.query(`SELECT * FROM artists WHERE id = $1`, [
            artistId,
        ]);
        const albumResult = yield db_1.default.query(`
   SELECT * FROM albums 
      INNER JOIN album_artists ON albums.id = album_artists.album_id 
      WHERE album_artists.artist_id = $1`, [artistId]);
        const artist = artistResult.rows[0];
        artist.albums = albumResult.rows;
        return artist;
    });
}
function updateArtist(artistId, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('UPDATE artists SET name = $1 WHERE id = $2 RETURNING *', [name, artistId]);
        return result.rows[0];
    });
}
function deleteArtist(artistId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('DELETE FROM artists WHERE id = $1 RETURNING *', [artistId]);
        return result.rows[0];
    });
}
exports.ArtistModel = {
    createArtist,
    getArtists,
    getSingleArtist,
    updateArtist,
    deleteArtist,
};
