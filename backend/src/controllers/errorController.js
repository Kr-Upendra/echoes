import { ErrorHandler } from "../utils/index.js";

const handleJsonWebTokenError = () => {
  return new ErrorHandler(
    "Malformed JWT token. Please provide a valid token.",
    401
  );
};

const handleTokenExpiredError = () => {
  return new ErrorHandler("JWT token has expired. Please log in again.", 401);
};

const handleMulterError = () => {
  return new ErrorHandler("Error occurred while uploading files.", 400);
};

const developmentError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const productionError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error.",
    });
  }
};

export const globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status;

  if (process.env.NODE_ENV === "development") {
    developmentError(error, res);
  } else if (process.env.NODE_ENV === "production") {
    let err = { ...error, message: error.message };

    if (err.name === "JsonWebTokenError") err = handleJsonWebTokenError();
    if (err.name === "TokenExpiredError") err = handleTokenExpiredError();
    if (err.name === "MulterError") err = handleMulterError();
    productionError(err, res);
  }
};
