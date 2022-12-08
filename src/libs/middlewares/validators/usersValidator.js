import { body, param } from 'express-validator'
import models from '../../../models'
import validate from './validateValidator'

const { Users } = models

export const create = () => validate([
  body('name')
    .notEmpty()
    .withMessage((_, { req }) => req.t('validator.not_empty', { field: req.t('field.user.name') }))
    .trim()
    .escape(),
  body('email')
    .notEmpty()
    .withMessage((_, { req }) => req.t('validator.not_empty', { field: req.t('field.user.email') }))
    .isEmail()
    .withMessage((_, { req }) => req.t('validator.email', { field: req.t('field.user.email') }))
    .custom(async (value, { req }) => {
      const data = await Users.findOne({
        where: { email: value }
      })
      if (data) throw new Error(req.t('validator.exists', { field: 'field.user.email' }))
      return true
    })
    .trim()
    .escape(),
  body('password')
    .notEmpty()
    .withMessage((_, { req }) => req.t('validator.not_empty', { field: req.t('field.user.password') }))
    .trim()
    .escape(),
])

export const update = () => validate([
  body('name')
    .notEmpty()
    .withMessage((_, { req }) => req.t('validator.not_empty', { field: req.t('field.user.name') }))
    .trim()
    .escape()
])