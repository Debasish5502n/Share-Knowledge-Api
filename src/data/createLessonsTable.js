import pool from "../config/db.js";

const createLessonsTable = async () => {
  const queryText = `
  CREATE TABLE IF NOT EXISTS lessons (
    lessons_id SERIAL PRIMARY KEY,
    subject_id INT NOT NULL,
    subjects_topic_id INT NOT NULL,
    lessons_data VARCHAR(100) UNIQUE NOT NULL,
    lessons_type VARCHAR(100) NOT NULL,
    created_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE,
    FOREIGN KEY (subjects_topic_id) REFERENCES subjects_topic(subjects_topic_id) ON DELETE CASCADE
  );
`;

  try {
    await pool.query(queryText);
    console.log("Course table created if not exists");
  } catch (error) {
    console.error("Error creating course table: ", error);
  }
};

export default createLessonsTable;