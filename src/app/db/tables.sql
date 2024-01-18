CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY, name VARCHAR(50) UNIQUE NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(100) NOT NULL
);

CREATE TABLE albums (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY, title VARCHAR(100) NOT NULL, release_year INTEGER NOT NULL, genre VARCHAR(50) NOT NULL
);

CREATE TABLE artists (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY, name VARCHAR(100) NOT NULL
);

CREATE TABLE album_artists (
    album_id UUID REFERENCES albums (id), artist_id UUID REFERENCES artists (id), PRIMARY KEY (album_id, artist_id)
);

CREATE TABLE songs (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY, title VARCHAR(100) NOT NULL, duration FLOAT NOT NULL, album_id UUID REFERENCES albums (id), FOREIGN KEY (album_id) REFERENCES albums (id)
);

ALTER TABLE albums
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE artists
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE songs ADD COLUMN duration FLOAT

SELECT * FROM albums;

SELECT * FROM artists

SELECT * FROM songs

SELECT * FROM album_artists

SELECT * FROM users

INSERT INTO
    album_artists (album_id, artist_id)
VALUES (
        '6dcdbd7e-7d29-446b-894f-0900613657e2', 'f52d7590-015c-4027-8656-64fd0777938d'
    );