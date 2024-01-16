import bcrypt from 'bcrypt';
import ApiError from '../../../errors/ApiError';
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

async function loginUser(email: string, password: string) {
  const user = await pool.query('SELECT * FROM users WHERE email = $1 ', [
    email,
  ]);

  if (!user.rows[0]) {
    throw new ApiError(
      400,
      'User not found. Please check your email and try again.'
    );
  }

  const matchedPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!matchedPassword) {
    throw new ApiError(400, 'Incorrect password. Please try again.');
  }

  return user.rows[0];
}

export const UserModel = {
  signupUser,
  getUniqueUser,
  loginUser,
};
