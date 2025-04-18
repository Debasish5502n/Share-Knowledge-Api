import {
    createSubjectService,
    getAllSubjectsService,
    getSubjectByIdService,
    getSubjectsByCourseIdService,
    updateSubjectService,
    deleteSubjectService,
  } from "../models/subjectModel.js";
  
  const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({ status, message, data });
  };
  
  export const createSubject = async (req, res, next) => {
    const { course_id, subject_title, subject_video } = req.body;
  
    if (!course_id || !subject_title) {
      return handleResponse(res, 400, "Course ID and Subject Title are required");
    }
  
    try {
      const newSubject = await createSubjectService(course_id, subject_title, subject_video);
      handleResponse(res, 201, "Subject created successfully", newSubject);
    } catch (err) {
      next(err);
    }
  };
  
  export const getAllSubjects = async (req, res, next) => {
    try {
      const subjects = await getAllSubjectsService();
      handleResponse(res, 200, "Subjects fetched successfully", subjects);
    } catch (err) {
      next(err);
    }
  };
  
  export const getSubjectById = async (req, res, next) => {
    const { id } = req.query; 
    
    if (!id) {
      return handleResponse(res, 400, "Subject ID is required");
    }
  
    try {
      const subject = await getSubjectByIdService(id);
      if (!subject) {
        return handleResponse(res, 404, "Subject not found");
      }
  
      handleResponse(res, 200, "Subject fetched successfully", subject);
    } catch (err) {
      next(err);
    }
  };
  
  export const getSubjectsByCourseId = async (req, res, next) => {
    const { id } = req.query;
  
    if (!id) {
      return handleResponse(res, 400, "Course ID is required");
    }
  
    try {
      const subjects = await getSubjectsByCourseIdService(id);
      handleResponse(res, 200, "Subjects fetched successfully", subjects);
    } catch (err) {
      next(err);
    }
  };
  
  export const updateSubject = async (req, res, next) => {
    const { id } = req.query;
    const { subject_title, subject_video } = req.body;
  
    if (!id) {
      return handleResponse(res, 400, "Subject ID is required");
    }
    
    if (!subject_title) {
      return handleResponse(res, 400, "Subject Title is required");
    }
  
    try {
      const updatedSubject = await updateSubjectService(id, subject_title, subject_video);
      if (!updatedSubject) {
        return handleResponse(res, 404, "Subject not found");
      }
  
      handleResponse(res, 200, "Subject updated successfully", updatedSubject);
    } catch (err) {
      next(err);
    }
  };
  

  export const deleteSubject = async (req, res, next) => {
    const { id } = req.query;
  
    if (!id) {
      return handleResponse(res, 400, "Subject ID is required");
    }
  
    try {
      const deletedSubject = await deleteSubjectService(id);
      if (!deletedSubject) {
        return handleResponse(res, 404, "Subject not found");
      }
  
      handleResponse(res, 200, "Subject deleted successfully");
    } catch (err) {
      next(err);
    }
  };  