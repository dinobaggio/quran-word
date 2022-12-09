import jwt from 'jsonwebtoken'
import _ from 'lodash'
import { compareHash } from '../../libs/passwordHash'
import models from '../../models'

const { Users } = models

const validateEmailPassword = async ({ email, password }, req, res) => {
  const data = await Users.findOne({
    where: {
      email
    }
  })
  if (!data) {
    res.status(400).json({ message: req.t('validator.login') })
    return { isValid: false }
  }
  const validatePassword = compareHash(password, data.password)
  if (!validatePassword) {
    res.status(400).json({ message: req.t('validator.login') })
    return { isValid: false }
  }
  return { data: data?.dataValues, isValid: true }
}

export default async function (data, req, res) {
  const { data: userData, isValid } = await validateEmailPassword(data, req, res)
  if (!isValid) return null
  const payload = _.pick(userData, ['uuid', 'name', 'email', 'created_at', 'updated_at'])
  const token = jwt.sign(payload, process.env.DB_PASSWORD, {
    expiresIn: '7d'
  })
  
  return token
}