/* eslint-disable @typescript-eslint/no-explicit-any */

import pool from '../../db/db';

type Album = {
  id: string;
  title: string;
  release_year: number;
  genre: string;
};

async function createAlbum(
  title: string,
  release_year: number,
  genre: string
): Promise<Album> {
  const result = await pool.query(
    'INSERT INTO albums(title, release_year, genre) VALUES($1, $2, $3) RETURNING *',
    [title, release_year, genre]
  );
  return result.rows[0];
}

async function getAlbums(
  filter: { genre?: string; release_year?: number; title?: string },
  options: any
): Promise<Album[]> {
  let query = 'SELECT * FROM albums WHERE 1=1';
  const values: any[] = [];

  const { page: offset, limit } = options;

  // Add filters
  if (filter) {
    if (filter.genre) {
      query += ' AND genre = $1';
      values.push(filter.genre);
    }
    if (filter.release_year) {
      query += ' AND release_year = $1';
      values.push(filter.release_year);
    }
    if (filter.title) {
      query += ' AND title ILIKE $1::text';
      values.push(`%${filter.title}%`);
    }
  }

  if (offset || limit) {
    query += ' ORDER BY created_at DESC, title OFFSET $1 LIMIT $2';
    values.push(offset, limit);
  }

  const result = await pool.query(query, values);
  return result.rows;
}

async function getSingleAlbum(albumId: string): Promise<Album> {
  const result = await pool.query('SELECT * FROM albums WHERE id = $1', [
    albumId,
  ]);

  return result.rows[0];
}

async function updateAlbum(
  albumId: string,
  title?: string,
  release_year?: number,
  genre?: string
): Promise<Album> {
  const result = await pool.query(
    'UPDATE albums SET title = $1, release_year = $2, genre = $3 WHERE id = $4 RETURNING *',
    [title, release_year, genre, albumId]
  );
  return result.rows[0];
}

async function deleteAlbum(albumId: string): Promise<Album> {
  const result = await pool.query(
    'DELETE FROM albums WHERE id = $1 RETURNING *',
    [albumId]
  );
  return result.rows[0];
}

export const AlbumModel = {
  createAlbum,
  getAlbums,
  getSingleAlbum,
  updateAlbum,
  deleteAlbum,
};
