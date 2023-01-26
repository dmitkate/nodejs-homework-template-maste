const { ValidError } = require('../utils/errorList')

const middleware = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);

    const valid = error == null;
      if (valid) {
      next();
      } else {
        return next(ValidError(400, `Validation error in ${error.details[0].message}.  Please try again`))
    }
  }
}

module.exports = {
    middleware
}