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
    yarn start
    ```

    The application will be accessible at http://localhost:5000.

### API Information (Request and Response)

That's it! You have successfully set up the Music Library System project. You can now start exploring and working with the codebase. Refer to the project documentation or README for further instructions on how to run and use the system.

Happy coding!

```

```
