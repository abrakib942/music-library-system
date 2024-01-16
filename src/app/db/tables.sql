CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
    );

CREATE TABLE
    albums (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        release_year INTEGER NOT NULL,
        genre VARCHAR(50) NOT NULL
    );

CREATE TABLE
    artists (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
    );

CREATE TABLE
    album_artists (
        album_id INTEGER REFERENCES albums(id),
        artist_id INTEGER REFERENCES artists(id),
        PRIMARY KEY (album_id, artist_id)
    );

CREATE TABLE
    songs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        duration INTEGER NOT NULL,
        album_id INTEGER REFERENCES albums(id),
        FOREIGN KEY (album_id) REFERENCES albums(id)
    );