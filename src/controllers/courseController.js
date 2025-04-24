import {
  createCourseService,
  deleteCourseService,
  getAllCoursesService,
  getCourseByIdService,
  updateCourseService,
  getCoursesByCategoryService
} from "../models/courseModel.js";

import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { bucket } from "../config/firebase.js"; // Adjust based on your path

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createCourse = async (req, res, next) => {
  const {
    user_id,
    course_category,
    course_language,
    course_title,
    course_description,
  } = req.body;

  const file = req.files?.course_thumbnail;

  if (
    !user_id ||
    !course_category ||
    !course_language ||
    !course_title ||
    !course_description
  ) {
    return handleResponse(res, 400, "All course fields are required");
  }

  if (!file) {
    return handleResponse(res, 400, "Course thumbnail is required");
  }

  // ✅ Validate file type
  const validMimeTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!validMimeTypes.includes(file.mimetype)) {
    return handleResponse(res, 400, "Only JPEG, PNG, and WEBP images are allowed");
  }

  // ✅ Validate file size (e.g., max 2MB = 2 * 1024 * 1024)
  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    return handleResponse(res, 400, "Thumbnail image size must be less than 2MB");
  }

  try {
    const filename = `course_thumbnails/${uuidv4()}-${file.name}`;
    const fileUpload = bucket.file(filename);

    const compressedBuffer = await sharp(file.data)
      .jpeg({ quality: 40 }) // compress to ~40% quality
      .toBuffer();

    await new Promise((resolve, reject) => {
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      stream.on("error", reject);
      stream.on("finish", resolve);
      stream.end(compressedBuffer);
    });

    await fileUpload.makePublic();

    const course_thumbnail_url = `https://storage.googleapis.com/${bucket.name}/${filename}`;

    const newCourse = await createCourseService(
      user_id,
      course_category,
      course_language,
      course_title,
      course_description,
      course_thumbnail_url
    );

    return handleResponse(res, 201, "Course created successfully", newCourse);
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
  const {
    course_category,
    course_language,
    course_title,
    course_description,
  } = req.body;

  const file = req.files?.course_thumbnail;

  if (!id) {
    return handleResponse(res, 400, "Course ID is required");
  }

  if (!course_title && !course_description && !course_category && !course_language && !file) {
    return handleResponse(res, 400, "At least one field is required to update");
  }

  try {
    let course_thumbnail = null;

    // ✅ If new thumbnail is provided, validate and upload
    if (file) {
      const validMimeTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validMimeTypes.includes(file.mimetype)) {
        return handleResponse(res, 400, "Only JPEG, PNG, and WEBP images are allowed");
      }

      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        return handleResponse(res, 400, "Thumbnail image size must be less than 2MB");
      }

      const filename = `course_thumbnails/${uuidv4()}-${file.name}`;
      const fileUpload = bucket.file(filename);

      const compressedBuffer = await sharp(file.data)
        .jpeg({ quality: 40 })
        .toBuffer();

      await new Promise((resolve, reject) => {
        const stream = fileUpload.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });
        stream.on("error", reject);
        stream.on("finish", resolve);
        stream.end(compressedBuffer);
      });

      await fileUpload.makePublic();
      course_thumbnail = `https://storage.googleapis.com/${bucket.name}/${filename}`;
    }else if (
      typeof req.body.course_thumbnail === "string" &&  // Check if it's a string
      req.body.course_thumbnail.trim() !== ""          // Ensure it's not empty or blank
    ) {
      course_thumbnail = req.body.course_thumbnail.trim();
    }

    const updatedCourse = await updateCourseService(id, {
      ...(course_title && { course_title }),
      ...(course_description && { course_description }),
      ...(course_category && { course_category }),
      ...(course_language && { course_language }),
      ...(course_thumbnail && { course_thumbnail }),
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
