const Joi = require("joi");
const { HttpCode } = require("../../../helpers/constants");

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

const schemaResendUserValidationEmail = Joi.object({
  email: Joi.string().email({ multiple: false }).required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (error) {
    next({
      status: HttpCode.BAD_REQUEST,
      message: `Filed: ${error.message.replace(/"/g, "")}`,
    });
  }
};

const validateCreateUser = (req, _res, next) =>
  validate(schemaCreateUser, req.body, next);

const validateUpdateUser = (req, _res, next) =>
  validate(schemaUpdateUser, req.body, next);

const validateResendUserValidationEmail = async (req, _res, next) =>
  validate(schemaResendUserValidationEmail, req.body, next);

module.exports = {
  validateCreateUser,
  validateUpdateUser,
  validateResendUserValidationEmail,
};
