import pool from "../config/db.js";

export const createSubjectTopicService = async (subject_id, title) => {
  const query = `
    INSERT INTO subjects_topic (subject_id, title)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [subject_id, title]);
  return rows[0];
};

export const getAllSubjectTopicsService = async () => {
  const query = "SELECT * FROM subjects_topic;";
  const { rows } = await pool.query(query);
  return rows;
};

export const getSubjectTopicByIdService = async (id) => {
  const query = "SELECT * FROM subjects_topic WHERE subjects_topic_id = $1;";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const getTopicsBySubjectIdService = async (subject_id) => {
  const query = "SELECT * FROM subjects_topic WHERE subject_id = $1;";
  const { rows } = await pool.query(query, [subject_id]);
  return rows;
};

export const updateSubjectTopicService = async (id, title) => {
  const query = `
    UPDATE subjects_topic
    SET title = $2
    WHERE subjects_topic_id = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [title, id]);
  return rows[0];
};

export const deleteSubjectTopicService = async (id) => {
  const query = "DELETE FROM subjects_topic WHERE subjects_topic_id = $1 RETURNING *;";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};