import pool from "../config/db.js";

// 🔹 Create a new subject
export const createSubjectService = async (course_id, subject_title, subject_video) => {
  const query = `
    INSERT INTO subjects (course_id, subject_title, subject_video) 
    VALUES ($1, $2, $3) RETURNING *;
  `;
  const { rows } = await pool.query(query, [course_id, subject_title, subject_video]);
  return rows[0];
};

// 🔹 Get all subjects
export const getAllSubjectsService = async () => {
  const subjectsQuery = "SELECT * FROM subjects ORDER BY created_at ASC;";
  const subjectsResult = await pool.query(subjectsQuery);
  const subjects = subjectsResult.rows;

  const fullData = [];

  for (const subject of subjects) {
    const topicQuery = `
      SELECT subjects_topic_id, title 
      FROM subjects_topic 
      WHERE subject_id = $1
      ORDER BY created_at ASC;;
    `;
    const topicResult = await pool.query(topicQuery, [subject.subject_id]);

    fullData.push({
      ...subject,
      topics: topicResult.rows
    });
  }

  return fullData;
};

// 🔹 Get subject by ID
export const getSubjectByIdService = async (id) => {
  const query = "SELECT * FROM subjects WHERE subject_id = $1;";
  const { rows } = await pool.query(query, [id]);

  if (rows.length === 0) return null;

  const subject = rows[0];

  const topicsQuery = `
    SELECT subjects_topic_id, title 
    FROM subjects_topic 
    WHERE subject_id = $1
    ORDER BY created_at ASC;;
  `;
  const topicsResult = await pool.query(topicsQuery, [id]);

  return {
    ...subject,
    topics: topicsResult.rows
  };
};

// 🔹 Get all subjects under a course
export const getSubjectsByCourseIdService = async (course_id) => {
  // Sort subjects by created_at in DESCENDING order
  const query = `
    SELECT * 
    FROM subjects 
    WHERE course_id = $1 
    ORDER BY created_at ASC;
  `;
  const { rows } = await pool.query(query, [course_id]);

  const result = [];

  for (const subject of rows) {
    const topicsQuery = `
      SELECT subjects_topic_id, title 
      FROM subjects_topic 
      WHERE subject_id = $1
      ORDER BY created_at ASC;
    `;
    const topicsResult = await pool.query(topicsQuery, [subject.subject_id]);

    result.push({
      ...subject,
      topics: topicsResult.rows
    });
  }

  return result;
};

export const updateSubjectService = async (id, subject_title, subject_video) => {
  const query = `
    UPDATE subjects 
    SET subject_title = $2, subject_video = $3, updated_at = (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT
    WHERE subject_id = $1 RETURNING *;
  `;
  const { rows } = await pool.query(query, [id, subject_title, subject_video]);
  return rows[0];
};

export const deleteSubjectService = async (id) => {
  const query = "DELETE FROM subjects WHERE subject_id = $1 RETURNING *;";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};