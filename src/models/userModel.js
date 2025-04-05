import pool from "../config/db.js";

// Create a new user
export const createUserService = async (name, email, number, password, role) => {
  const queryText = `
    INSERT INTO users (name, email, number, password, role)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;
  `;
  const values = [name, email, number, password, role];
  const { rows } = await pool.query(queryText, values);
  return rows[0];
};

// Get all users
export const getAllUsersService = async () => {
  const queryText = `SELECT * FROM users ORDER BY created_at DESC;`;
  const { rows } = await pool.query(queryText);
  return rows;
};

// Get a single user by ID
export const getUserByIdService = async (id) => {
  const queryText = `SELECT * FROM users WHERE id = $1;`;
  const { rows } = await pool.query(queryText, [id]);
  return rows[0] || null;
};

// Update a user by ID
export const updateUserService = async (id, name, email, number, password) => {
  const queryText = `
    UPDATE users 
    SET name = $1, email = $2, number = $3, password = $4, updated_at = (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT
    WHERE id = $5 RETURNING *;
  `;
  const values = [name, email, number, password, id];
  const { rows } = await pool.query(queryText, values);
  return rows[0] || null;
};

// Delete a user by ID
export const deleteUserService = async (id) => {
  const queryText = `DELETE FROM users WHERE id = $1 RETURNING *;`;
  const { rows } = await pool.query(queryText, [id]);
  return rows[0] || null;
};
