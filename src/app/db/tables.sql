CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY, name VARCHAR(50) UNIQUE NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(100) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE albums (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY, title VARCHAR(100) NOT NULL, release_year INTEGER NOT NULL, genre VARCHAR(50) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE artists (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY, name VARCHAR(100) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE album_artists (
    album_id UUID REFERENCES albums (id), artist_id UUID REFERENCES artists (id), PRIMARY KEY (album_id, artist_id)
);

CREATE TABLE songs (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY, title VARCHAR(100) NOT NULL, duration FLOAT NOT NULL, album_id UUID REFERENCES albums (id), FOREIGN KEY (album_id) REFERENCES albums (id), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
        '851a1ef5-07c9-4c05-851c-cd928fc473a8', 'fce5563c-7ea1-4c92-ae82-05bfe1243b62'
    );