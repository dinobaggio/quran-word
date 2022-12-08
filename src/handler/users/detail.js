import _ from 'lodash'
import models from '../../models'

const { Users } = models

export default async function (uuid, req, res) {
  const user = await Users.findOne({
    where: {
      uuid
    }
  })

  res.status(200).json({
    message: req.t('message.success'),
    data: _.omit(user?.dataValues, ['password'])
  })
}