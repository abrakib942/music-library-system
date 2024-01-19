# Music Library System

This guide will walk you through the process of setting up the Music Library System project. By following these steps, you will clone the project, install dependencies, and configure. Let's get started!

## Installation Steps

### Follow these steps to clone and set up starter project:

1. `Clone the project:` Open your terminal or command prompt and run the following command to clone the project repository:

```bash
git clone https://github.com/abrakib942/music-library-system
```

2. `Navigate into the project directory:` Use the cd command to navigate into the project directory:

```bash
cd music-library-system
```

3. `Install project dependencies:` Next, install the project dependencies by running the following command:

```bash
yarn install
```

Create a `.env` file in the project root with the following content:

```env
NODE_ENV=development
PORT=5000

# PostgreSQL Database Configuration

DB_USER=The username for connecting to the database.
DB_HOST="The database server's address."
DB_PASS="The password for connecting to the database."
DB_PORT="The port on which the database server is running."
DB_NAME="The name of the database."

BCRYPT_SALT_ROUNDS=12

# jwt configuration

JWT_SECRET= 'very secret'
JWT_EXPIRES_IN= 1d
JWT_REFRESH_SECRET= 'refresh-secret'
JWT_REFRESH_EXPIRES_IN= 365d"
```

```bash
yarn install
```

```bash
yarn start
```

    The application will be accessible at http://localhost:5000.

### API Information (Request and Response)

## Base URL

The base URL for all API endpoints is: `https://music-library-system.vercel.app/api/v1`

## Registration and Login

### User Registration

- **POST** `/auth/signup`

  - Create a new user account.
  - Request Body:

    ```json
    {
      "name": "Steve Smith",
      "email": "smith@example.com",
      "password": "123456"
    }
    ```

    - Response:

    ```json
    {
      "success": true,
      "statusCode": 200,
      "message": "Users created successfully",
      "data": {
        "id": "39b5408c-4775-45a1-ae77-70cf359912ee",
        "name": "Steve Smith",
        "email": "smith@example.com",
        "password": "$2b$12$Td52SvSY5Mq.Q5Eb6IGXAe2S3KEq3x7Cn6oODllH.n2I/Bh6Rf5yW",
        "created_at": "2024-01-19T06:57:53.755Z"
      }
    }
    ```

### User Login

- **POST** `/auth/login`

  - Authenticate the user.
  - Request Body:

    ```json
    {
      "email": "smith@example.com",
      "password": "123456"
    }
    ```

    - Response:

    ```json
    {
      "success": true,
      "statusCode": 200,
      "message": "user login successfully",
      "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzOWI1NDA4Yy00Nzc1LTQ1YTEtYWU3Ny03MGNmMzU5OTEyZWUiLCJlbWFpbCI6InNtaXRoQGV4YW1wbGUuY29tIiwiaWF0IjoxNzA1NjY5MTI0LCJleHAiOjE3MDU3NTU1MjR9.iJIWtlMMSbsLo3K5mcxw0avDuYzkb6zo7q94jiN3Ang"
    }
    ```

    ### Album

    - **POST** `/albums/create-album`
    - Request Body:

    ```json
    {
      "title": "Jhoom",
      "release_year": 2023,
      "genre": "Pop"
    }
    ```

    - Response:

    ```json
    {
      "statusCode": 200,
      "success": true,
      "message": "album created successfully",
      "data": {
        "id": "8616c207-d278-463d-9d4b-0186f77a5c71",
        "title": "Jhoom",
        "release_year": 2023,
        "genre": "Pop",
        "created_at": "2024-01-19T07:04:11.944Z"
      }
    }
    ```

