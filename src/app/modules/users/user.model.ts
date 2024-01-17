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

async function getAllUsers() {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
}

async function getSingleUser(userId: string) {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [
    userId,
  ]);

  return result.rows[0];
}

// async function updateUser(userId: string, updatedFields?: any) {
//   const { name, email, password } = updatedFields;

//   let hashedPassword;
//   if (password) {
//     hashedPassword = await bcrypt.hash(
//       password,
//       Number(config.bycrypt_salt_rounds)
//     );
//   }

//   const result = await pool.query(
//     'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
//     [name, email, hashedPassword, userId]
//   );
//   return result.rows[0];
// }

async function deleteUser(userId: string) {
  const result = await pool.query(
    'DELETE FROM users WHERE id = $1 RETURNING *',
    [userId]
  );
  return result.rows[0];
}

export const UserModel = {
  signupUser,
  getUniqueUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  // updateUser,
  deleteUser,
};
