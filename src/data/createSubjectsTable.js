import pool from "../config/db.js";

const createSubjectsTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS subjects (
      subject_id SERIAL PRIMARY KEY,
      course_id INT NOT NULL,
      subject_title VARCHAR(100) NOT NULL,
      updated_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
      created_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
      FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Subjects table created (if not exists)");
  } catch (error) {
    console.error("Error creating subjects table:", error);
  }
};

export default createSubjectsTable;
