import AppError from "./appError.js"
class ValidationError extends AppError {
  constructor(details) {
    super(
      "Validation Failed",
      400,
      "VALIDATION_ERROR",
      details
    );
  }
}

export default ValidationError