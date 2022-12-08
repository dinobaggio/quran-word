import _ from 'lodash'
import models from '../../models'

const { Users } = models

export default async function (uuid, req, res) {
  await Users.destroy({
    where: {
      uuid
    }
  })

  res.status(200).json({
    message: req.t('message.success_delete')
  })
}