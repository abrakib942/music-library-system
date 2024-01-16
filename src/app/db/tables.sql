CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE
    users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
    );

CREATE TABLE
    albums (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        release_year INTEGER NOT NULL,
        genre VARCHAR(50) NOT NULL
    );

CREATE TABLE
    artists (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(100) NOT NULL
    );

CREATE TABLE
    album_artists (
        album_id UUID REFERENCES albums(id),
        artist_id UUID REFERENCES artists(id),
        PRIMARY KEY (album_id, artist_id)
    );

CREATE TABLE
    songs (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        duration INTEGER NOT NULL,
        album_id UUID REFERENCES albums(id),
        FOREIGN KEY (album_id) REFERENCES albums(id)
    );

INSERT INTO
    songs (title, duration, album_id)
VALUES (
        'mon majhi',
        2022,
        'dc337f6e-e5d7-4830-8cda-0210c6f24156'
    )
RETURNING id;

INSERT INTO artists (name) VALUES ('AB') RETURNING id;

INSERT INTO
    users (name, email, password)
VALUES ('AB', 'ab@gmail.com', '123456')
RETURNING id

SELECT * FROM albums;

SELECT * FROM artists

SELECT * FROM songs

SELECT * FROM album_artists

SELECT * FROM users