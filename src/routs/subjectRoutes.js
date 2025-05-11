import express from "express";
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  getSubjectsByCourseId,
  updateSubject,
  deleteSubject,
} from "../controllers/subjectController.js";

const router = express.Router();

router.post("/subject", createSubject);
router.get("/subjects", getAllSubjects);
router.get("/subject-by-id", getSubjectById);
router.get("/subjects-by-course-id", getSubjectsByCourseId);
router.put("/subject", updateSubject);
router.delete("/subject", deleteSubject);

export default router;
