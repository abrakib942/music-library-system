import { z } from 'zod';

const createSongSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    duration: z.number({
      required_error: 'duration is required',
    }),
    album_id: z.string({
      required_error: 'album_id is required',
    }),
  }),
});

const updateSongSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    duration: z.number({
      required_error: 'duration is required',
    }),
    album_id: z.string({
      required_error: 'album_id is required',
    }),
  }),
});

export const SongValidation = {
  createSongSchema,
  updateSongSchema,
};