- **GET** `/albums`

  - for filters `/albums?genre=Pop` `/albums?release_year=2023`

  - Response:

  ```json
  {
    "statusCode": 200,
    "success": true,
    "message": "albums retrieved successfully",
    "data": [
      {
        "id": "8616c207-d278-463d-9d4b-0186f77a5c71",
        "title": "Jhoom",
        "release_year": 2023,
        "genre": "Pop",
        "created_at": "2024-01-19T07:04:11.944Z",
        "album_id": "8616c207-d278-463d-9d4b-0186f77a5c71",
        "artist_id": "8a21a0cf-a3d6-49ed-a288-bcbe7d748329"
      },
      {
        "id": "5dc8ad59-e50b-42af-9540-f113e28d0253",
        "title": "Love pair",
        "release_year": 2023,
        "genre": "Love",
        "created_at": "2024-01-19T07:05:30.366Z",
        "album_id": "5dc8ad59-e50b-42af-9540-f113e28d0253",
        "artist_id": "655d476c-26a3-47e6-a45f-8fdcaa573f83"
      }
    ]
  }
  ```

  - **GET** `/albums/8616c207-d278-463d-9d4b-0186f77a5c71`
  - Get Artist by album_id

  - Response

  ```json
  {
    "statusCode": 200,
    "success": true,
    "message": "Album retrieved successfully",
    "data": {
      "id": "8616c207-d278-463d-9d4b-0186f77a5c71",
      "title": "Jhoom",
      "release_year": 2023,
      "genre": "Pop",
      "created_at": "2024-01-19T07:04:11.944Z",
      "artists": [
        {
          "id": "8a21a0cf-a3d6-49ed-a288-bcbe7d748329",
          "name": "Alan walker"
        }
      ]
    }
  }
  ```

  ### Artist

  - **POST** `/artists/create-artist`
  - Request Body:

  ```json
  {
    "title": "James"
  }
  ```

  - Response:

  ```json
  {
    "statusCode": 200,
    "success": true,
    "message": "Artist created successfully",
    "data": {
      "id": "fce5563c-7ea1-4c92-ae82-05bfe1243b62",
      "name": "james",
      "created_at": "2024-01-19T07:20:14.454Z"
    }
  }
  ```

  - **GET** `/artists`

  - Response:

  ```json
  {
    "statusCode": 200,
    "success": true,
    "message": "Artists retrieved successfully",
    "data": [
      {
        "id": "8a21a0cf-a3d6-49ed-a288-bcbe7d748329",
        "name": "Alan walker",
        "created_at": "2024-01-19T07:06:35.699Z",
        "album_id": "8616c207-d278-463d-9d4b-0186f77a5c71",
        "artist_id": "8a21a0cf-a3d6-49ed-a288-bcbe7d748329"
      },
      {
        "id": "655d476c-26a3-47e6-a45f-8fdcaa573f83",
        "name": "Balam",
        "created_at": "2024-01-19T07:06:51.977Z",
        "album_id": "5dc8ad59-e50b-42af-9540-f113e28d0253",
        "artist_id": "655d476c-26a3-47e6-a45f-8fdcaa573f83"
      }
    ]
  }
  ```

  - **GET** `/artists/8a21a0cf-a3d6-49ed-a288-bcbe7d748329`
  - Get album by artist_id

  - Response

  ```json
  {
    "statusCode": 200,
    "success": true,
    "message": "Artist retrieved successfully",
    "data": {
      "id": "8a21a0cf-a3d6-49ed-a288-bcbe7d748329",
      "name": "Alan walker",
      "created_at": "2024-01-19T07:06:35.699Z",
      "albums": [
        {
          "id": "8616c207-d278-463d-9d4b-0186f77a5c71",
          "title": "Jhoom",
          "release_year": 2023,
          "genre": "Pop",
          "created_at": "2024-01-19T07:04:11.944Z",
          "album_id": "8616c207-d278-463d-9d4b-0186f77a5c71",
          "artist_id": "8a21a0cf-a3d6-49ed-a288-bcbe7d748329"
        }
      ]
    }
  }
  ```

  ### Song

  - **POST** `/songs/create-song`
  - Request Body:

  ```json
  {
    "title": "ignite",
    "duration": 4.12,
    "album_id": "8616c207-d278-463d-9d4b-0186f77a5c71"
  }
  ```

  - Response:

  ```json
  {
    "statusCode": 200,
    "success": true,
    "message": "Song created successfully",
    "data": {
      "id": "645cbbc4-4542-45a3-abd6-a26b646f68e5",
      "title": "ignite",
      "duration": 4.12,
      "album_id": "8616c207-d278-463d-9d4b-0186f77a5c71",
      "created_at": "2024-01-19T07:11:47.770Z"
    }
  }
  ```

That's it! You have successfully set up the Music Library System project. You can now start exploring and working with the codebase. Refer to the project documentation or README for further instructions on how to run and use the system.

Happy coding!

```

```
