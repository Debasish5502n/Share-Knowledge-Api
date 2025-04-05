import pool from "../config/db.js";

const createCourseTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS course (
      course_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      course_title VARCHAR(100) UNIQUE NOT NULL,
      course_description VARCHAR(255) NOT NULL,
      course_image VARCHAR(255) NOT NULL,
      course_thumbnail VARCHAR(255) NOT NULL,
      updated_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
      created_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `;

  try {
    await pool.query(queryText);
    console.log("Course table created if not exists");
  } catch (error) {
    console.error("Error creating course table: ", error);
  }
};

export default createCourseTable;