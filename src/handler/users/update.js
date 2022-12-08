import _ from 'lodash'
import models from '../../models'

const { Users } = models

export default async function (uuid, data, req, res) {
  await Users.update(data, {
    where: {
      uuid
    },
    returning: true
  })
  const user = await Users.findOne({
    where: { uuid }
  })
  res.status(200).json({
    message: req.t('message.success_update'),
    data: _.omit(user.dataValues, ['password'])
  })
}