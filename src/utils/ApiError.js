class ApiError extends Error {
  constructor(statusCode, message = "Something Wents wrong", errors = []) {
    super(message)
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.success = false;
  }
}

export {ApiError}