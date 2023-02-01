class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = "ValidationError"
    }
}

class  HttpError extends Error {
  constructor(message) {
    super(message)
    this.name = " HttpError"
    }
}


module.exports = {
    ValidationError,
    HttpError
};
