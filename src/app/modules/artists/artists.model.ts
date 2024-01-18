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
  const query = `SELECT * FROM artists
    INNER JOIN album_artists ON artists.id = album_artists.artist_id

    `;

  // const query = `SELECT * FROM album_artists
  //   JOIN artists ON album_artists.artist_id = artists.id
  //   JOIN albums ON album_artists.album_id = albums.id

  //   `;

  const result = await pool.query(query);

  return result.rows;
}

async function getSingleArtist(artistId: string): Promise<Artist> {
  const artistResult = await pool.query(`SELECT * FROM artists WHERE id = $1`, [
    artistId,
  ]);

  const albumResult = await pool.query(
    `
   SELECT * FROM albums 
      INNER JOIN album_artists ON albums.id = album_artists.album_id 
      WHERE album_artists.artist_id = $1`,
    [artistId]
  );

  const artist = artistResult.rows[0];
  artist.albums = albumResult.rows;

  return artist;
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
