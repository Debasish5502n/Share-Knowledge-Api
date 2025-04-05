import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();
router.post("/course", createCourse);
router.get("/course", getAllCourses);
router.get("/course-by-id", getCourseById);
router.put("/course", updateCourse);
router.delete("/course", deleteCourse);

export default router;
