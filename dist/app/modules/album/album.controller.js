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
exports.AlbumController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const album_model_1 = require("./album.model");
const createAlbum = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, genre, release_year } = req.body;
        const result = yield album_model_1.AlbumModel.createAlbum(title, release_year, genre);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'album created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAlbums = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, pick_1.default)(req.query, ['title', 'release_year', 'genre']);
        const options = (0, pick_1.default)(req.query, ['limit', 'page']);
        const result = yield album_model_1.AlbumModel.getAlbums(filters, options);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'albums retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleAlbum = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield album_model_1.AlbumModel.getSingleAlbum(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Album retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateAlbum = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, release_year, genre } = req.body;
        const result = yield album_model_1.AlbumModel.updateAlbum(id, title, release_year, genre);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Album updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteAlbum = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield album_model_1.AlbumModel.deleteAlbum(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Album deleted successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AlbumController = {
    createAlbum,
    getAlbums,
    getSingleAlbum,
    updateAlbum,
    deleteAlbum,
};
