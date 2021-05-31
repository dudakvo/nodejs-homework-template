const Joi = require("joi");

const schemaCreateUser = Joi.object({
  password: Joi.string().alphanum().min(6).max(30).required(),
  email: Joi.string().email({ multiple: false }).required(),
  subscription: Joi.string()
    .min(3)
    .max(8)
    .valid("starter", "pro", "business")
    .optional(),
});

const schemaUpdateUser = Joi.object({
  subscription: Joi.string()
    .min(3)
    .max(8)
    .valid("starter", "pro", "business")
    .required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (error) {
    console.log(error.message);
    next({ status: 400, message: `Filed: ${error.message.replace(/"/g, "")}` });
  }
};

const validateCreateUser = (req, _res, next) =>
  validate(schemaCreateUser, req.body, next);

const validateUpdateUser = (req, _res, next) =>
  validate(schemaUpdateUser, req.body, next);

module.exports = { validateCreateUser, validateUpdateUser };
