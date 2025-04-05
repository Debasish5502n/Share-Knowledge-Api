import express from "express";
import {
  createSubjectTopic,
  getAllSubjectTopics,
  getSubjectTopicById,
  getTopicsBySubjectId,
  updateSubjectTopic,
  deleteSubjectTopic,
} from "../controllers/subjectTopicController.js";

const router = express.Router();

router.post("/subject-topic", createSubjectTopic);
router.get("/subject-topic", getAllSubjectTopics);
router.get("/subject-topic-by-id", getSubjectTopicById); // expects ?id=1
router.get("/subject-topic-by-subject-id", getTopicsBySubjectId); // expects ?subject_id=1
router.put("/subject-topic", updateSubjectTopic); // expects ?id=1
router.delete("/subject-topic", deleteSubjectTopic); // expects ?id=1

export default router;