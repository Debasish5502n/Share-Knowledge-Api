import pool from "../config/db.js";

// 🔹 Create a new lesson
export const createLessonService = async (subject_id, subjects_topic_id, lessons_data, lessons_type) => {
  const query = `
    INSERT INTO lessons (subject_id, subjects_topic_id, lessons_data, lessons_type)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [subject_id, subjects_topic_id, lessons_data, lessons_type];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// 🔹 Get all lessons
export const getAllLessonsService = async () => {
  const query = `SELECT * FROM lessons ORDER BY created_at ASC;`;
  const { rows } = await pool.query(query);
  return rows;
};

// 🔹 Get lesson by ID
export const getLessonByIdService = async (id) => {
  const query = `SELECT * FROM lessons WHERE lessons_id = $1;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// 🔹 Get lessons by subject_id
export const getLessonsBySubjectIdService = async (subject_id) => {
  const query = `SELECT * FROM lessons WHERE subject_id = $1 ORDER BY created_at ASC;`;
  const { rows } = await pool.query(query, [subject_id]);
  return rows;
};

export const getLessonsBySubjectTopicIdService = async (subjects_topic_id) => {
  const query = `SELECT * FROM lessons WHERE subjects_topic_id = $1 ORDER BY created_at ASC;`;
  const { rows } = await pool.query(query, [subjects_topic_id]);
  return rows;
};

// 🔹 Update lesson
export const updateLessonService = async (id, lessons_data, lessons_type) => {
  const query = `
    UPDATE lessons
    SET lessons_data = $2,
        lessons_type = $3
    WHERE lessons_id = $1
    RETURNING *;
  `;
  const values = [id, lessons_data, lessons_type];
  const { rows } = await pool.query(query, values);
  return rows[0] || null;
};

// 🔹 Delete lesson
export const deleteLessonService = async (id) => {
  const query = `DELETE FROM lessons WHERE lessons_id = $1 RETURNING *;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};