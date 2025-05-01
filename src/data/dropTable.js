import pool from "../config/db.js";

const dropTable = async () => {
  const queryText = `
    DROP TABLE IF EXISTS subjects CASCADE;
  `;

  try {
    await pool.query(queryText);
    console.log("Table dropped (if exists)");
  } catch (error) {
    console.error("Error dropping table:", error);
  }
};

export default dropTable;
