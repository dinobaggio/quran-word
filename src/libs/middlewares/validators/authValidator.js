import { body, check } from 'express-validator'
import validate from './validateValidator'

export const login = () => validate([
  body('email')
    .notEmpty()
    .withMessage((_, { req }) => req.t('validator.not_empty', { field: req.t('field.user.email') }))
    .isEmail()
    .withMessage((_, { req }) => req.t('validator.email', { field: req.t('field.user.email') }))
    .trim()
    .escape(),
  body('password')
    .notEmpty()
    .withMessage((_, { req }) => req.t('validator.not_empty', { field: req.t('field.user.password') }))
    .trim()
    .escape(),
])