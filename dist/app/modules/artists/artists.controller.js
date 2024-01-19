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
exports.ArtistController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const artists_model_1 = require("./artists.model");
const createArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const result = yield artists_model_1.ArtistModel.createArtist(name);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Artist created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getArtists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield artists_model_1.ArtistModel.getArtists();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Artists retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield artists_model_1.ArtistModel.getSingleArtist(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Artist retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const result = yield artists_model_1.ArtistModel.updateArtist(id, name);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Artist updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield artists_model_1.ArtistModel.deleteArtist(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Artist deleted successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.ArtistController = {
    createArtist,
    getArtists,
    getSingleArtist,
    updateArtist,
    deleteArtist,
};
