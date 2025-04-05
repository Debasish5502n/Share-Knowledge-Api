import pool from "../config/db.js";

const createUsersTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      number BIGINT UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      role VARCHAR(100) NOT NULL,
      is_verified BOOLEAN DEFAULT TRUE,
      updated_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
      created_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Users table created (if not exists)");
  } catch (error) {
    console.error("Error creating users table:", error);
  }
};

export default createUsersTable;