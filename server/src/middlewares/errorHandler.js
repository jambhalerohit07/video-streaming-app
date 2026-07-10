import logger from "../configuration/logger.js";
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  logger.error({
    requestId: req.requestId,
    // route: req.originalUrl,
    message: err.message,
    method: req.method,
    url: req.originalUrl,
    details: err.details,
  });

  res.status(statusCode).json({
    success: false,
    error: {
      code: err.errorCode || "INTERNAL_SERVER_ERROR",
      message:
        process.env.NODE_ENV === "production"
          ? "Something went wrong."
          : (err.details ?? err.message),
    },
  });
};

export default errorHandler;
