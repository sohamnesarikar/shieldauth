export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  res.status(err.statusCode).json({
    success: err.suceess,
    message: err.message,
  });
};
