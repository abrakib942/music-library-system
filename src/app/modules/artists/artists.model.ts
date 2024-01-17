import pool from '../../db/db';

type Artist = {
  id: string;
  name: string;
};

async function createArtist(name: string): Promise<Artist> {
  const result = await pool.query(
    'INSERT INTO artists(name) VALUES($1) RETURNING *',
    [name]
  );
  return result.rows[0];
}

async function getArtists(): Promise<Artist[]> {
  const result = await pool.query('SELECT * FROM artists');
  return result.rows;
}

async function getSingleArtist(artistId: string): Promise<Artist> {
  const result = await pool.query('SELECT * FROM artists WHERE id = $1', [
    artistId,
  ]);
  return result.rows[0];
}

async function updateArtist(artistId: string, name: string): Promise<Artist> {
  const result = await pool.query(
    'UPDATE artists SET name = $1 WHERE id = $2 RETURNING *',
    [name, artistId]
  );
  return result.rows[0];
}

async function deleteArtist(artistId: string): Promise<Artist> {
  const result = await pool.query(
    'DELETE FROM artists WHERE id = $1 RETURNING *',
    [artistId]
  );
  return result.rows[0];
}

export const ArtistModel = {
  createArtist,
  getArtists,
  getSingleArtist,
  updateArtist,
  deleteArtist,
};
