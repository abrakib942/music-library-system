"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumValidation = void 0;
const zod_1 = require("zod");
const createAlbumSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is required',
        }),
        release_year: zod_1.z.number({
            required_error: 'release_year is required',
        }),
        genre: zod_1.z.string({
            required_error: 'genre is required',
        }),
    }),
});
const updateAlbumSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is required',
        }),
        release_year: zod_1.z.number({
            required_error: 'release_year is required',
        }),
        genre: zod_1.z.string({
            required_error: 'genre is required',
        }),
    }),
});
exports.AlbumValidation = {
    createAlbumSchema,
    updateAlbumSchema,
};
