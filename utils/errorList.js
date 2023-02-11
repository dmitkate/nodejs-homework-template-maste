class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = "ValidationError"
    this.status = 400
    }
}

class  HttpError extends Error {
  constructor(message) {
    super(message)
    this.name = " HttpError"
    }
}
class AuthError extends Error {
    constructor(message) {
        super(message)
        this.name = "LoginAuthError"
        this.status = 401
    }
}
class VerificationError extends Error {
    constructor(message) {
        super(message)
        this.name = "VerificationError"
        this.status = 404
    }
}

class RegistrationConflictError extends Error {
    constructor(message) {
        super(message)
        this.name = "RegistrationConflictError"
        this.status = 409
    }
}
module.exports = {
    ValidationError,
    HttpError,
    VerificationError,
  RegistrationConflictError,
    AuthError,
};
