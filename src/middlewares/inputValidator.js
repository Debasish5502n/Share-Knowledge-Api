import Joi from "joi";

// User Schema Validation
export const userSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  number: Joi.number().integer().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
  is_verified: Joi.boolean().default(false)
});

// Middleware for validation
const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);  // ✅ Fixed schema name
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message
    });
  }
  next();
};

export default validateUser;