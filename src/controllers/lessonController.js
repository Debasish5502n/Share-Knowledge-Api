import {
  createLessonService,
  getAllLessonsService,
  getLessonByIdService,
  getLessonsBySubjectIdService,
  getLessonsBySubjectTopicIdService,
  updateLessonService,
  deleteLessonService,
} from "../models/lessonModel.js";
import { bucket } from "../config/firebase.js";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";


// ✅ Common response handler
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};

// ✅ Create a new lesson
export const createLesson = async (req, res, next) => {
  try {
    let { subject_id, subjects_topic_id, lessons_type } = req.body;
    let lessons_data = req.body.lessons_data;

    if (!subject_id || !subjects_topic_id || !lessons_type) {
      return handleResponse(res, 400, "subject_id, subjects_topic_id and lessons_type are required");
    }

    // 🖼️ Handle image lesson
    if (lessons_type === "image") {
      const file = req.files?.lessons_data;
    
      if (!file) {
        return handleResponse(res, 400, "lesson_data file is required for image type");
      }
    
      const filename = `lesson_images/${uuidv4()}-${file.name}`;
      const fileUpload = bucket.file(filename);
    
      // Compress the image to approx 40% quality
      const compressedBuffer = await sharp(file.data)
        .jpeg({ quality: 40 }) // You can adjust this quality value
        .toBuffer();
    
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: "image/jpeg",
        },
      });
    
      stream.end(compressedBuffer);
    
      stream.on("error", (err) => next(err));
    
      stream.on("finish", async () => {
        await fileUpload.makePublic();
    
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
        lessons_data = publicUrl;
    
        const newLesson = await createLessonService(subject_id, subjects_topic_id, lessons_data, lessons_type);
        return handleResponse(res, 201, "Lesson created successfully", newLesson);
      });
    }else{
      if (!lessons_data) {
        return handleResponse(res, 400, "lessons_data is required for text type");
      }

      const newLesson = await createLessonService(subject_id, subjects_topic_id, lessons_data, lessons_type);
      return handleResponse(res, 201, "Lesson created successfully", newLesson);
    }

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
  const { id } = req.query;

  if (!id) return handleResponse(res, 400, "Subject ID is required");

  try {
    const lessons = await getLessonsBySubjectIdService(id);
    handleResponse(res, 200, "Lessons fetched for subject", lessons);
  } catch (err) {
    next(err);
  }
};

export const getLessonsBySubjectTopicId = async (req, res, next) => {
  const {id } = req.query;

  if (!id) {
    return res.status(400).json({
      status: 400,
      message: "Subject Topic ID is required",
    });
  }

  try {
    const lessons = await getLessonsBySubjectTopicIdService(id);
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
  let { lessons_data, lessons_type } = req.body;

  if (!id || !lessons_type) {
    return handleResponse(res, 400, "Lesson ID and type are required");
  }

  try {
    // Handle image type
    if (lessons_type === "image") {
      const file = req.files?.lessons_data;

      if (!file) {
        return handleResponse(res, 400, "lesson_data file is required for image type");
      }

      const filename = `lesson_images/${uuidv4()}-${file.name}`;
      const fileUpload = bucket.file(filename);

      // Compress image to 40%
      const compressedBuffer = await sharp(file.data)
        .jpeg({ quality: 40 })
        .toBuffer();

      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: "image/jpeg",
        },
      });

      stream.end(compressedBuffer);

      stream.on("error", (err) => next(err));

      stream.on("finish", async () => {
        await fileUpload.makePublic();

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
        lessons_data = publicUrl;

        const updated = await updateLessonService(id, lessons_data, lessons_type);
        if (!updated) return handleResponse(res, 404, "Lesson not found");
        return handleResponse(res, 200, "Lesson updated", updated);
      });
    }else{
      if (!lessons_data) {
        return handleResponse(res, 400, "lessons_data is required for text type");
      }

      const updated = await updateLessonService(id, lessons_data, lessons_type);
      if (!updated) return handleResponse(res, 404, "Lesson not found");
      return handleResponse(res, 200, "Lesson updated", updated);
    }
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