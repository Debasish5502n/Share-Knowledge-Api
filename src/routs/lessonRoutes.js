import express from "express";
import {
  createLesson,
  getAllLessons,
  getLessonById,
  getLessonsBySubjectId,
  getLessonsBySubjectTopicId,
  updateLesson,
  deleteLesson,
} from "../controllers/lessonController.js";

const router = express.Router();

router.post("/lesson", createLesson);
router.get("/lesson", getAllLessons);
router.get("/lesson-by-subject-id", getLessonById);
router.get("/lessons-by-subject-id", getLessonsBySubjectId);
router.get("/lessons-by-subject-topic-id", getLessonsBySubjectTopicId);
router.put("/lesson", updateLesson);
router.delete("/lesson", deleteLesson);

export default router;