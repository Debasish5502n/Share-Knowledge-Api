import {
  createCourseService,
  deleteCourseService,
  getAllCoursesService,
  getCourseByIdService,
  updateCourseService,
  getCoursesByCategoryService
} from "../models/courseModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createCourse = async (req, res, next) => {
  const { user_id, course_category, course_language, course_title, course_description, course_image, course_thumbnail } = req.body;
  try {
    const newCourse = await createCourseService(user_id, course_category, course_language, course_title, course_description, course_image, course_thumbnail);
    handleResponse(res, 201, "Course created successfully", newCourse);
  } catch (err) {
    next(err);
  }
};

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await getAllCoursesService();
    handleResponse(res, 200, "Courses fetched successfully", courses);
  } catch (err) {
    next(err);
  }
};

export const getCoursesByCategory = async (req, res, next) => {
  const { category } = req.params;

  if (!category) {
    return res.status(400).json({
      status: 400,
      message: "Category is required",
    });
  }

  try {
    const courses = await getCoursesByCategoryService(category);
    res.status(200).json({
      status: 200,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (req, res, next) => {
  const { id } = req.query;
  
  if (!id) {
    return handleResponse(res, 400, "Course ID is required");
  }

  try {
    const course = await getCourseByIdService(id);
    if (!course) {
      return handleResponse(res, 404, "Course not found");
    }

    handleResponse(res, 200, "Course fetched successfully", course);
  } catch (err) {
    next(err);
  }
};

export const updateCourse = async (req, res, next) => {
  const { id } = req.query;
  const { course_category, course_language, course_title, course_description, course_image, course_thumbnail } = req.body; // ✅ Get updated values from request body

  if (!id) {
    return handleResponse(res, 400, "Course ID is required");
  }

  if (!course_title && !course_description && !course_image && !course_thumbnail) {
    return handleResponse(res, 400, "At least one field is required to update");
  }

  try {
    const updatedCourse = await updateCourseService(id, {
      course_title,
      course_language,
      course_category,
      course_description,
      course_image,
      course_thumbnail
    });

    if (!updatedCourse) {
      return handleResponse(res, 404, "Course not found");
    }

    handleResponse(res, 200, "Course updated successfully", updatedCourse);
  } catch (err) {
    next(err);
  }
};

export const deleteCourse = async (req, res, next) => {
  const { id } = req.query; // ✅ Get ID from query parameter

  if (!id) {
    return handleResponse(res, 400, "Course ID is required");
  }

  try {
    const deletedCourse = await deleteCourseService(id);
    if (!deletedCourse) {
      return handleResponse(res, 404, "Course not found");
    }

    handleResponse(res, 200, "Course deleted successfully");
  } catch (err) {
    next(err);
  }
};
