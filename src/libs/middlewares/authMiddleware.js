import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import models from '../../models'

dotenv.config()

const { Users } = models

export function isAuthenticate(req, res, next) {
  if (!req.headers.authorization) {
    // Unauthorized
    res.status(401).json({
      message: req.t('validator.unauthorized')
    })
    return
  }

  const splitToken = req.headers.authorization.split(' ')
  if (splitToken.length !== 2 || splitToken[0] !== 'Bearer') {
    // 'Wrong authorization format'
    res.status(400).json({
      message: req.t('validator.wrong_authorization_format')
    })
    return
  }

  jwt.verify(splitToken[1], process.env.DB_PASSWORD, { algorithms: ['HS256'] }, async (err, payload) => {
    if (err && err.name === 'TokenExpiredError') {
      // Expired token
      res.status(401).json({
        message: req.t('validator.expired_token')
      })
    } else if (err) {
      // Invalid token
      res.status(401).json({
        message: req.t('validator.invalid_token')
      })
    } else {
      try {
        const user = await Users.findOne({
          where: {
            uuid: payload.uuid,
          },
        })

        if (!user) {
          res.status(401).json({
            message: req.t('validator.invalid_token')
          })
          return
        }

        req.user = user
        next()
      } catch (error) {
        next(error)
      }
    }
  })
}