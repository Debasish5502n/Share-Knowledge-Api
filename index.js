import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./src/config/db.js";
import fileUpload from "express-fileupload";

import userRoutes from "./src/routs/userRoutes.js";
import courseRoutes from "./src/routs/courseRoutes.js";
import subjectRoutes from "./src/routs/subjectRoutes.js";
import subjectTopicRoutes from "./src/routs/subjectTopicRoutes.js";
import lessonRoutes from "./src/routs/lessonRoutes.js";
import errorHandling from "./src/middlewares/errorHandling.js";
import createUserTable from "./src/data/createUserTable.js";
import createCourseTable from "./src/data/createCourseTable.js";
import createSubjectTable from "./src/data/createSubjectsTable.js";
import createSubjectTopicTable from "./src/data/createSubjectsTopicTable.js";
import createLessonsTable from "./src/data/createLessonsTable.js";
import dropTable from "./src/data/dropTable.js";

dotenv.config();

console.log("Loaded PORT from .env:", process.env.PORT); // Debugging

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

// Routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", subjectRoutes);
app.use("/api", subjectTopicRoutes);
app.use("/api", lessonRoutes);

// Error handling middleware
app.use(errorHandling);

//Create table before starting server
// createUserTable();
// createCourseTable();
// createSubjectTable();
// createSubjectTopicTable();
// createLessonsTable();

//dropTable();

// Testing POSTGRES Connection
app.get("/", async (req, res) => {
  console.log("Start");
  const result = await pool.query("SELECT current_database()");
  console.log("result", result.rows);
  res.send(`The database name is : ${result.rows[0].current_database}`);
});

// Server running
app.listen(port, () => {
  console.log(`Server is running on http:localhost:${port}`);
});