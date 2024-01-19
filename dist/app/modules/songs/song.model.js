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
exports.SongModel = void 0;
const db_1 = __importDefault(require("../../db/db"));
function createSong(title, duration, album_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('INSERT INTO songs(title, duration, album_id) VALUES($1, $2, $3) RETURNING *', [title, duration, album_id]);
        return result.rows[0];
    });
}
function getSongsByAlbum(album_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('SELECT * FROM songs WHERE album_id = $1', [
            album_id,
        ]);
        return result.rows;
    });
}
function getAllSongs() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('SELECT * FROM songs');
        return result.rows;
    });
}
function getSong(songId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('SELECT * FROM songs WHERE id = $1', [
            songId,
        ]);
        return result.rows[0];
    });
}
function updateSong(songId, { title, duration, album_id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('UPDATE songs SET title = $1, duration = $2, album_id = $3 WHERE id = $4 RETURNING *', [title, duration, album_id, songId]);
        return result.rows[0];
    });
}
function deleteSong(songId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('DELETE FROM songs WHERE id = $1 RETURNING *', [songId]);
        return result.rows[0];
    });
}
exports.SongModel = {
    createSong,
    getSongsByAlbum,
    getAllSongs,
    getSong,
    updateSong,
    deleteSong,
};
