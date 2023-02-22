const Joi = require("joi");
const validate = require("./validate");

const registerSchema = Joi.object({
  phone: Joi.string()
    .length(10)
    .pattern(/^[0][0-9]{9}$/)
    .required()
    .messages({
      "string.empty": "telephone number is required",
      "string.pattern.base": "telephone number must start with 0 and contain with 10 characters"
    }),
  firstName: Joi.string().trim().required().messages({
    "string.empty": "first name is required"
  }),
  lastName: Joi.string().trim().required().messages({
    "string.empty": "last name is required"
  }),
  birthDate: Joi.date().max("now").required().messages({
    "date.base": "Invalid birth date format",
    "date.max": "Birth date must be before today",
    "any.required": "Birth date is required"
  }),
  email: Joi.string()
    .email({ tlds: false })
    .required()
    .messages({ "string.empty": "email is required" }),
  password: Joi.string()
    // .alphanum()
    // .min(6)
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/) //(?=.*\d) this mean must contain at least 1 digit in each condition
    .error(
      new Error(
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character, and must contain at least 8 characters."
      )
    )
    .required()
    .messages({
      "string.empty": "password is required"
      // "string.min": "password must have at least 6 characters"
      // "string.alphanum": "password must contain number or alphabet"
    }), // if want to use easy register for testing, we will open the comment and close regex, error, and min(8)
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Confirm password is not match with password",
      "string.empty": "Confirm password is required"
    })
    .strip()
});

exports.validateRegister = validate(registerSchema);
