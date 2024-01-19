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
exports.SongController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const song_model_1 = require("./song.model");
const createSong = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, duration, album_id } = req.body;
        const result = yield song_model_1.SongModel.createSong(title, duration, album_id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Song created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSongsByAlbum = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { album_id } = req.params;
        const result = yield song_model_1.SongModel.getSongsByAlbum(album_id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Songs retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllSongs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield song_model_1.SongModel.getAllSongs();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Songs retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleSong = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield song_model_1.SongModel.getSong(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'song retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateSong = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield song_model_1.SongModel.updateSong(id, req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Song updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteSong = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield song_model_1.SongModel.deleteSong(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Song deleted successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.SongController = {
    createSong,
    getSongsByAlbum,
    getAllSongs,
    getSingleSong,
    updateSong,
    deleteSong,
};
