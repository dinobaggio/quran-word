import _ from 'lodash'
import models from '../../models'

const { Users } = models

export default async function (data, req, res) {
  const user = await Users.create(data)
  res.status(201).json({
    message: req.t('message.success_save'),
    data: _.omit(user.dataValues, ['password'])
  })
}