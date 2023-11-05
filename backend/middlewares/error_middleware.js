const ErrorHandler = require("../helpers/ErrorHandler.helper");

const error_middleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (String(process.env.NODE_ENV) === "dev") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (String(process.env.NODE_ENV) === "prod") {
    let error = { ...err };

    error.message = err.message;

    /**
     * wrong JWT error
     */
    if (err.name === "JsonWebTokenError") {
      error = new ErrorHandler("Token is invalid. Try Again", 400);
    }

    /**
     * Expired token error
     */
    if (err.name === "TokenExpiredError") {
      error = new ErrorHandler("Token is expired. Kindly login", 400);
    }
    /**
     * DB ERRORs
     * Unique check
     * */
    if(new RegExp(/unique/i).test(err["routine"].toLowerCase())){
      error = new ErrorHandler("Duplicate entries detected",409);
    }
/**
 *Catch wrong column reference error based on postgres status code
 * */
    if (err.code === "42703") {
      error = new ErrorHandler("Invalid column name in the query", 400);
    }

    res.status(err.statusCode).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = { error_middleware };