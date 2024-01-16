import pool from '../../db/db';

async function signupUser(name: string, email: string, password: string) {
  const result = await pool.query(
    'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *',
    [name, email, password]
  );
  return result.rows[0];
}

async function getUniqueUser(name: string, email: string) {
  const result = await pool.query(
    'SELECT * FROM users WHERE name = $1 OR email = $2',
    [name, email]
  );
  return result.rows[0];
}

export const UserModel = {
  signupUser,
  getUniqueUser,
};
