"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.AlbumModel = void 0;
const db_1 = __importDefault(require("../../db/db"));
function createAlbum(title, release_year, genre) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('INSERT INTO albums(title, release_year, genre) VALUES($1, $2, $3) RETURNING *', [title, release_year, genre]);
        return result.rows[0];
    });
}
function getAlbums(filter, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const whereClause = Object.keys(filter)
            .filter(key => filter[key] !== undefined)
            .map((key, index) => `${key} = $${index + 1}`)
            .join(' AND ');
        // const { page: offset, limit } = options;
        // const currentPage = 1;
        // ORDER BY created_at DESC
        // LIMIT 10 OFFSET ${(currentPage - 1) * 10}
        // `;
        const query = `SELECT * FROM albums

 INNER JOIN album_artists ON albums.id = album_artists.album_id

  ${whereClause ? ' WHERE ' + whereClause : ''}
   
  `;
        const values = Object.values(filter).filter(value => value !== undefined);
        // Add filters
        // if (filter) {
        //   if (filter.genre) {
        //     query += ' AND genre = $1';
        //     values.push(filter.genre);
        //   }
        //   if (filter.release_year) {
        //     query += ' AND release_year = $2';
        //     values.push(filter.release_year);
        //   }
        //   if (filter.title) {
        //     query += ' AND title ILIKE $3::text';
        //     values.push(`%${filter.title}%`);
        //   }
        // }
        const result = yield db_1.default.query(query, values);
        return result.rows;
    });
}
function getSingleAlbum(albumId) {
    return __awaiter(this, void 0, void 0, function* () {
        const albumResult = yield db_1.default.query('SELECT * FROM albums WHERE id = $1', [
            albumId,
        ]);
        if (albumResult.rows.length === 0) {
            return null;
        }
        const artistResult = yield db_1.default.query('SELECT artists.id, artists.name FROM artists ' +
            'INNER JOIN album_artists ON artists.id = album_artists.artist_id ' +
            'WHERE album_artists.album_id = $1', [albumId]);
        const album = albumResult.rows[0];
        album.artists = artistResult.rows;
        return album;
    });
}
function updateAlbum(albumId, title, release_year, genre) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('UPDATE albums SET title = $1, release_year = $2, genre = $3 WHERE id = $4 RETURNING *', [title, release_year, genre, albumId]);
        return result.rows[0];
    });
}
function deleteAlbum(albumId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('DELETE FROM albums WHERE id = $1 RETURNING *', [albumId]);
        return result.rows[0];
    });
}
exports.AlbumModel = {
    createAlbum,
    getAlbums,
    getSingleAlbum,
    updateAlbum,
    deleteAlbum,
};
