import mongoose from "mongoose";
import {ApiError} from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error?.status || error?.statusCode || error instanceof mongoose.Error ? 400 : 500;

    const message = error.message || "Something wents wrong";

    error = new ApiError(statusCode, message, error?.errors || []);
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" && {stack: error?.stack})
  }

  return res.status(error.statusCode).json(response);
}

export {errorHandler}