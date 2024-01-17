import pool from '../../db/db';

type Song = {
  id: string;
  title: string;
  duration: number;
  album_id: string;
};

async function createSong(
  title: string,
  duration: number,
  album_id: string
): Promise<Song> {
  const result = await pool.query(
    'INSERT INTO songs(title, duration, album_id) VALUES($1, $2, $3) RETURNING *',
    [title, duration, album_id]
  );
  return result.rows[0];
}

async function getSongsByAlbum(album_id: string): Promise<Song[]> {
  const result = await pool.query('SELECT * FROM songs WHERE album_id = $1', [
    album_id,
  ]);
  return result.rows;
}

async function getAllSongs() {
  const result = await pool.query('SELECT * FROM songs');
  return result.rows;
}

async function getSong(songId: string): Promise<Song> {
  const result = await pool.query('SELECT * FROM songs WHERE id = $1', [
    songId,
  ]);
  return result.rows[0];
}

async function updateSong(
  songId: string,
  { title, duration, album_id }: any
): Promise<Song> {
  const result = await pool.query(
    'UPDATE songs SET title = $1, duration = $2, album_id = $3 WHERE id = $4 RETURNING *',
    [title, duration, album_id, songId]
  );
  return result.rows[0];
}

async function deleteSong(songId: string): Promise<Song> {
  const result = await pool.query(
    'DELETE FROM songs WHERE id = $1 RETURNING *',
    [songId]
  );
  return result.rows[0];
}

export const SongModel = {
  createSong,
  getSongsByAlbum,
  getAllSongs,
  getSong,
  updateSong,
  deleteSong,
};
