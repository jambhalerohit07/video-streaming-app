import logger from "../configuration/logger.js";
import ValidationError from "../configuration/ValidationError.js";

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path.join(".");

      if (issue.code === "invalid_type" && issue.input === undefined) {
        errors[field] =
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      } else {
        errors[field] = issue.message;
      }
    });
    return next(new ValidationError(errors));
  }

  req.body = result.data;
  next();
};
