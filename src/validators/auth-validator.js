const Joi = require("joi");
const validate = require("./validate");

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "string.empty": "First name is required"
  }),
  lastName: Joi.string().trim().required().messages({
    "string.empty": "Last name is required"
  }),
  email: Joi.string()
    .email({ tlds: false })
    .required()
    .messages({ "string.empty": "Email is required" }),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0][0-9]{9}$/)
    .required()
    .messages({
      "string.empty": "Telephone number is required",
      "string.pattern.base":
        "Telephone number must start with 0 and contain with 10 characters long"
    }),
  birthDate: Joi.date().max("now").required().messages({
    "date.base": "Invalid birth date format",
    "date.max": "Birth date must be before today",
    "any.required": "Birth date is required"
  }),
  password: Joi.string()
    // .alphanum()
    // .min(6)
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/) //(?=.*\d) this mean must contain at least 1 digit in each condition
    .required()
    .messages({
      "string.empty": "password is required",
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character, and must contain at least 8 characters."
      // "string.min": "password must have at least 8 characters"
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

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: false })
    .required()
    .messages({ "string.empty": "email is required" }),
  password: Joi.string().required().messages({ "string.empty": "Password is required" })
});

exports.validateLogin = validate(loginSchema);

const loginWithGoogleSchema = Joi.object({
  googleId: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: false })
    .required()
    .messages({ "string.empty": "email is required" })
});

exports.validateLoginWithGoogle = validate(loginWithGoogleSchema);
