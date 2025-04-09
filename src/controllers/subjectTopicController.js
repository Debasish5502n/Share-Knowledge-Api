import {
    createSubjectTopicService,
    getAllSubjectTopicsService,
    getSubjectTopicByIdService,
    getTopicsBySubjectIdService,
    updateSubjectTopicService,
    deleteSubjectTopicService,
  } from "../models/subjectTopicModel.js";
  
  const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({ status, message, data });
  };
  
  // 🔹 Create
  export const createSubjectTopic = async (req, res, next) => {
    const { subject_id, title } = req.body;
  
    if (!subject_id || !title) {
      return handleResponse(res, 400, "Subject ID and Title are required");
    }
  
    try {
      const newTopic = await createSubjectTopicService(subject_id, title);
      handleResponse(res, 201, "Topic created successfully", newTopic);
    } catch (err) {
      next(err);
    }
  };
  
  // 🔹 Get all
  export const getAllSubjectTopics = async (req, res, next) => {
    try {
      const topics = await getAllSubjectTopicsService();
      handleResponse(res, 200, "All topics fetched", topics);
    } catch (err) {
      next(err);
    }
  };
  
  // 🔹 Get by topic ID
  export const getSubjectTopicById = async (req, res, next) => {
    const { id } = req.query;
  
    if (!id) return handleResponse(res, 400, "Topic ID is required");
  
    try {
      const topic = await getSubjectTopicByIdService(id);
      if (!topic) return handleResponse(res, 404, "Topic not found");
  
      handleResponse(res, 200, "Topic fetched", topic);
    } catch (err) {
      next(err);
    }
  };
  
  // 🔹 Get by subject ID
  export const getTopicsBySubjectId = async (req, res, next) => {
    const { id } = req.query;
  
    if (!id) return handleResponse(res, 400, "Subject ID is required");
  
    try {
      const topics = await getTopicsBySubjectIdService(id);
      handleResponse(res, 200, "Topics fetched", topics);
    } catch (err) {
      next(err);
    }
  };
  
  // 🔹 Update
  export const updateSubjectTopic = async (req, res, next) => {
    const { id } = req.query;
    const { title } = req.body;
  
    if (!id) return handleResponse(res, 400, "Topic ID is required");
    if (!title) return handleResponse(res, 400, "Title is required");
  
    try {
      const updatedTopic = await updateSubjectTopicService(id, title);
      if (!updatedTopic) return handleResponse(res, 404, "Topic not found");
  
      handleResponse(res, 200, "Topic updated", updatedTopic);
    } catch (err) {
      next(err);
    }
  };
  
  // 🔹 Delete
  export const deleteSubjectTopic = async (req, res, next) => {
    const { id } = req.query;
  
    if (!id) return handleResponse(res, 400, "Topic ID is required");
  
    try {
      const deleted = await deleteSubjectTopicService(id);
      if (!deleted) return handleResponse(res, 404, "Topic not found");
  
      handleResponse(res, 200, "Topic deleted");
    } catch (err) {
      next(err);
    }
  };  