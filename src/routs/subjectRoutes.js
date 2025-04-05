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
router.get("/subject", getAllSubjects);
router.get("/subject-by-id", getSubjectById);
router.get("/subject-by-course-id", getSubjectsByCourseId);
router.put("/subject", updateSubject);
router.delete("/subject", deleteSubject);

export default router;
