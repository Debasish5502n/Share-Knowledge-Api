import pool from "../config/db.js";

// Create a new course
export const createCourseService = async (user_id, course_category, course_language, course_title, course_description, course_thumbnail) => {
  const queryText = `
    INSERT INTO course (user_id, course_category, course_language, course_title, course_description, course_thumbnail)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
  `;
  const values = [user_id, course_category, course_language, course_title, course_description, course_thumbnail];
  const { rows } = await pool.query(queryText, values);
  return rows[0];
};

// Get all courses
export const getAllCoursesService = async () => {
  const queryText = `SELECT * FROM course ORDER BY created_at DESC;`;
  const { rows } = await pool.query(queryText);
  return rows;
};

// Get a single course by ID
export const getCourseByIdService = async (id) => {
  const queryText = `SELECT * FROM course WHERE course_id = $1;`;
  const { rows } = await pool.query(queryText, [id]);
  return rows[0] || null;
};

export const getCoursesByCategoryService = async (course_category) => {
  const queryText = `SELECT * FROM course WHERE course_category = $1;`;
  const { rows } = await pool.query(queryText, [course_category]);
  return rows;
};

// Update a course by ID
export const updateCourseService = async (id, {
  course_category,
  course_language,
  course_title,
  course_description,
  course_thumbnail
}) => {
  let queryText;
  let values;

  // Update everything including thumbnail
  queryText = `
      UPDATE course 
      SET 
        course_category = $2,
        course_language = $3,
        course_title = $4,
        course_description = $5,
        course_thumbnail = $6,
        updated_at = (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT
      WHERE course_id = $1 
      RETURNING *;
    `;
  values = [id, course_category, course_language, course_title, course_description, course_thumbnail];

  const { rows } = await pool.query(queryText, values);
  return rows[0] || null;
};

// Delete a course by ID
export const deleteCourseService = async (id) => {
  const queryText = `DELETE FROM course WHERE course_id = $1 RETURNING *;`;
  const { rows } = await pool.query(queryText, [id]);
  return rows[0] || null;
};
