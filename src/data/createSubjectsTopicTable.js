import pool from "../config/db.js";

const createSubjectsTopicTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS subjects_topic (
      subjects_topic_id SERIAL PRIMARY KEY,
      subject_id INT NOT NULL,
      title VARCHAR(100) NOT NULL,
      created_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
      FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE
    );
  `;

  try {
    await pool.query(queryText);
    console.log("subjects_topic table created (if not exists)");
  } catch (error) {
    console.error("Error creating subjects_topic table:", error);
  }
};

export default createSubjectsTopicTable;
