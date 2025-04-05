import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "../models/userModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};

// Create a new user
export const createUser = async (req, res, next) => {
  const { name, email, number, password, role } = req.body;
  try {
    const newUser = await createUserService(name, email, number, password, role);
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (err) {
    next(err);
  }
};

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    handleResponse(res, 200, "Users fetched successfully", users);
  } catch (err) {
    next(err);
  }
};

// Get a user by ID
export const getUserById = async (req, res, next) => {
  const { id } = req.query;
  if (!id) return handleResponse(res, 400, "User ID is required");

  try {
    const user = await getUserByIdService(id);
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User fetched successfully", user);
  } catch (err) {
    next(err);
  }
};

// Update a user by ID
export const updateUser = async (req, res, next) => {
  const { id } = req.query;
  const { name, email, number, password } = req.body;

  if (!id) return handleResponse(res, 400, "User ID is required");

  try {
    const updatedUser = await updateUserService(id, name, email, number, password);
    if (!updatedUser) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User updated successfully", updatedUser);
  } catch (err) {
    next(err);
  }
};

// Delete a user by ID
export const deleteUser = async (req, res, next) => {
  const { id } = req.query;
  if (!id) return handleResponse(res, 400, "User ID is required");

  try {
    const deletedUser = await deleteUserService(id);
    if (!deletedUser) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User deleted successfully", deletedUser);
  } catch (err) {
    next(err);
  }
};