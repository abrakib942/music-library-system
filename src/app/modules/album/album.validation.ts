import { z } from 'zod';

const createAlbumSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    release_year: z.number({
      required_error: 'release_year is required',
    }),
    genre: z.string({
      required_error: 'genre is required',
    }),
  }),
});

const updateAlbumSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    release_year: z.number({
      required_error: 'release_year is required',
    }),
    genre: z.string({
      required_error: 'genre is required',
    }),
  }),
});

export const AlbumValidation = {
  createAlbumSchema,
  updateAlbumSchema,
};
