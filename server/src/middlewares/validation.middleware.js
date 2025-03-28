const Joi = require('joi');

// User validation schema
const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4,})(?=.*[!@#$%^&*_-]).{8,}$/
    )
    .message(
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 4 numbers, 1 special character from !@#$%^&*_-, and be at least 8 characters long'
    )
    .required(),
  role: Joi.string().valid('user', 'admin'),
  profilePicture: Joi.string().allow('', null),
});

// Item validation schema
const itemSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().min(0).required(),
  imageUrl: Joi.string().required(),
  category: Joi.string()
    .valid('electronics', 'clothing', 'books', 'home', 'sports', 'other')
    .required(),
  inStock: Joi.boolean(),
  rating: Joi.number().min(0).max(5),
  numReviews: Joi.number().min(0),
  tags: Joi.array().items(Joi.string()),
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Create validation middleware
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    next();
  };
};

// Export validators
module.exports = {
  validateUser: validateRequest(userSchema),
  validateItem: validateRequest(itemSchema),
  validateLogin: validateRequest(loginSchema),
}; 