class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = "ValidationError"
    }
}

function ValidError(status, message) {
    const err = new ValidationError(message);
    err.status = status;
    return err;
}
function HttpError(status, message) {
    const err = new Error(message);
    err.status = status;
    return err;
}
module.exports = {
    ValidError,
    HttpError
};
