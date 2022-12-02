import { validationResult } from "express-validator"

export default function validate(validations) {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    const extractedErrors = {}
    errors.array().forEach((value) => {
      if (!value.param) return

      if (!extractedErrors[value.param]) extractedErrors[value.param] = [value.msg]
      else extractedErrors[value.param].push(value.msg)
    })

    return res.status(422).json( {
      message: req.t('validator.unprocess_entity'),
      errors: extractedErrors
    })
  }
}