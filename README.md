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

The base URL for all API endpoints is: `http://localhost:5000/api/v1`

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
      "message": "User created successfully",
      "data": {
        "id": "54233862-70b5-4992-804c-3672bdeaceb7",
        "name": "Steve Smith",
        "email": "smith@example.com",
        "password": "$2b$12$hAHJcNDPRb3QOsHs3by/NObEQV8faff2OmA4NWWnmlcYgpiJqTJHK",
        "created_at": "2024-01-19T10:55:55.310Z"
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
      "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NDIzMzg2Mi03MGI1LTQ5OTItODA0Yy0zNjcyYmRlYWNlYjciLCJlbWFpbCI6InNtaXRoQGV4YW1wbGUuY29tIiwiaWF0IjoxNzA1NjYxOTQxLCJleHAiOjE3MDU3NDgzNDF9.E32TZ_5BjvS68wXvdvV_yMS6CcAgVVtP7JUi-e2sBpQ"
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
        "id": "d3df9c69-a6c8-42ec-a06e-c400e01369ab",
        "title": "Jhoom",
        "release_year": 2023,
        "genre": "Pop",
        "created_at": "2024-01-19T11:05:19.920Z"
      }
    }
    ```

- **GET** `/albums`

  - Response:

  ```json
  {
    "statusCode": 200,
    "success": true,
    "message": "albums retrieved successfully",
    "data": [
      {
        "id": "6dcdbd7e-7d29-446b-894f-0900613657e2",
        "title": "obb",
        "release_year": 2023,
        "genre": "fun",
        "created_at": "2024-01-18T18:28:01.914Z",
        "album_id": "6dcdbd7e-7d29-446b-894f-0900613657e2",
        "artist_id": "f52d7590-015c-4027-8656-64fd0777938d"
      }
    ]
  }
  ```

  - **GET** `/albums/6dcdbd7e-7d29-446b-894f-0900613657e2`
  - Get Artist by album_id

  - Response

  ```json
  {
    "statusCode": 200,
    "success": true,
    "data": {
      "id": "6dcdbd7e-7d29-446b-894f-0900613657e2",
      "title": "obb",
      "release_year": 2023,
      "genre": "fun",
      "created_at": "2024-01-17T14:32:58.519Z",
      "artists": [
        {
          "id": "f52d7590-015c-4027-8656-64fd0777938d",
          "name": "Allan walker"
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
    "title": "Justin"
  }
  ```

  - Response:

  ```json
  {
    "statusCode": 200,
    "success": true,
    "message": "Artist created successfully",
    "data": {
      "id": "38c1a42e-24b2-408e-a2fe-52e680d05823",
      "name": "Justin",
      "created_at": "2024-01-19T11:10:19.006Z"
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
        "id": "f52d7590-015c-4027-8656-64fd0777938d",
        "name": "Allan walker",
        "created_at": "2024-01-18T18:28:01.914Z",
        "album_id": "6dcdbd7e-7d29-446b-894f-0900613657e2",
        "artist_id": "f52d7590-015c-4027-8656-64fd0777938d"
      }
    ]
  }
  ```

  - **GET** `/artists/f52d7590-015c-4027-8656-64fd0777938d`
  - Get album by artist_id

  - Response

  ```json
  {
    "statusCode": 200,
    "success": true,

    "data": {
      "id": "f52d7590-015c-4027-8656-64fd0777938d",
      "name": "Allan walker",
      "created_at": "2024-01-17T17:43:30.966Z",
      "albums": [
        {
          "id": "6dcdbd7e-7d29-446b-894f-0900613657e2",
          "title": "obb",
          "release_year": 2023,
          "genre": "fun",
          "created_at": "2024-01-18T18:28:01.914Z",
          "album_id": "6dcdbd7e-7d29-446b-894f-0900613657e2",
          "artist_id": "f52d7590-015c-4027-8656-64fd0777938d"
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
    "title": "Tumi",
    "duration": 4.12,
    "album_id": "6dcdbd7e-7d29-446b-894f-0900613657e2"
  }
  ```

  - Response:

  ```json
  {
    "statusCode": 200,
    "success": true,
    "message": "Song created successfully",
    "data": {
      "id": "f7fcc53d-ac8a-410e-ae5e-5cddc6d06e20",
      "title": "Tumi",
      "album_id": "6dcdbd7e-7d29-446b-894f-0900613657e2",
      "created_at": "2024-01-19T11:34:01.271Z",
      "duration": 4.12
    }
  }
  ```

That's it! You have successfully set up the Music Library System project. You can now start exploring and working with the codebase. Refer to the project documentation or README for further instructions on how to run and use the system.

Happy coding!

```

```
