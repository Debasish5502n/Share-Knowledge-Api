import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  getCoursesByCategory,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();
router.post("/course", createCourse);
router.get("/courses", getAllCourses);
router.get("/course-by-id", getCourseById);
router.get("/courses-by-category", getCoursesByCategory);
router.put("/course", updateCourse);
router.delete("/course", deleteCourse);

export default router;
