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

  const values: any[] = Object.values(filter).filter(
    value => value !== undefined
  );

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

  const result = await pool.query(query, values);
  return result.rows;
}

async function getSingleAlbum(albumId: string): Promise<Album | null> {
  const albumResult = await pool.query('SELECT * FROM albums WHERE id = $1', [
    albumId,
  ]);

  if (albumResult.rows.length === 0) {
    return null;
  }

  const artistResult = await pool.query(
    'SELECT artists.id, artists.name FROM artists ' +
      'INNER JOIN album_artists ON artists.id = album_artists.artist_id ' +
      'WHERE album_artists.album_id = $1',
    [albumId]
  );

  const album = albumResult.rows[0];
  album.artists = artistResult.rows;

  return album;
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
