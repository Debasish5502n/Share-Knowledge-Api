import {
    createLessonService,
    getAllLessonsService,
    getLessonByIdService,
    getLessonsBySubjectIdService,
    getLessonsBySubjectTopicIdService,
    updateLessonService,
    deleteLessonService,
  } from "../models/lessonModel.js";
  
  // ✅ Common response handler
  const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({ status, message, data });
  };
  
  // ✅ Create a new lesson
  export const createLesson = async (req, res, next) => {
    const { subject_id, subjects_topic_id, lessons_data, lessons_type } = req.body;
  
    if (!subject_id || !subjects_topic_id || !lessons_data || !lessons_type) {
      return handleResponse(res, 400, "All fields are required");
    }
  
    try {
      const newLesson = await createLessonService(subject_id, subjects_topic_id, lessons_data, lessons_type);
      handleResponse(res, 201, "Lesson created successfully", newLesson);
    } catch (err) {
      next(err);
    }
  };
  
  // ✅ Get all lessons
  export const getAllLessons = async (req, res, next) => {
    try {
      const lessons = await getAllLessonsService();
      handleResponse(res, 200, "All lessons fetched", lessons);
    } catch (err) {
      next(err);
    }
  };
  
  // ✅ Get lesson by ID
  export const getLessonById = async (req, res, next) => {
    const { id } = req.query;
  
    if (!id) return handleResponse(res, 400, "Lesson ID is required");
  
    try {
      const lesson = await getLessonByIdService(id);
      if (!lesson) return handleResponse(res, 404, "Lesson not found");
      handleResponse(res, 200, "Lesson fetched", lesson);
    } catch (err) {
      next(err);
    }
  };
  
  // ✅ Get lessons by subject_id
  export const getLessonsBySubjectId = async (req, res, next) => {
    const { subject_id } = req.query;
  
    if (!subject_id) return handleResponse(res, 400, "Subject ID is required");
  
    try {
      const lessons = await getLessonsBySubjectIdService(subject_id);
      handleResponse(res, 200, "Lessons fetched for subject", lessons);
    } catch (err) {
      next(err);
    }
  };

  export const getLessonsBySubjectTopicId = async (req, res, next) => {
    const { subjects_topic_id } = req.query;
  
    if (!subjects_topic_id) {
      return res.status(400).json({
        status: 400,
        message: "Subject Topic ID is required",
      });
    }
  
    try {
      const lessons = await getLessonsBySubjectTopicIdService(subjects_topic_id);
      res.status(200).json({
        status: 200,
        message: "Lessons fetched successfully",
        data: lessons,
      });
    } catch (err) {
      next(err);
    }
  };
  
  
  // ✅ Update lesson
  export const updateLesson = async (req, res, next) => {
    const { id } = req.query;
    const { lessons_data, lessons_type } = req.body;
  
    if (!id || !lessons_data || !lessons_type) {
      return handleResponse(res, 400, "Lesson ID, data, and type are required");
    }
  
    try {
      const updated = await updateLessonService(id, lessons_data, lessons_type);
      if (!updated) return handleResponse(res, 404, "Lesson not found");
      handleResponse(res, 200, "Lesson updated", updated);
    } catch (err) {
      next(err);
    }
  };
  
  // ✅ Delete lesson
  export const deleteLesson = async (req, res, next) => {
    const { id } = req.query;
  
    if (!id) return handleResponse(res, 400, "Lesson ID is required");
  
    try {
      const deleted = await deleteLessonService(id);
      if (!deleted) return handleResponse(res, 404, "Lesson not found");
      handleResponse(res, 200, "Lesson deleted successfully");
    } catch (err) {
      next(err);
    }
  };  